import { clearEchoed, echo } from "../console/Console";
import {
  CourseInfo,
  getCourseContent,
  getCourseInfo,
  getDocsPage,
  getUserInfo,
  getVideoDuration,
  UserInfo
} from "../../handler/getter";
import {
  Chapter,
  CourseContent,
  Lesson,
  Section,
  SectionType
} from "../../handler/parse";
import {
  markCommonLearnt,
  markDocsLearnt,
  markVideoLearnt
} from "../../api/action";

export const fetchInfo: () => Promise<CourseContent | null> = async () => {
  echo("获取 Session ...");
  const userInfo = getUserInfo();
  if (!userInfo) {
    echo("获取 Session 失败");
    return null;
  }
  console.log(userInfo);

  echo("获取课程信息 ...");
  const courseInfo = getCourseInfo();
  if (!courseInfo) {
    echo("获取课程信息失败");
    return null;
  }
  console.log(courseInfo);

  echo("获取课件信息 ...");
  const courseContent = await getCourseContent(
    userInfo.sessionID,
    courseInfo.currentTermId
  );
  console.log(courseContent);
  return courseContent;
};

export class Mark {
  private readonly userInfo: UserInfo;
  private readonly courseInfo: CourseInfo;
  private readonly chapters: Chapter[];
  private tasks: Promise<void>[];

  constructor(userInfo: UserInfo, courseInfo: CourseInfo, chapters: Chapter[]) {
    this.userInfo = userInfo;
    this.courseInfo = courseInfo;
    this.chapters = chapters;
    this.tasks = [];
  }

  start: () => Promise<any> = async () => {
    clearEchoed();
    this.tasks = [];

    this.chapters.forEach(chapter => {
      chapter.lessons &&
        chapter.lessons.forEach(lesson => {
          lesson.sections &&
            lesson.sections.forEach(section => {
              this.tasks.push(
                (async () => {
                  if (section.type !== SectionType.EXAM) {
                    echo("正在处理: " + section.name);
                    switch (section.type) {
                      case SectionType.DOCS:
                        return this.handleDocs(section);
                      case SectionType.VIDEO:
                        return this.handleVideo(lesson, section);
                      default:
                        return this.handle(section);
                    }
                  }
                })()
              );
            });
        });
    });

    return Promise.allSettled(this.tasks);
  };

  private handleDocs: (section: Section) => void = async section => {
    const page = await getDocsPage(this.userInfo.sessionID, section);
    if (page && (await markDocsLearnt(this.userInfo, section, page))) {
      echo("已完成: " + section.name);
    } else {
      echo("失败: " + section.name);
    }
    return;
  };

  private handleVideo: (lesson: Lesson, section: Section) => void = async (
    lesson: Lesson,
    section
  ) => {
    const duration = await getVideoDuration(this.userInfo.sessionID, section);
    if (
      duration &&
      (await markVideoLearnt(
        this.userInfo,
        this.courseInfo,
        lesson,
        section,
        duration
      ))
    ) {
      echo("已完成: " + section.name);
    } else {
      echo("失败: " + section.name);
    }
    return;
  };

  private handle: (section: Section) => void = async section => {
    if (await markCommonLearnt(this.userInfo, section)) {
      echo("已完成: " + section.name);
    } else {
      echo("失败: " + section.name);
    }
  };
}
