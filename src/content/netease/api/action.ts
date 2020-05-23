import { Lesson, Section } from "../handler/parse";
import { CourseInfo, UserInfo } from "../handler/getter";
import request from "../../../utils/request";
import { sleep } from "../../../utils/sleep";

export const markVideoLearnt: (
  user: UserInfo,
  course: CourseInfo,
  lesson: Lesson,
  section: Section,
  videoDuration: number
) => Promise<boolean> = async (
  user,
  course,
  lesson,
  section,
  videoDuration
) => {
  let videoTime = -1;
  let videoTimeCount = 0;
  for (let i = 0; i < 4; i++) {
    const params =
      `dto={"unitId":${section.id},"finished":${i === 3},"index":${i +
        1},"duration":180000,"courseId":${course.id},` +
      `"lessonId":${lesson.id},"videoId":${section.contentID},"termId":${course.currentTermId},` +
      `"userId":"${user.userID}","contentType":1,` +
      `"action":"LEARN_TIME_COUNT","videoTime":${videoTime},"learnedVideoTimeCount":${videoTimeCount}}`;

    if (!(await sendMarkRequest(user.sessionID, params))) return false;

    videoTime += Math.floor((Math.random() * videoDuration) / 5);
    videoTimeCount += Math.floor((Math.random() * videoDuration) / 6);

    await sleep(2000);
  }
  return true;
};

export const markDocsLearnt: (
  user: UserInfo,
  section: Section,
  page: number
) => Promise<boolean> = async (user, section, page) => {
  const params = `dto={"unitId":${section.id},"pageNum":${page},"finished":true,"contentType":3}`;
  return sendMarkRequest(user.sessionID, params);
};

export const markCommonLearnt: (
  user: UserInfo,
  section: Section
) => Promise<boolean> = async (user, section) => {
  const params = `dto={"unitId":${section.id},"finished":true,"contentType":${section.type}}`;
  return sendMarkRequest(user.sessionID, params);
};

// 返回值是是否执行成功，是否执行成功的表标准是返回响应中是否有 result 并且为 true
const sendMarkRequest: (
  sessionID: string,
  params: string
) => Promise<boolean> = async (sessionID, params) => {
  try {
    const response = await request.post(
      "https://www.icourse163.org/web/j/courseBean.saveMocContentLearn.rpc?csrfKey=" +
        sessionID,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    return !!response.data.result;
  } catch (e) {
    return false;
  }
};
