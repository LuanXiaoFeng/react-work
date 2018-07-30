import React, { Component } from 'react';
import ListTab from './listtab';
import ListPage from './listpage';
import *as actionCreators from '../actions/managerAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class ManagerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            checked: '',
            state: '',
            namekind: '',
            phonenum: '',
            email: '',
            sx: '',
            nowpage: 1,
            pagecontent: 10,
            onOff: false,
            id: '',
            searchName: '',
            namekey: '',
            kindkey: ''
        };
    }
    change=()=>{}
    componentDidMount() {
        let { managerodd, managerpagecount } = this.props;
        managerodd(1);
        managerpagecount();
    }
    click=()=>{
        let tanBox=document.getElementById('tanBox');
        tanBox.style.display='block';
    }
    gbclick=()=>{
        let tanBox = document.getElementById('tanBox');
        tanBox.style.display = 'none';
        let BjtanBox = document.getElementById('BjtanBox');
        BjtanBox.style.display = 'none';
    }
    delClick=()=>{
        let delBox=document.getElementById('delBox');
        delBox.style.display='block';
    }
    declick=()=>{
        let delBox = document.getElementById('delBox');
        delBox.style.display = 'none';
    }
    // componentWillMount() {
    //     let { url: { history } } = this.props;
    //     if (!sessionStorage.getItem('key')) {
    //         history.push('/')
    //     }
    // }
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
    //接收页码的num
    numFn = (num) => {
        this.setState({ nowpage: num })
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
    //确定添加
    surclick = () => {
        let tanBox = document.getElementById('tanBox');
        let { name, state, namekind, nowpage, checked, phonenum,sx,email } = this.state;
        let records = `&name=${name}&namekind=${namekind}&checked=${checked}&state=${state}&phonenum=${phonenum}&email=${email}&sx=${sx}`;
        let { managercreate, managerodd, managerpagecount } = this.props;
        if (namekind && state && phonenum&& email && name && sx) {
            managercreate(records);
            managerodd(nowpage);
            managerpagecount();
            setTimeout(() => {
                tanBox.style.display = 'none';
                this.setState({
                    name: '',
                    phonenum: '',
                    state: '',
                    namekind: '',
                    id: '',
                    email: '',
                    sx: ''
                })
            }, 50);
        } else {
            alert('请输入添加的内容')
        }
    }
    //确定删除
    sureclick = () => {
        let { managerdel, managerodd, managerpagecount, data, count } = this.props;
        let { id, nowpage } = this.state;
        console.log(nowpage)
        managerdel(id);
        managerodd(nowpage);
        managerpagecount();
        if (data.length === 1) {
            this.setState({ onOff: false })
            managerodd(nowpage - 1);
            this.setState({ nowpage: count - 1 })
            // console.log(nowpage, count)
        }
        setTimeout(function () {
            let delBox = document.getElementById('delBox');
            delBox.style.display = 'none'
        }, 50)
    }
    //批量删除
    delAllClick = () => {
        let { data } = this.props;
        let { managerodd, managerdelAll, managerpagecount } = this.props;
        let { nowpage } = this.state;
        let delarr = data.filter(e => {
            return e.checked
        })
        let delNewArr = [];
        delarr.forEach(e => {
            delNewArr.push(e.id)
        });
        let ids = JSON.stringify(delNewArr)
        managerdelAll(ids)
        // odd(nowpage)
        managerodd(nowpage);

        if (delNewArr.length === data.length) {
            // pagecount()
            --nowpage
            this.setState({ onOff: false, nowpage })
            managerodd(nowpage);
        }
        managerpagecount();
        console.log(nowpage)
        this.setState({ nowpage })
    }
    //编辑弹窗
    edit = (e) => {
        console.log(e)
        let BjtanBox = document.getElementById('BjtanBox');
        BjtanBox.style.display = 'block';
        this.setState({
            name: e.name,
            phonenum: e.phonenum,
            state: e.state,
            namekind: e.namekind,
            email: e.email,
            id: e.id,
            sx: e.sx
        })
    }
    //编辑确定更改
    tanclicknew = () => {
        let BjtanBox = document.getElementById('BjtanBox');
        let { name, phonenum, state, namekind, email, id, nowpage,sx } = this.state;
        let { managerupdate, managerodd } = this.props;
        let records = {
            name,
            phonenum,
            state,
            namekind,
            email,
            id,
            sx
        }
        console.log(nowpage)
        managerupdate(records);
        managerodd(nowpage)
        setTimeout(() => {
            BjtanBox.style.display = 'none'
        }, 50)
    }
    //搜索查询
    searchClick = () => {
        let { searchName, nowpage } = this.state;
        let { managersearch, managerfindpagecount } = this.props;
        let ssinfo = this.refs.ss.value;
        console.log(ssinfo)
        console.log(searchName)
        if (searchName) {
            this.setState({
                nowpage: 1,
                namekey: searchName,
                kindkey: ssinfo
            })
            managersearch(searchName, nowpage, ssinfo);
            managerfindpagecount(searchName, ssinfo)
            this.refs.searchName.value = '';
        } else {
            alert('请输入查询内容')
        }
    }
    //刷新按钮
    reloadClick = () => {
        let { nowpage } = this.state;
        let { managerodd, managerpagecount } = this.props;
        managerodd(nowpage)
        managerpagecount()
        this.setState({
            nowpage: 1,
            kindkey: '',
            namekey: ''
        })
    }
    render() {
        let { data, count } = this.props;
        let { namekind,state, phonenum, sx, email, name, onOff, nowpage, namekey, kindkey } = this.state;
        let newarr = data.length ? data.map((e, i) => {
            return <ListTab
                {...{
                    key: i,
                    e,
                    i,
                    onOff,
                    onOffFn: this.onOffFn,
                    idFn: this.idFn,
                    edit: this.edit
                }}
            />
        }) : []
        return (
            <div>
                <div className="right_box">
                    <p className="br_nav">
                        <a>首页></a>
                        <a>管理员列表</a>
                    </p>
                    <div className="right_bg">
                        <div className="content_box">
                            <p className="search">搜索查询</p>
                            <div className="table_search">
                                <span>搜索管理员</span>
                                <select ref="ss">
                                    <option value="namekind">角色</option>
                                    <option value="name">登录名</option>
                                    <option value="sx">性别</option>
                                    <option value="phonenum">手机号码</option>
                                    <option value="email">邮箱</option>
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
                            <div className="tab_nav">
                            </div>
                            <div className="tab_content">
                                <div className="tab_table">
                                    <div className="btn_box clear">
                                        {/* <a className="btn_add"
                                        onClick={this.click}
                                        ><i className="iconfont icon-tianjia"></i>添加管理员</a> */}
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
                                                    <div className="th-inner ">编号</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">登录名</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">手机</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">邮箱</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">角色</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">性别</div>
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
                                    <ListPage count={count} numFn={this.numFn} nowpage={nowpage} namekey={namekey} kindkey={kindkey} onOffFn={this.onOffFn} onOff={onOff}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 添加弹窗 */}
                <div className="tan_content" id="tanBox">
                    <div className="bg"></div>
                    <div className="tan_box">
                        <div className="tan_title clear">
                            <span>添加</span>
                            <a
                                onClick={this.gbclick}
                            ><i>×</i></a>
                        </div>
                        <div className="input_content">
                            <div className="input_info">
                                <span>管 &nbsp;理&nbsp;员:</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={this.handleChange.bind(this)}
                                    name="name"
                                />
                            </div>
                            <div className="input_info">
                                <span>移动电话:</span>
                                <input
                                    type="text"
                                    value={phonenum}
                                    onChange={this.handleChange.bind(this)}
                                    name="phonenum"
                                />
                            </div>
                            <div className="input_info">
                                <span>电子邮箱:</span>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={this.handleChange.bind(this)}
                                    name="email"
                                />
                            </div>
                            <div className="input_info">
                                <span>角色等级:</span>
                                <select type="text"
                                    value={namekind}
                                    onChange={this.handleChange.bind(this)}
                                    name="namekind">
                                    <option value="请选择等级">请选择等级</option>
                                    <option value="全部">全部</option>
                                    <option value="普通管理员">普通管理员</option>
                                    <option value="超级管理员">超级管理员</option>
                                </select>
                            </div>
                            <div className="input_info">
                                <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</span>
                                <select type="text"
                                    value={state}
                                    onChange={this.handleChange.bind(this)}
                                    name="state">
                                    <option value="请选择状态">请选择状态</option>
                                    <option value="启用">启用</option>
                                    <option value="停用">停用</option>
                                </select>
                            </div>
                            <div className="input_info">
                                <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</span>
                                <select type="text"
                                    value={sx}
                                    onChange={this.handleChange.bind(this)}
                                    name="sx">
                                    <option value="请选择状态">请选择状态</option>
                                    <option value="男">男</option>
                                    <option value="女">女</option>
                                    <option value="保密">保密</option>
                                </select>
                            </div>
                            <div className="btn_sure">
                                <a className="sure"
                                    onClick={this.surclick}
                                >提交</a>
                                <a className="replay"
                                    onClick={this.gbclick}
                                >取消</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 编辑弹窗 */}
                <div className="tan_content" id="BjtanBox">
                    <div className="bg"></div>
                    <div className="tan_box">
                        <div className="tan_title clear">
                            <span>编辑</span>
                            <a
                                onClick={this.gbclick}
                            ><i>×</i></a>
                        </div>
                        <div className="input_content">
                            <div className="input_info">
                                <span>管 &nbsp;理&nbsp;员:</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={this.handleChange.bind(this)}
                                    name="name"
                                />
                            </div>
                            <div className="input_info">
                                <span>移动电话:</span>
                                <input
                                    type="text"
                                    value={phonenum}
                                    onChange={this.handleChange.bind(this)}
                                    name="phonenum"
                                />
                            </div>
                            <div className="input_info">
                                <span>电子邮箱:</span>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={this.handleChange.bind(this)}
                                    name="email"
                                />
                            </div>
                            <div className="input_info">
                                <span>角色等级:</span>
                                <select type="text"
                                    value={namekind}
                                    onChange={this.handleChange.bind(this)}
                                    name="namekind">
                                    <option value="请选择等级">请选择等级</option>
                                    <option value="全部">全部</option>
                                    <option value="普通管理员">普通管理员</option>
                                    <option value="超级管理员">超级管理员</option>
                                </select>
                            </div>
                            <div className="input_info">
                                <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</span>
                                <select type="text"
                                    value={state}
                                    onChange={this.handleChange.bind(this)}
                                    name="state">
                                    <option value="请选择状态">请选择状态</option>
                                    <option value="启用">启用</option>
                                    <option value="停用">停用</option>
                                </select>
                            </div>
                            <div className="input_info">
                                <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</span>
                                <select type="text"
                                    value={sx}
                                    onChange={this.handleChange.bind(this)}
                                    name="sx">
                                    <option value="请选择状态">请选择状态</option>
                                    <option value="男">男</option>
                                    <option value="女">女</option>
                                    <option value="保密">保密</option>
                                </select>
                            </div>
                            <div className="btn_sure">
                                <a className="sure"
                                    onClick={this.tanclicknew}
                                >提交</a>
                                <a className="replay"
                                    onClick={this.gbclick}
                                >取消</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 删除弹窗 */}
                <div className="tan_content" id="delBox">
                    <div className="bg"></div>
                    <div className="tan_box delete_box">
                        <div className="tan_title clear">
                            <span>删除</span>
                            <a
                                onClick={this.declick}
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
                                    onClick={this.declick}
                                >取消</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// export default ManagerList;
export default connect((state) => {
    return {
        data: state.reducer5.content,
        count: state.reducer5.page
    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(ManagerList)) 