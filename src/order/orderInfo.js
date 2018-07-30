import React, { Component } from 'react';
import '../css/info.css';
class OrderInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    backClick=()=>{
        let childBox = document.getElementById('child_box');
        childBox.style.display = 'none';
        let parentBox = document.getElementById('parent_box');
        parentBox.style.display = 'block';
    }
    render() {
        let {e}=this.props;
        console.log(e)
        return (
            <div className="right_box" id="child_box" style={{display:'none'}}>
            <p className="br_nav">
                <a>首页></a>
                <a>订单管理</a>
            </p>
            <div className="right_bg">
                <div className="content_box clear">
                        <p className="search search_order">订单详情</p>
                    <span className="back_list"
                        onClick={this.backClick}
                    >返回订单列表</span>
                </div>
                <div className="tab_box">
                    <div className="tab_nav">
                    </div>
                    <div className="tab_content">
                        <div className="tab_table">
                            <p className="table_text">基本信息</p>
                            <table className="table-striped" data-operate-edit="1" data-operate-del="1" width="95%">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="th-inner ">订单编号</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">发货流水单号</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">用户账号</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">支付方式</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">订单来源</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">订单类型</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr> 
                                        <td>{e.number}</td>
                                        <td>{e.state}</td>
                                        <td>{e.id}</td> 
                                        <td>未支付</td>  
                                        <td>APP订单</td> 
                                        <td>普通订单</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="table_text">发票信息</p>
                            <table className="table-striped" data-operate-edit="1" data-operate-del="1" width="95%">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="th-inner ">发票类型</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">发票抬头</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">发票内容</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">收票人信息</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr> 
                                        <td>电子普通发票</td>
                                        <td>个人</td>
                                        <td>{e.namekind}</td> 
                                        <td>{e.id}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="table_text">收货人信息</p>
                            <table className="table-striped" data-operate-edit="1" data-operate-del="1" width="95%">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="th-inner ">收货人</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">手机号码</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">邮政编码</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">收货地址</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr> 
                                        <td>大梨</td>
                                        <td>{e.id}</td>
                                        <td>518000</td> 
                                        <td>广东省深圳市南山区科兴科学园</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="table_text">商品信息</p>
                            <table className="table-striped" data-operate-edit="1" data-operate-del="1" width="95%">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="th-inner ">商品名称</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">价格/货号</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">属性</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">数量</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">库存</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">小计</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr> 
                                        <td>{e.name}</td>
                                        <td>
                                            <span>价格:{e.jyprice}</span>
                                        </td>
                                        <td>{e.namekind}</td> 
                                        <td>1</td>  
                                        <td>{e.stock}</td> 
                                        <td>{e.stock}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="table_text">费用累计</p>
                            <table className="table-striped" data-operate-edit="1" data-operate-del="1" width="95%">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="th-inner ">商品合计</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">运费</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">优惠券</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                        <th>
                                            <div className="th-inner ">优币抵扣</div>
                                            <div className="fht-cell"></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr> 
                                        <td>{e.stock}</td>
                                        <td>￥0.00</td>
                                        <td>-￥0.00</td> 
                                        <td>-￥0.00</td>  
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default OrderInfo;