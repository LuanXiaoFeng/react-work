import React, { Component } from 'react';
import Mlist from './mlist';
import Mpage from './mpage';
import *as actionCreators from '../actions/memberAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class MemberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            checked: '',
            state: '',
            namekind: '',
            stock: '',
            phonenum: '',
            dz: '',
            email:'',
            sx:'',
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
        let { member, memberpagecount } = this.props;
        member(1);
        memberpagecount();
    }
    click=()=>{
        let tanBox=document.getElementById('tanBox');
        tanBox.style.display='block';
    }
    declick = () => {
        let delBox = document.getElementById('delBox');
        delBox.style.display = 'none';
    }
    gbclick = () => {
        let tanBox = document.getElementById('tanBox');
        tanBox.style.display = 'none';
    }
    bjgbclick = () => {
        let BjtanBox = document.getElementById('BjtanBox');
        BjtanBox.style.display = 'none';
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
        let { name, state, namekind,nowpage, checked, phonenum, dz, email,sx} = this.state;
        let records = `&name=${name}&namekind=${namekind}&checked=${checked}&state=${state}&phonenum=${phonenum}&dz=${dz}&email=${email}&sx=${sx}`;
        let { memberCreate, member, memberpagecount } = this.props;
        if (namekind &&state && phonenum&&dz&&email&&name&&sx) {
            memberCreate(records);
            member(nowpage);
            memberpagecount();
            setTimeout(() => {
                tanBox.style.display = 'none';
                this.setState({
                    name: '',
                    dz: '',
                    phonenum: '',
                    state: '',
                    namekind: '',
                    id: '',
                    email:'',
                    sx:''
                })
            }, 50);
        } else {
            alert('请输入添加的内容')
        }
    }
    //编辑弹窗
    edit = (e) => {
        let BjtanBox = document.getElementById('BjtanBox');
        BjtanBox.style.display = 'block';
        this.setState({
            name: e.name,
            phonenum: e.phonenum,
            state: e.state,
            namekind: e.namekind,
            email: e.email,
            id: e.id,
            dz: e.dz,
            sx:e.sx
        })
    }
    //编辑确定更改
    tanclicknew = () => {
        let BjtanBox = document.getElementById('BjtanBox');
        let { name, phonenum, state, namekind, email, id, nowpage, dz,sx } = this.state;
        let { memberupdate, member } = this.props;
        let records = {
            name,
            phonenum,
            state,
            namekind,
            email,
            id,
            dz,
            sx
        }
        console.log(nowpage)
        memberupdate(records);
        member(nowpage)
        setTimeout(() => {
            BjtanBox.style.display = 'none'
        }, 50)
    }
    //获取当条数据的id
    idFn = (id) => {
        this.setState({ id })
    }
    //确定删除
    sureclick = () => {
        let { memberdel, member, memberpagecount, data, count } = this.props;
        let { id, nowpage } = this.state;
        console.log(nowpage)
        memberdel(id);
        member(nowpage);
        memberpagecount();
        if (data.length === 1) {
            this.setState({ onOff: false })
            member(nowpage - 1);
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
        let { member, memberdelAll, memberpagecount } = this.props;
        let { nowpage } = this.state;
        let delarr = data.filter(e => {
            return e.checked
        })
        let delNewArr = [];
        delarr.forEach(e => {
            delNewArr.push(e.id)
        });
        let ids = JSON.stringify(delNewArr)
        memberdelAll(ids)
        // odd(nowpage)
        member(nowpage);

        if (delNewArr.length === data.length) {
            // pagecount()
            --nowpage
            this.setState({ onOff: false, nowpage })
            member(nowpage);
        }
        memberpagecount();
        console.log(nowpage)
        this.setState({ nowpage })
    }
    //搜索查询
    searchClick = () => {
        let { searchName, nowpage } = this.state;
        let { membersearch, memfindpagecount } = this.props;
        let ssinfo = this.refs.ss.value;
        console.log(ssinfo)
        console.log(searchName)
        if (searchName) {
            this.setState({
                nowpage: 1,
                namekey: searchName,
                kindkey: ssinfo
            })
            membersearch(searchName, nowpage, ssinfo);
            memfindpagecount(searchName, ssinfo)
            this.refs.searchName.value = '';
        } else {
            alert('请输入查询内容')
        }
    }
    //刷新按钮
    reloadClick = () => {
        let { nowpage } = this.state;
        let { member, memberpagecount } = this.props;
        member(nowpage)
        memberpagecount()
        this.setState({
            nowpage: 1,
            kindkey: '',
            namekey: ''
        })
    }
    render() {
        let {data,count}=this.props;
        let { namekind,dz, state,phonenum,sx,email, name, onOff, nowpage, namekey, kindkey } = this.state;
        let newarr =data.length?data.map((e, i) => {
            return <Mlist
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
        }):[]
        return (
            <div>
                <div className="right_box">
                    <p className="br_nav">
                        <a>首页></a>
                        <a>会员列表</a>
                    </p>
                    <div className="right_bg">
                        <div className="content_box">
                            <p className="search">搜索查询</p>
                            <div className="table_search">
                                <span>搜索会员</span>
                                <select ref="ss">
                                    <option value="namekind">会员等级</option>
                                    <option value="name">会员名称</option>
                                    <option value="sx">性别</option>
                                    <option value="phonenum">手机号码</option>
                                    <option value="email">邮箱</option>
                                    <option value="dz">地址</option>
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
                            <div className="tab_content">
                                <div className="tab_table">
                                    <div className="btn_box clear">
                                        <a className="btn_add"
                                        onClick={this.click}
                                        ><i className="iconfont icon-tianjia"></i>添加分类</a>
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
                                                    <div className="th-inner ">用户名</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">性别</div>
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
                                                    <div className="th-inner ">地址</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">等级</div>
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
                                    <Mpage count={count} numFn={this.numFn} nowpage={nowpage} namekey={namekey} kindkey={kindkey} onOffFn={this.onOffFn} onOff={onOff}/>
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
                                <span>用 &nbsp;户&nbsp;名:</span>
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
                                <span>家庭住址:</span>
                                <input 
                                type="text" 
                                    value={dz}
                                    onChange={this.handleChange.bind(this)}
                                    name="dz"
                                />
                            </div>
                            <div className="input_info">
                                <span>会员等级:</span>
                                <select type="text"
                                    value={namekind}
                                    onChange={this.handleChange.bind(this)}
                                    name="namekind">
                                    <option value="请选择等级">请选择等级</option>
                                    <option value="全部">全部</option>
                                    <option value="普通会员">普通会员</option>
                                    <option value="铜牌会员">铜牌会员</option>
                                    <option value="银牌会员">银牌会员</option>
                                    <option value="王牌会员">王牌会员</option>
                                    <option value="钻石会员">钻石会员</option>
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
                                onClick={this.bjgbclick}
                            ><i>×</i></a>
                        </div>
                        <div className="input_content">
                            <div className="input_info">
                                <span>用 &nbsp;户&nbsp;名:</span>
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
                                <span>家庭住址:</span>
                                <input
                                    type="text"
                                    value={dz}
                                    onChange={this.handleChange.bind(this)}
                                    name="dz"
                                />
                            </div>
                            <div className="input_info">
                                <span>会员等级:</span>
                                <select type="text"
                                    value={namekind}
                                    onChange={this.handleChange.bind(this)}
                                    name="namekind">
                                    <option value="请选择等级">请选择等级</option>
                                    <option value="全部">全部</option>
                                    <option value="普通会员">普通会员</option>
                                    <option value="铜牌会员">铜牌会员</option>
                                    <option value="银牌会员">银牌会员</option>
                                    <option value="王牌会员">王牌会员</option>
                                    <option value="钻石会员">钻石会员</option>
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
                                    onClick={this.bjgbclick}
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

// export default MemberList;
export default connect((state) => {
    return {
        data: state.reducer3.content,
        count: state.reducer3.page
    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(MemberList)) 