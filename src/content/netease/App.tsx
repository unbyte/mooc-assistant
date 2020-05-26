import React, { useEffect, useRef, useState } from "react";
import { Evaluator } from "./components/evaluator/Evaluator";
import { Player } from "./components/player/Player";
import { Marker } from "./components/marker/marker";
import { Console } from "./components/console/Console";
import { FeatureKeys, FeatureStatusList } from "../../../features";
import { getConfig } from "../../utils/storage";

interface ToggleProps {
  toggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ toggle }) => {
  return (
    <div id="mooc-assistant-toggle" onClick={toggle} title="展开/收起慕课助手">
      <span>慕课助手</span>
    </div>
  );
};

const Body: React.FC = () => {
  const [features, setFeatures] = useState<FeatureStatusList>({});

  useEffect(() => {
    getConfig()
      .then(({ featureStatus }) => {
        setFeatures(featureStatus);
      })
      .finally(() => {});
  }, []);

  return (
    <div id="mooc-assistant-body">
      <Evaluator />
      <Player />
      {features && features[FeatureKeys.MOOC_MARK_LEARNT] && <Marker />}
    </div>
  );
};

export const App: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div id="mooc-assistant" ref={mainRef}>
      <Toggle toggle={() => mainRef.current!.classList.toggle("show")} />
      <Body />
      <Console />
    </div>
  );
};
