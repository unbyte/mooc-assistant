import React, { useEffect, useState } from "react";
import { CommentItem, getConfig, saveConfig } from "../../../utils/storage";
import { CommentList, EditPanel } from "./Component";
import "./comments.less";

const Comments: React.FC = () => {
  const [comments, setComments] = useState<CommentItem[]>([]);

  useEffect(() => {
    getConfig().then(({ commentList }) => {
      setComments(commentList);
    });
  }, []);

  useEffect(() => {
    saveConfig({ commentList: comments }).then();
  }, [comments]);

  return (
    <div id="comment-page">
      <EditPanel
        addComment={content =>
          setComments(prevState => [
            { text: content, active: true },
            ...prevState
          ])
        }
      />
      <CommentList
        comments={comments}
        toggleActive={index =>
          setComments(prevState => {
            const tmp = [...prevState];
            tmp[index].active = !tmp[index].active;
            return tmp;
          })
        }
        remove={index =>
          setComments(prevState => prevState.filter((_, i) => index !== i))
        }
      />
    </div>
  );
};

export default Comments;
