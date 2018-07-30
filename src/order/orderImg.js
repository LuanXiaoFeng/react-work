import React, { Component } from 'react';
import ImgEcharts from './imgEchart';
import '../css/info.css';

class OrderImg extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="right_box">
                <p className="br_nav">
                    <a>首页></a>
                    <a>订单管理</a>
                </p>
                <ImgEcharts/>
            </div> 
        );
    }
}

export default OrderImg;