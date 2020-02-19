import TabItems from "./router";
import {HashRouter, NavLink, Route} from "react-router-dom";
import React from "react";
import "./options.less";
import "../styles/base.less";


const Menu: React.FC = () => (
  <div id="menu">
    <Title />
    <MenuItems />
  </div>
);

const MenuItems: React.FC = () => {
  return (
    <div id="tab-links">
      {TabItems.map((item, i) => (
        <NavLink exact to={item.route} activeClassName="active" key={i}>
          {item.label}
        </NavLink>
      ))}
    </div>
  );
};

const Title: React.FC = () => (
  <div id="page-title">
    <h1>慕课助手</h1>
  </div>
);

function TitleWrapper<T>(Page: React.ComponentType<T>, pageTitle: string) {
  return (props: T) => (
    <div>
      <div className="page-title">
        <h1>{pageTitle}</h1>
      </div>
      <Page {...props} />
    </div>
  )
}

const PageFrame: React.FC = () => {
  return (
    <div id="page-frame">
      {TabItems.map((item, i) => (
        <Route exact path={item.route} component={TitleWrapper(item.component, item.label)} key={i}/>
      ))}
    </div>
  );
};

export const Options: React.FC = () => {
  return (
    <HashRouter>
      <Menu />
      <PageFrame />
    </HashRouter>
  );
};
