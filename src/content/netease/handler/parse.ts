export type CourseContent = Chapter[];

export interface Chapter {
  id: number;
  name: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  name: string;
  sections: Section[];
}

export interface Section {
  id: number;
  // 1 - 视频, 3 - 电子课件， 4 - HTML，5 - 课堂测验, 6 - 讨论
  type: SectionType;
  name: string;
  contentID: number;
  anchors: Anchor[];
}

export enum SectionType {
  VIDEO = 1,
  DOCS = 3,
  TEXT = 4,
  EXAM = 5,
  DISCUSS = 6
}

export interface Anchor {
  anchor: number;
  questionID: number;
}

export const parseCourseContent: (
  data: string
) => CourseContent | null = data => {
  const result: CourseContent = [];
  try {
    const root = eval(data.replace(/dwr\.engine.+;/, "s0;"));
    for (const c of root.chapters) {
      result.push({
        id: c.id,
        name: c.name,
        lessons: c.lessons?.map((l: any) => ({
          id: l.id,
          name: l.name,
          sections: l.units?.map((s: any) => ({
            id: s.id,
            type: s.contentType,
            name: s.name,
            contentID: s.contentId,
            anchors: s.anchorQuestions?.map((a: any) => ({
              anchor: a.anchor,
              questionID: a.questionId
            }))
          }))
        }))
      });
    }
    return result;
  } catch (e) {
    return null;
  }
};

// export interface VideoInfo {
//   id: number;
//   name: string;
//   signature: string;
//   status: number;
//   duration: number;
//   learntTime: number;
// }
//
// export const parseVideoInfo: (data: any) => VideoInfo = ({result}) => {
//   const {videoId: id, name, signature, status, duration} = result.videoSignDto;
//   return {
//     id,
//     name,
//     signature,
//     status,
//     duration,
//     learntTime: result.learnVideoTime,
//   }
// }

export const parseVideoDuration: (data: string) => number = data => {
  const d = data.match(/duration=(\d+?);/);
  if (d && d.length > 0) {
    return parseInt(d[1]);
  }
  return 0;
};

export const parseDocsPage: (data: string) => number = data => {
  const d = data.match(/textPages:(\d+?),/);
  if (d && d.length > 0) {
    return parseInt(d[1]);
  }
  return 0;
};
