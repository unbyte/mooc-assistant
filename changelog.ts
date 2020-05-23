export enum Tag {
  FIX_OPT = "修复优化",
  ADD_FEAT = "功能增加"
}

interface DetailFormat {
  tag: Tag;
  text: string;
}

interface ChangelogFormat {
  version: string;
  details: DetailFormat[];
}

export default <ChangelogFormat[]>[
  {
    version: "2.2.0",
    details: [
      {
        tag: Tag.ADD_FEAT,
        text: "支持 中国大学MOOC 视频倍速播放"
      },
      {
        tag: Tag.ADD_FEAT,
        text: "支持 中国大学MOOC 秒刷学习进度"
      }
    ]
  },
  {
    version: "2.1.1",
    details: [
      {
        tag: Tag.FIX_OPT,
        text: "修复 中国大学MOOC 表单与按钮错位"
      }
    ]
  },
  {
    version: "2.1.0",
    details: [
      {
        tag: Tag.ADD_FEAT,
        text: "支持 优学堂 获取练习答案"
      },
      {
        tag: Tag.ADD_FEAT,
        text: "支持 优学堂 倍速播放"
      }
    ]
  },
  {
    version: "2.0.0",
    details: [
      {
        tag: Tag.ADD_FEAT,
        text: "支持 中国大学MOOC 自动互评"
      },
      {
        tag: Tag.ADD_FEAT,
        text: "支持 中国大学MOOC 随机评语"
      }
    ]
  }
];
