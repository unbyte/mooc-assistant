<h1 align="center">慕课助手</h1>
<p align="center"> <img alt="Release" src="https://img.shields.io/github/v/release/unbyte/mooc-assistant?style=flat-square"/> </p>
<p align="center"> <img alt="Stars" src="https://img.shields.io/chrome-web-store/stars/oebggekgendmoeedkkdkdcdbmfbfeldc?style=flat-square"/> <img alt="Users" src="https://img.shields.io/chrome-web-store/users/oebggekgendmoeedkkdkdcdbmfbfeldc?style=flat-square"/> <img alt="Stars" src="https://img.shields.io/amo/stars/mooc-assistant?style=flat-square"/> <img alt="Users" src="https://img.shields.io/amo/users/mooc-assistant?style=flat-square"/></p>

# 目录

- [简介](#简介)
- [下载](#下载)
- [中国大学MOOC](#中国大学MOOC)
  - [自动互评](#自动互评)
    - [设置备选随机评语](#设置备选随机评语)
  - [倍速播放](#中国大学mooc-倍速播放)
  - [秒刷进度](#秒刷进度)
- [优学堂](#优学堂)
  - [习题答案](#习题答案)
  - [倍速播放](#优学堂-倍速播放)
- [更新日志](#更新日志)
- [开源协议](#开源协议)

<br/>

# 简介

简单易用的慕课助手插件。

Chrome, Firefox, Opera 以及其他国产Chromium套壳浏览器均可使用。

如果对本插件有建议或意见，或是需要实现某种功能，欢迎

- [新建Issue](https://github.com/unbyte/mooc-assistant/issues/new)
- <a href="mailto:i@shangyes.net">发送邮件</a>

<br/>

# 下载

推荐使用浏览器官方的商店下载

- [Chrome商店](https://chrome.google.com/webstore/detail/moocassistant/oebggekgendmoeedkkdkdcdbmfbfeldc)
- [Firefox商店](https://addons.mozilla.org/zh-CN/firefox/addon/mooc-assistant/)

若官方商店有访问困难，可以前往本仓库[Release页面](https://github.com/unbyte/mooc-assistant/releases)下载并手动安装

<br/>

# 中国大学MOOC

## 自动互评

<details>
<summary>查看详细说明</summary>

安装本插件并启用后，访问[中国大学mooc](https://www.icourse163.org/)时，页面右侧边会悬浮`慕课助手`。

<p align="center"><img alt="悬浮块示意图" src="https://i.loli.net/2020/02/19/QdvPiY1kIWBOpbS.png"/></p>

点击`慕课助手`展开侧边栏，设置评语、份数与速度，点击`开始互评`即可。

<p align="center"><img alt="侧边栏示意图" src="https://i.loli.net/2020/02/19/uohFYczKZRLA1lE.png"/></p>

互评的进度与状态将显示在侧边栏底部的黑色输出区域。

<p align="center"><img alt="输出区域示意图" src="https://i.loli.net/2020/02/19/5Ks4lT7X1kBq3dn.png"/></p>

> 自动互评必须在进入互评打分页面后才可开始

</details>

<br/>

### 设置备选随机评语

<details>
<summary>查看详细说明</summary>

若开启随机评语，则在互评时随机使用预先设置好的评语。

如果没有预先设置好的评语或没有启用的评语，自动互评不会开始并给出提示。

在插件管理中进入插件的`配置页面`，也可通过`互评面板`上的`打开配置页面`进入。

<p align="center"><img alt="配置页面示意图" src="https://i.loli.net/2020/02/19/i8G6xFDoWKmQ5Ms.png"/></p>

评语被添加后，默认为启用状态。可以手动将评语设为非启用状态。

<p align="center"><img alt="配置页面示意图" src="https://i.loli.net/2020/02/19/ZXmTRDG91A4rFkt.png"/></p>

</details>

<br/>

<h2 id="中国大学mooc-倍速播放">倍速播放</h2>

<details>
<summary>查看详细说明</summary>

`倍速播放面板`在`互评面板`下方，只支持整数倍速

- 点击`设置`即可使倍速生效，生效后除非刷新页面，同一课程内的不同视频切换时均可自动切换倍速。

- 点击`重置`将视频速度重置回1倍速。

<p align="center"><img alt="配置页面示意图" src="https://i.loli.net/2020/05/23/lsKPNdfkMvV8OxJ.png"/></p>


</details>

<br/>

## 秒刷进度

<details>
<summary>查看详细说明</summary>

**本功能存在不确定性，包括但不限于后台显示的数据异常等。**

**【醒目】 使用本功能即意味着您已知晓本功能存在一定风险，一切后果与作者无关。**

因为本功能存在一定风险，默认是关闭状态，需要先前往插件的`配置页面`开启。

> 可通过`互评面板`上的`打开配置页面`进入

<p align="center"><img alt="配置页面示意图" src="https://i.loli.net/2020/05/23/DA9YKsLTlr4yEp8.png"/></p>

开启后重新进入慕课平台，在`播放加速面板`下出现`秒刷进度面板`

<p align="center"><img alt="秒刷进度面板示意图" src="https://i.loli.net/2020/05/23/eu4BhSzo2fDRsEK.png"/></p>

进入需要刷进度的课程页面，先点击`初始化`拉取课程的信息，再点击`选择`打开`章节选择面板`，选择需要刷进度的章节。

> 因为显示空间不够大，选择的粒度太细的话显示不过来，所以以章节为单位

选择完成后点击`章节选择面板`上方的`保存并返回`按钮回到主界面，点击`开始任务`开始刷进度。

会自动完成**视频 / 电子课件 / 文本 / 讨论**的进度。

<p align="center"><img alt="输出示意图" src="https://i.loli.net/2020/05/23/zwDQfOrnZALqpl2.png"/></p>

等到`输出框`中提示**任务结束**后，刷新页面查看结果。

</details>

<br/>

# 优学堂

## 习题答案

<details>
<summary>查看详细说明</summary>

安装本插件并启用后，访问 优学堂学习界面 `https://ua.ulearning.cn/learnCourse/***` 时，页面顶部`咨询客服`旁会出现`习题答案`菜单。

<p align="center"><img src="https://i.loli.net/2020/02/25/ADOrWThdzwEFi18.png"/></p>

点击`获取答案`，会将答案显示在习题右方:

<p align="center"><img src="https://i.loli.net/2020/02/25/fFwZoEBx73t6enh.png"/></p>

</details>

<br/>

<h2 id="优学堂-倍速播放">倍速播放</h2>

<details>
<summary>查看详细说明</summary>

安装本插件并启用后，访问 优学堂学习界面 `https://ua.ulearning.cn/learnCourse/***` 时，页面顶部`咨询客服`旁会出现`视频播放`菜单。

<p align="center"><img src="https://i.loli.net/2020/02/25/j257J6B4S1VdQbp.png"/></p>

在视频播放的页面，先输入倍速，再点击倍速播放即可开始播放

> 受浏览器限制，最大为16倍速，且超过一定倍速会浏览器会自动静音视频

</details>

<br/>

# 更新日志

详细开发更新日志请参阅: [CHANGELOG.md](https://github.com/unbyte/mooc-assistant/blob/master/CHANGELOG.md)

<br/>

- v2.2.0
  - 支持 中国大学MOOC 视频倍速播放
  - 支持 中国大学MOOC 秒刷学习进度
- v2.1.0
  - 支持 优学堂 获取习题答案
  - 支持 优学堂 倍速播放
- v2.0.0
  - 支持 中国大学MOOC 自动互评
  - 支持 中国大学MOOC 随机评语

<br/>

# 开源协议

MIT License.
