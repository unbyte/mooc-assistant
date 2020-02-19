import React from "react";
import changelog, {Tag} from "../../../../changelog";
import "./changelog.less";

const Changelog: React.FC = () => <ChangelogList />;


function tagToStyleClass(tag:string):string{
  return tag === Tag.FIX_OPT ? "green" : "blue";
}

const ChangelogList: React.FC = () => {
  return (
    <div id="changelog-list">
      <ul>
        {changelog.map((item, i) => (
          <li key={i}>
            {item.version}
            <ul>
              {item.details.map((detail, i) => (
                <li key={i}>
                  <span className={`tag ${tagToStyleClass(detail.tag)}`}>
                    {detail.tag}
                  </span>
                  {detail.text}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Changelog;
