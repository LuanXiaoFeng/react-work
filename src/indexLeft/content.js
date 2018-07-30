import React, { Component } from 'react';
import EchartsTest from './echarts';
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // componentWillMount(){
    //     let {url:{history}}=this.props;
    //     if(!sessionStorage.getItem('key')){
    //         history.push('/')
    //     }
    // }
    render() {
        return (
            <div className="right_box">
            <p className="br_nav">
                <a>首页</a>
            </p>
            <div className="right_bg">
                <div className="right_content">
                    <div className="right_item clear">
                        <span className="ico_one iconfont icon-yonghu"></span>
                        <span className="ico_text">
                            <span className="num">35200</span>
                            <span className="text_info">总会员数</span>
                        </span>
                    </div>
                    <div className="right_item clear">
                        <span className="ico_one ico_two iconfont icon-jiaoyijilu"></span>
                        <span className="ico_text">
                            <span className="num">55400</span>
                            <span className="text_info">总访问数</span>
                        </span>
                    </div>
                    <div className="right_item clear">
                        <span className="ico_one ico_three iconfont icon-gouwuche1"></span>
                        <span className="ico_text">
                            <span className="num">80500</span>
                            <span className="text_info">总订单数</span>
                        </span>
                    </div>
                    <div className="right_item clear">
                        <span className="ico_one ico_four iconfont icon-fenxiaoshangpinliebiao"></span>
                        <span className="ico_text">
                            <span className="num">14520</span>
                            <span className="text_info">总金额</span>
                        </span>
                    </div>
                </div>
                <div className="img_table">
                    <div className="data_wrap">
                        <div className="animsition">
                            <div className="animsition_box">
                                <div id="main3">
                                    <EchartsTest/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="info_box clear">
                    <div className="info_item">
                        <div className="item_line">
                            <span className="ico_info iconfont icon-1huojian"></span>
                            <span className="ico_text">
                                <span className="item_num">450</span>
                                <span className="item_today">今日注册</span>
                            </span>
                        </div>
                    </div>
                    <div className="info_item">
                        <div className="item_line">
                            <span className="ico_info iconfont icon-gouwuche"></span>
                            <span className="ico_text">
                                <span className="item_num">120</span>
                                <span className="item_today">今日登录</span>
                            </span>
                        </div>
                    </div>
                    <div className="info_item">
                        <div className="item_line">
                            <span className="ico_info iconfont icon-zhexiantu"></span>
                            <span className="ico_text">
                                <span className="item_num">330</span>
                                <span className="item_today">今日订单</span>
                            </span>
                        </div>
                    </div>
                    <div className="info_item">
                        <div className="item_line">
                            <span className="ico_info iconfont icon-dingdan1"></span>
                            <span className="ico_text">
                                <span className="item_num">80</span>
                                <span className="item_today">未处理订单</span>
                            </span>
                        </div>
                    </div>
                    <div className="info_item">
                        <div className="item_line">
                            <span className="ico_info iconfont icon-liebiao1"></span>
                            <span className="ico_text">
                                <span className="item_num">320</span>
                                <span className="item_today">七日增新</span>
                            </span>
                        </div>
                    </div>
                    <div className="info_item">
                        <div className="item_line">
                            <span className="ico_info iconfont icon-qian"></span>
                            <span className="ico_text">
                                <span className="item_num">320</span>
                                <span className="item_today">七日活跃</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Content;