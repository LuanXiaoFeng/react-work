import React, { Component } from 'react';
import *as actionCreator from '../actions/orderAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import OrderList from './orderList';
import OrderPage from './orderPage';
import OrderInfo from './orderInfo';
class OrderTab extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            price: '',
            checked: '',
            state: '',
            namekind: '',
            stock: '',
            jyprice:'',
            yhprice:'',
            nowpage: 1,
            pagecontent: 10,
            onOff: false,
            id: '',
            searchName: '',
            namekey: '',
            kindkey: '',
            e:''
        };
    }
    change=()=>{}
    click = () => {
        let delBox = document.getElementById('delBox');
        delBox.style.display = 'none'
    }
    delClick=()=>{
        let delBox=document.getElementById('delBox');
        delBox.style.display='block'
    }
    componentDidMount(){
        let { order, orderpagecount}=this.props;
        order(1)
        orderpagecount()
    }
    // componentWillMount() {
    //     let { url: { history } } = this.props;
    //     if (!sessionStorage.getItem('key')) {
    //         history.push('/')
    //     }
    // }
    //接收页码的num
    numFn = (num) => {
        this.setState({ nowpage: num })
    }
    //添加弹窗的value
    handleChange = (ev) => {
        let name, obj;
        name = ev.target.name;
        this.setState((
            obj = {},
            obj["" + name] = ev.target.value,
            obj
        ))
    }
    //全部选中的开关
    onOffFn = (onOff) => {
        this.setState({ onOff })
    }
    //获取当条数据的id
    idFn = (id) => {
        this.setState({ id })
    }
    //全选按钮
    changeAll = () => {
        let { onOff } = this.state;
        let { data } = this.props;
        onOff = !onOff;
        for (let i = 0; i < data.length; i++) {
            if (data[i]) {
                data[i].checked = onOff
            }
        }
        this.setState({ onOff })
    }
    //删除
    sureclick = () => {
        let { orderdel, order, orderpagecount, data, count } = this.props;
        let { id, nowpage } = this.state;
        console.log(nowpage)
        orderdel(id);
        order(nowpage);
        orderpagecount();
        if (data.length === 1) {
            this.setState({ onOff: false })
            order(nowpage - 1);
            this.setState({ nowpage: count - 1 })
            // console.log(nowpage, count)
        }
        setTimeout(function () {
            let delBox = document.getElementById('delBox');
            delBox.style.display = 'none'
        }, 50)
    }
    delAllClick = () => {
        let { data } = this.props;
        let { order, orderdelAll, orderpagecount } = this.props;
        let { nowpage } = this.state;
        let delarr = data.filter(e => {
            return e.checked
        })
        let delNewArr = [];
        delarr.forEach(e => {
            delNewArr.push(e.id)
        });
        let ids = JSON.stringify(delNewArr)
        orderdelAll(ids)
        // odd(nowpage)
        order(nowpage);

        if (delNewArr.length === data.length) {
            // pagecount()
            console.log(1)
            --nowpage
            this.setState({ onOff: false, nowpage })
            order(nowpage);
        }
        orderpagecount()
        console.log(nowpage)
        this.setState({nowpage})
    }
    //搜索
    searchClick = () => {
        let { searchName, nowpage } = this.state;
        let { ordersearch, orderfindpagecount } = this.props;
        let ssinfo = this.refs.ss.value;
        console.log(ssinfo)
        console.log(searchName)
        if (searchName) {
            this.setState({
                nowpage: 1,
                namekey: searchName,
                kindkey: ssinfo
            })
            ordersearch(searchName, nowpage, ssinfo);
            orderfindpagecount(searchName, ssinfo)
            this.refs.searchName.value = '';
        } else {
            alert('请输入查询内容')
        }
    }
    //刷新按钮
    reloadClick = () => {
        let { nowpage } = this.state;
        let { order, orderpagecount } = this.props;
        order(nowpage)
        orderpagecount()
        this.setState({
            nowpage: 1,
            kindkey: '',
            namekey: ''
        })
    }
    //获取当前的这一条的数据
    dataNow=(e)=>{
        this.setState({e})
    }
    render() {
        let { data, count } = this.props;
        // console.log(data);
        
        let {onOff, nowpage, namekey, kindkey ,e} = this.state;
        let newarr = data.length?data.map((e, i) => {
            return <OrderList
                {...{
                    key: i,
                    e,
                    i,
                    onOff,
                    onOffFn: this.onOffFn,
                    idFn: this.idFn,
                    dataNow: this.dataNow
                }}
            />
        }):[]
        return (
            <div>
                <div className="right_box" id="parent_box">
                    <p className="br_nav">
                        <a>首页></a>
                        <a>订单管理</a>
                    </p>
                    <div className="right_bg">
                        <div className="content_box">
                            <p className="search">搜索查询</p>
                            <div className="table_search">
                                <span>产品分类</span>
                                <select ref="ss">
                                    <option value="namekind">产品分类</option>
                                    <option value="name">产品名称</option>
                                    <option value="stock">数量</option>
                                    <option value="price">总价</option>
                                    <option value="yhprice">优惠</option>
                                    <option value="jyprice">交易</option>
                                    <option value="state">状态</option>
                                </select>
                                <span>搜索内容</span>
                                <input
                                    type="text"
                                    placeholder="输入搜索内容"
                                    onChange={this.handleChange.bind(this)}
                                    ref="searchName"
                                    name="searchName"
                                />
                                <a
                                    onClick={this.searchClick}
                                >查询</a>
                                <a
                                    onClick={this.reloadClick}
                                    className="reload"
                                >刷新</a>
                            </div>
                        </div>
                        <div className="tab_box">
                            <div className="tab_nav"></div>
                            <div className="tab_content">
                                <div className="tab_table">
                                    <div className="btn_box clear">
                                        <a className="btn_remove"
                                            onClick={this.delAllClick}
                                        ><i className="iconfont icon-shanchu1"></i>批量删除</a>
                                    </div>
                                    <table className="table-striped" data-operate-edit="1" data-operate-del="1" width="95%">
                                        <thead>
                                            <tr>
                                                <th className="bs-checkbox ">
                                                    <div className="th-inner ">
                                                        <input 
                                                            name="btSelectAll" 
                                                            type="checkbox"
                                                            checked={onOff ? 'checked' : ''}
                                                            onChange={this.changeAll}
                                                        />
                                                    </div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">订单编号</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">产品名称</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">总价</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">优惠</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">交易金额</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">所属类型</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">数量</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">状态</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">操作</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {newarr}
                                        </tbody>
                                    </table>
                                    <OrderPage count={count} numFn={this.numFn} nowpage={nowpage} namekey={namekey} kindkey={kindkey} onOffFn={this.onOffFn} onOff={onOff}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tan_content" id="delBox">
                    <div className="bg"></div>
                    <div className="tan_box delete_box">
                        <div className="tan_title clear">
                            <span>删除</span>
                            <a
                                onClick={this.click}
                            ><i>×</i></a>
                        </div>
                        <div className="text_box">
                            <i></i>
                            <span>确定删除此项？</span>
                        </div>
                        <div className="input_content">
                            <div className="btn_sure btn_two">
                                <a className="sure"
                                    onClick={this.sureclick}
                                >确定</a>
                                <a className="replay"
                                    onClick={this.click}
                                >取消</a>
                            </div>
                        </div>
                    </div>
                </div>
                <OrderInfo e={e}/>
            </div>
        );
    }
}

// export default OrderTab;
export default connect((state) => {
    return {
        data: state.reducer1.content,
        count: state.reducer1.page
    };
}, (dispatch) => bindActionCreators(actionCreator, dispatch))(withRouter(OrderTab)) 