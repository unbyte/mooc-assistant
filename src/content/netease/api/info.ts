import request from "../../../utils/request";
import { Section } from "../handler/parse";

export const getRawCourseContent: (
  sessionID: string,
  courseID: number
) => Promise<any> = async (sessionID, courseID) => {
  const params = `callCount=1
scriptSessionId=\${scriptSessionId}190
httpSessionId=${sessionID}
c0-scriptName=CourseBean
c0-methodName=getLastLearnedMocTermDto
c0-id=0
c0-param0=number:${courseID}
batchId=${new Date().getTime()}`;

  try {
    const response = await request.post(
      "https://www.icourse163.org/dwr/call/plaincall/CourseBean.getLastLearnedMocTermDto.dwr",
      params,
      {
        headers: {
          "Content-Type": "text/plain"
        }
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// const getRawResourceToken: (
//   sessionID: string,
//   sectionID: number,
//   type: number
// ) => Promise<any> = async (
//   sessionID: string,
//   sectionID: number,
//   type: number
// ) => {
//   const params = `bizId=${sectionID}&bizType=1&contentType=${type}`;
//   try {
//     const response = await request.post(
//       "https://www.icourse163.org/web/j/resourceRpcBean.getResourceToken.rpc?csrfKey=" +
//         sessionID,
//       params,
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded"
//         }
//       }
//     );
//     return response.data;
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
// };
//
// export const getRawVideoInfo: (
//   sessionID: string,
//   sectionID: number
// ) => Promise<any> = async (sessionID: string, sectionID: number) => {
//   return getRawResourceToken(sessionID, sectionID, 1);
// };

export const getRawResourceInfo: (
  sessionID: string,
  section: Section
) => Promise<any> = async (sessionID: string, section: Section) => {
  const params = `callCount=1
scriptSessionId=\${scriptSessionId}190
httpSessionId=${sessionID}
c0-scriptName=CourseBean
c0-methodName=getLessonUnitLearnVo
c0-id=0
c0-param0=number:${section.contentID}
c0-param1=number:${section.type}
c0-param2=number:0
c0-param3=number:${section.id}
batchId=${new Date().getTime()}`;

  try {
    const response = await request.post(
      "https://www.icourse163.org/dwr/call/plaincall/CourseBean.getLessonUnitLearnVo.dwr",
      params,
      {
        headers: {
          "Content-Type": "text/plain"
        }
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
