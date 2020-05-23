import React, { useRef } from "react";
import { CommentItem } from "../../../utils/storage";

interface EditPanelProps {
  addComment: (content: string) => void;
}

interface CommentListProps {
  comments: CommentItem[];
  remove: (index: number) => void;
  toggleActive: (index: number) => void;
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  remove,
  toggleActive
}) => {
  return (
    <div id="comment-list">
      <h2>
        评语列表{" "}
        <span>
          ( {comments.filter(({ active }) => active).length} / {comments.length}{" "}
          )
        </span>
      </h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment, i) => (
            <li key={i}>
              <div className="comment-button">
                <span
                  onClick={() => toggleActive(i)}
                  className={`toggle-comment ${comment.active ? "active" : ""}`}
                  title="切换激活状态"
                />
              </div>
              <div className="comment-content">{comment.text}</div>
              <div className="comment-button">
                <span
                  onClick={() => remove(i)}
                  className="delete-comment"
                  title="移除"
                >
                  移除
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="comment-empty">尚未添加评语</div>
      )}
    </div>
  );
};

export const EditPanel: React.FC<EditPanelProps> = ({ addComment }) => {
  const content = useRef<HTMLTextAreaElement>(null);
  return (
    <div id="comment-edit-panel">
      <h2>添加评语</h2>
      <div>
        <textarea ref={content} />
        <div
          id="comment-save"
          onClick={() => {
            addComment(content.current!.value);
            content.current!.value = "";
          }}
        >
          添加
        </div>
      </div>
    </div>
  );
};
