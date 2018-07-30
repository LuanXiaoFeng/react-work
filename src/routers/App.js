import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import IndexLeft from '../indexLeft/index';
import Content from '../indexLeft/content';
import ProductList from '../productContent/productList';
import Advertising from '../imgContent/advertising';
import OrderTab from '../order/orderTable';
import OrderImg from '../order/orderImg';
import MemberList from '../member/memberList';
import News from '../newsContent/news';
import SystemSetup from '../systemSetup/systemSetup';
import ManagerList from '../manager/managerList';
import Login from '../login/login';
import cookie from 'react-cookies';
import '../css/index.css';
import '../css/tan.css';
import '../css/tool.css';
import '../iconfont/iconfont.css';

class App extends Component {
  render() {
    return <div className="route_box">
        <Route path="/index" render={props => {
            return <IndexLeft url={props} />;
          }} />
        <Route exact path="/index" render={props => {
            return <Content url={props} />;
          }} />
        <Route path="/index/product" render={props => {
            return <ProductList url={props} />;
          }} />
        <Route path="/index/advertising" render={props => {
            return <Advertising url={props} />;
          }} />
        <Route path="/index/ordertab" render={props => {
            return <OrderTab url={props} />;
          }} />
        <Route path="/index/orderimg" render={props => {
            return <OrderImg url={props} />;
          }} />
        <Route path="/index/memberlist" render={props => {
            return <MemberList url={props} />;
          }} />
        <Route path="/index/news" render={props => {
            return <News url={props} />;
          }} />
        <Route path="/index/systemsetup" render={props => {
            return <SystemSetup url={props} />;
          }} />
        <Route path="/index/managerlist" render={props => {
            return <ManagerList url={props} />;
          }} />
        <Route exact path="/" render={props => {
            if (cookie.load("username")) {
              return <Redirect to="/index" />
            } else {
              return <Login url={props} />
            }
            
          }} />
      </div>;
  }
}

export default App;
