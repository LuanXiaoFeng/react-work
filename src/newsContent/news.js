import React, { Component } from 'react';
import NewsList from './newslist';
import NewsPage from './newspage';
import *as actionCreators from '../actions/newsAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            checked: '',
            state: '',
            newsinfo: '',
            time:'',
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
        let { newsodd, newspagecount } = this.props;
        newsodd(1);
        newspagecount();
    }
    click=()=>{
        let tanBox=document.getElementById('tanBox');
        tanBox.style.display='block';
    }
    declick=()=>{
        let delBox=document.getElementById('delBox');
        delBox.style.display='none';
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
    //获取当条数据的id
    idFn = (id) => {
        this.setState({ id })
    }
    //确定删除
    sureclick = () => {
        let { newsdel, newsodd, newspagecount, data, count } = this.props;
        let { id, nowpage } = this.state;
        console.log(nowpage,id)
        newsdel(id);
        newsodd(nowpage);
        newspagecount();
        if (data.length === 1) {
            this.setState({ onOff: false })
            newsodd(nowpage - 1);
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
        let { newsodd, newsdelAll, newspagecount } = this.props;
        let { nowpage } = this.state;
        let delarr = data.filter(e => {
            return e.checked
        })
        let delNewArr = [];
        delarr.forEach(e => {
            delNewArr.push(e.id)
        });
        let ids = JSON.stringify(delNewArr)
        newsdelAll(ids)
        newsodd(nowpage);
        if (delNewArr.length === data.length) {
            newspagecount();
            --nowpage
            this.setState({ onOff: false, nowpage })
            newsodd(nowpage);
        }
        newspagecount();
        console.log(nowpage)
        this.setState({ nowpage })
    }
    //搜索查询
    searchClick = () => {
        let { searchName, nowpage } = this.state;
        let { newsearch, newsfindpagecount } = this.props;
        let ssinfo = this.refs.ss.value;
        console.log(ssinfo)
        console.log(searchName)
        if (searchName) {
            this.setState({
                nowpage: 1,
                namekey: searchName,
                kindkey: ssinfo
            })
            newsearch(searchName, nowpage, ssinfo);
            newsfindpagecount(searchName, ssinfo)
            this.refs.searchName.value = '';
        } else {
            alert('请输入查询内容')
        }
    }
    //刷新按钮
    reloadClick = () => {
        let { nowpage } = this.state;
        let { newsodd, newspagecount } = this.props;
        newsodd(nowpage)
        newspagecount()
        this.setState({
            nowpage: 1,
            kindkey: '',
            namekey: ''
        })
    }
    render() {
        let { data, count } = this.props;
        let {onOff, nowpage, namekey, kindkey } = this.state;
        let newarr = data.length?data.map((e, i) => {
            return <NewsList
                {...{
                    key: i,
                    e,
                    i,
                    onOff,
                    onOffFn: this.onOffFn,
                    idFn: this.idFn
                }}
            />
        }):[]
        return (
            <div>
                <div className="right_box">
                    <p className="br_nav">
                        <a>首页></a>
                        <a>留言列表</a>
                    </p>
                    <div className="right_bg">
                        <div className="content_box">
                            <p className="search">搜索查询</p>
                            <div className="table_search">
                                <span>搜索留言</span>
                                <select ref="ss">
                                    <option value="name">用户名</option>
                                    <option value="newsinfo">留言内容</option>
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
                                                    <div className="th-inner ">留言内容</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">时间</div>
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
                                    <NewsPage count={count} numFn={this.numFn} nowpage={nowpage} namekey={namekey} kindkey={kindkey} onOffFn={this.onOffFn} onOff={onOff}/>
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

// export default News;
export default connect((state) => {
    return {
        data: state.reducer4.content,
        count: state.reducer4.page
    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(News))