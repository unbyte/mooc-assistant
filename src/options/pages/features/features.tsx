import React, { useEffect, useState } from "react";
import { getConfig, saveConfig } from "../../../utils/storage";
import "./features.less";
import { availableFeatures, FeatureStatusList } from "../../../../features";

const Features: React.FC = () => {
  const [features, setFeatures] = useState<FeatureStatusList>({});

  useEffect(() => {
    getConfig().then(({ featureStatus }) => {
      setFeatures(featureStatus);
    });
  }, []);

  useEffect(() => {
    saveConfig({ featureStatus: features }).then();
  }, [features]);

  return (
    <div id="features-page">
      <Tip />
      <SettingPanel
        features={features}
        toggleFeature={(key: string) => {
          setFeatures(prevState => {
            const tmp = { ...prevState };
            if (tmp[key] !== undefined) {
              tmp[key] = !tmp[key];
            } else {
              tmp[key] = true;
            }
            return tmp;
          });
        }}
      />
    </div>
  );
};

export default Features;

interface SettingPanelProps {
  features: FeatureStatusList;
  toggleFeature: (featureKey: string) => void;
}

const Tip: React.FC = () => {
  return (
    <div id="features-tip">
      <p>本页面的功能不保证一定安全，也不保证一定执行成功。</p>
      <p>
        一旦选择开启这些功能，即意味着您知晓这些功能具有不确定性，一切后果与作者无关。
      </p>
    </div>
  );
};

const SettingPanel: React.FC<SettingPanelProps> = ({
  features,
  toggleFeature
}) => {
  return (
    <div id="features-panel">
      <ul>
        {Object.keys(availableFeatures).map((key, i) => {
          return (
            <li key={i}>
              <span
                onClick={() => toggleFeature(key)}
                className={`toggle-feature ${features[key] ? "active" : ""}`}
                title="切换激活状态"
              />
              <span className="feature-name">
                {availableFeatures[key].name}
              </span>
              <span className="feature-platform">
                {availableFeatures[key].platform}
              </span>
              <span className="feature-description">
                {availableFeatures[key].description}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
