import React, { useEffect, useState } from "react";
import "./marker.less";
import { Chapter, CourseContent } from "../../handler/parse";
import { clearEchoed, echo } from "../console/Console";
import { fetchInfo, Mark } from "./worker";
import { getCourseInfo, getUserInfo } from "../../handler/getter";

export const Marker: React.FC = () => {
  return (
    <div id="mooc-assistant-marker">
      <h2>秒刷进度</h2>
      <Panel />
    </div>
  );
};

const Panel: React.FC = () => {
  return (
    <div id="mooc-assistant-marker-panel">
      <Controller />
    </div>
  );
};

const Controller: React.FC = () => {
  const [courseContent, setCourseContent] = useState<CourseContent>([]);
  const [showViewer, setShowViewer] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [selectedChapter, setSelectedChapter] = useState<Chapter[]>([]);

  return (
    <div id="mooc-assistant-marker-controller">
      <CourseContentViewer
        courseContent={courseContent}
        show={showViewer}
        closeViewer={() => setShowViewer(false)}
        setSelectedChapters={setSelectedChapter}
      />
      <div id="mooc-assistant-marker-buttons">
        <Buttons
          disabled={disabled}
          initialize={async () => {
            if (disabled) return;
            clearEchoed();
            const courseContent = await fetchInfo();
            if (courseContent) {
              setCourseContent(courseContent);
              echo("获取信息成功");
            } else {
              echo("获取课件信息失败");
            }
          }}
          startWork={() => {
            // 为了避免极端情况，开始任务前再次获取各种信息
            if (disabled) return;
            if (!selectedChapter.length) {
              echo("尚未选择范围，请先 选择");
              return;
            }
            const user = getUserInfo();
            if (!user) {
              echo("获取登陆状态失败");
              return;
            }
            const course = getCourseInfo();
            if (!course) {
              echo("获取课程信息失败");
              return;
            }
            setDisabled(true);
            new Mark(user, course, selectedChapter).start().then(result => {
              setDisabled(false);
              let success = 0;
              let fail = 0;
              result.forEach((i: { status: string }) => {
                if (i.status === "fulfilled") {
                  success++;
                } else {
                  fail++;
                }
              });

              echo("任务结束");
              echo(`成功${success}个 失败${fail}个`);
            });
          }}
          showViewer={() => {
            if (disabled) return;
            if (!courseContent.length) {
              echo("尚未获取信息，请先 初始化");
              return;
            }
            setShowViewer(true);
          }}
        />
      </div>
    </div>
  );
};

interface ButtonsProps {
  disabled: boolean;
  initialize: () => void;
  startWork: () => void;
  showViewer: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({
  initialize,
  startWork,
  showViewer,
  disabled
}) => {
  return (
    <>
      <span onClick={startWork} className={disabled ? "disabled" : ""}>
        {disabled ? "正在执行" : "开始任务"}
      </span>
      <span onClick={initialize} className={disabled ? "disabled" : ""}>
        初始化
      </span>
      <span onClick={showViewer} className={disabled ? "disabled" : ""}>
        选择
      </span>
    </>
  );
};

interface CourseContentViewerProps {
  show: boolean;
  courseContent: CourseContent;
  closeViewer: () => void;
  setSelectedChapters: (chapters: Chapter[]) => void;
}

const CourseContentViewer: React.FC<CourseContentViewerProps> = ({
  courseContent,
  show,
  closeViewer,
  setSelectedChapters
}) => {
  // chapter
  const [selectedChapterIndexes, setSelectedChapterIndexes] = useState<
    boolean[]
  >([]);

  useEffect(() => {
    setSelectedChapterIndexes(new Array(courseContent.length).fill(false));
  }, [courseContent]);
  return (
    <div id="mooc-assistant-marker-viewer-modal" className={show ? "show" : ""}>
      <div id="mooc-assistant-marker-viewer">
        <div id="mooc-assistant-marker-viewer-buttons">
          <span
            onClick={() => {
              setSelectedChapters(
                courseContent.filter((_, i) => selectedChapterIndexes[i])
              );
              closeViewer();
            }}
            className="close-button"
          >
            保存并返回
          </span>
          <span
            onClick={() => {
              if (selectedChapterIndexes.some(v => !v)) {
                setSelectedChapterIndexes(
                  new Array(courseContent.length).fill(true)
                );
              } else {
                setSelectedChapterIndexes(
                  new Array(courseContent.length).fill(false)
                );
              }
            }}
            className="fill-button"
          >
            全选/全不选
          </span>
        </div>
        <ul>
          {courseContent.map((chapter, chapter_i) => (
            <li
              key={chapter_i}
              onClick={() => {
                setSelectedChapterIndexes(prevState => {
                  return prevState.map((selected, i) =>
                    chapter_i === i ? !selected : selected
                  );
                });
              }}
            >
              <span
                className={`select-chapter ${
                  selectedChapterIndexes[chapter_i] ? "selected" : ""
                }`}
                title="切换选中状态"
              />
              <span>{chapter.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
