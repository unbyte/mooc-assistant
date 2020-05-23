import About from "./pages/about/About";
import Changelog from "./pages/changelog/Changelog";
import Comments from "./pages/comments/Comments";
import { FunctionComponent } from "react";
import Features from "./pages/features/features";

interface TabItem {
  label: string;
  route: string;
  component: FunctionComponent;
}

// Tab页
const TabItems: TabItem[] = [
  {
    component: Changelog,
    label: "更新日志",
    route: "/"
  },
  {
    component: Comments,
    label: "随机评语",
    route: "/comments"
  },
  {
    component: Features,
    label: "功能设置",
    route: "/features"
  },
  {
    component: About,
    label: "关于",
    route: "/about"
  }
];

export default TabItems;
