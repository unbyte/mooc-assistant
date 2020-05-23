import { getRawCourseContent, getRawResourceInfo } from "../api/info";
import {
  CourseContent,
  parseCourseContent,
  parseDocsPage,
  parseVideoDuration,
  Section
} from "./parse";

export interface UserInfo {
  sessionID: string;
  userID: string;
}

export const getUserInfo: () => UserInfo | null = () => {
  const s = document.cookie.match(/NTESSTUDYSI=(.+?);/);
  const u = document.cookie.match(/NETEASE_WDA_UID=(\d+)#/);

  if (!s || !u || s.length < 1 || u.length < 1) return null;

  return {
    sessionID: s[1],
    userID: u[1]
  };
};

export interface CourseInfo {
  id: number; // id
  name: string; // name
  currentTermId: number; // currentTermId
}

export const getCourseInfo: () => CourseInfo | null = () => {
  // @ts-ignore
  const data = window["courseCardDto"];
  if (data) {
    const { id, name, currentTermId } = data;
    return {
      id,
      name,
      currentTermId
    };
  }
  return null;
};

// export const getVideoInfo: (
//   session: string,
//   sectionID: number
// ) => Promise<VideoInfo | null> = async (
//   sessionID: string,
//   sectionID: number
// ) => {
//   const raw = await getRawVideoInfo(sessionID, sectionID);
//   return raw !== null ? parseVideoInfo(raw) : null;
// };

export const getCourseContent: (
  sessionID: string,
  courseID: number
) => Promise<CourseContent | null> = async (
  sessionID: string,
  courseID: number
) => {
  const raw = await getRawCourseContent(sessionID, courseID);
  return raw !== null ? parseCourseContent(raw) : null;
};

export const getVideoDuration: (
  sessionID: string,
  section: Section
) => Promise<number | null> = async (sessionID, section) => {
  const raw = await getRawResourceInfo(sessionID, section);
  return raw !== null ? parseVideoDuration(raw) : null;
};

export const getDocsPage: (
  sessionID: string,
  section: Section
) => Promise<number | null> = async (sessionID, section) => {
  const raw = await getRawResourceInfo(sessionID, section);
  return raw !== null ? parseDocsPage(raw) : null;
};
