export interface FeatureItem {
  name: string;
  platform: Platform;
  description: string;
}

export type FeatureList = { [name: string]: FeatureItem };

export type FeatureStatusList = { [name: string]: boolean };

export enum Platform {
  MOOC = "网易 MOOC",
  ULEARNING = "优学堂"
}

export const availableFeatures: FeatureList = {
  MOOC_MARK_LEARNT: {
    name: "秒刷学习进度",
    platform: Platform.MOOC,
    description: "直接修改课件学习状态为已学习，同时简单伪造学习时间"
  }
};

export enum FeatureKeys {
  MOOC_MARK_LEARNT = "MOOC_MARK_LEARNT"
}
