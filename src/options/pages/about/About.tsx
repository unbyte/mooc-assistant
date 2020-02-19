import React from "react";
import "./about.less"

const About: React.FC = () => <Content />;

const Content: React.FC = () => {
  return (
    <div id="about-content">
      <p>大一时高数要求慕课作业</p>
      <p>
        为了解放<del>劳动力</del>双手，写了一个
        <a href="https://github.com/unbyte/MoocChecker" target="_blank">
          互评脚本
        </a>
      </p>
      <p>有天突发奇想，将这个小脚本改写成了浏览器插件，扔到了Chrome商店</p>
      <p>
        转眼快一年没搭理过这个插件了，如今(2020.2.18)翻出来改写，希望能让大家有更好的体验
      </p>
      <p>
        有空会针对各个慕课平台增加新功能，欢迎提出宝贵建议
      </p>
      <br />
      <p>
        Opera商店:{" "}
        <a
          href="https://addons.opera.com/zh-cn/extensions/details/mooc-assistant/"
          title="前往Opera扩展商店"
          target="_blank"
        >
          Mooc
        </a>
      </p>
      <p>
        Firefox商店:{" "}
        <a
          href="https://addons.mozilla.org/zh-CN/firefox/addon/mooc-assistant/"
          title="前往Firefox扩展商店"
          target="_blank"
        >
          Mooc
        </a>
      </p>
      <p>
        Chrome商店:{" "}
        <a
          href="https://chrome.google.com/webstore/detail/moocassistant/oebggekgendmoeedkkdkdcdbmfbfeldc"
          title="前往Chrome扩展商店"
          target="_blank"
        >
          MoocAssistant
        </a>
      </p>
      <br />
      <p>
        本项目基于MIT协议开源，构建部分参考自
        <a
          href="https://github.com/abhijithvijayan/web-extension-starter"
          target="_blank"
        >
          web-extension-starter
        </a>
      </p>
      <br />
      <p>
        开源地址:{" "}
        <a
          href="https://github.com/unbyte/mooc-assistant"
          target="_blank"
          title="点击前往Github主页"
        >
          github.com/unbyte/mooc-assistant
        </a>
      </p>
      <p>
        联系邮箱:{" "}
        <a href="mailto:i@shangyes.net" title="点击发送邮件">
          i@shangyes.net
        </a>
      </p>
    </div>
  );
};

export default About;
