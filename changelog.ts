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
    version: "2.0.0",
    details: [
      {
        tag: Tag.ADD_FEAT,
        text: "支持自动互评"
      },
      {
        tag: Tag.ADD_FEAT,
        text: "支持随机评语"
      },
    ]
  },
];
