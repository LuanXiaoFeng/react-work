import React, { Component } from 'react';
import ImgList from './imgList';
import ImgPage from './imgpage';
import *as actionCreators from '../actions/imgAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Advertising extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            checked: '',
            state: '',
            namekind: '',
            stock: '',
            info:'',
            dz:'',
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
        let { imgGetData, imgpagecount} = this.props;
        imgGetData(1);
        imgpagecount();
    }
    click=()=>{
        let tanBox=document.getElementById('tanBox');
        tanBox.style.display='block';
        this.setState({
            name: '',
            number: '',
            price: '',
            state: '',
            namekind: '',
            stock: '',
            id: ''
        })
    }
    //确定添加
    surclick = () => {
        let tanBox = document.getElementById('tanBox');
        let { name,state, namekind, stock, nowpage, checked,info,dz } = this.state;
        let records = `&name=${name}&namekind=${namekind}&stock=${stock}&checked=${checked}&state=${state}&info=${info}&dz=${dz}`;
        let { imgcreate, imgGetData, imgpagecount} = this.props;
        if (namekind && stock && state && info) {
            imgcreate(records);
            imgGetData(nowpage);
            imgpagecount();
            setTimeout(() => {
                tanBox.style.display = 'none';
                this.setState({
                    name: '',
                    dz: '',
                    info: '',
                    state: '',
                    namekind: '',
                    stock: '',
                    id: ''
                })
            }, 50);
        } else {
            alert('请输入添加的内容')
        }
    }
    gbclick=()=>{
        let tanBox = document.getElementById('tanBox');
        tanBox.style.display = 'none';
    }
    bjgbclick=()=>{
        let BjtanBox = document.getElementById('BjtanBox');
        BjtanBox.style.display = 'none';
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
    //获取当条数据的id
    idFn = (id) => {
        this.setState({ id })
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
    //编辑弹窗
    edit = (e) => {
        let BjtanBox = document.getElementById('BjtanBox');
        BjtanBox.style.display = 'block';
        this.setState({
            name: e.name,
            info: e.info,
            state: e.state,
            namekind: e.namekind,
            stock: e.stock,
            id: e.id,
            dz:e.dz
        })
    }
    //编辑确定更改
    tanclicknew = () => {
        let BjtanBox = document.getElementById('BjtanBox');
        let { name, info, state, namekind, stock, id, nowpage ,dz} = this.state;
        let { imgupdate, imgGetData } = this.props;
        let records = {
            name,
            info,
            state,
            namekind,
            stock,
            id,
            dz
        }
        console.log(nowpage)
        imgupdate(records);
        imgGetData(nowpage)
        setTimeout(() => {
            BjtanBox.style.display = 'none'
        }, 50)
    }
    //确定删除
    sureclick = () => {
        let { imgdel, imgGetData, imgpagecount, data, count } = this.props;
        let { id, nowpage } = this.state;
        console.log(nowpage)
        imgdel(id);
        imgGetData(nowpage);
        imgpagecount();
        if (data.length === 1) {
            this.setState({ onOff: false })
            imgGetData(nowpage - 1);
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
        let { imgGetData, imgdelAll, imgpagecount } = this.props;
        let { nowpage } = this.state;
        let delarr = data.filter(e => {
            return e.checked
        })
        let delNewArr = [];
        delarr.forEach(e => {
            delNewArr.push(e.id)
        });
        let ids = JSON.stringify(delNewArr)
        imgdelAll(ids)
        // odd(nowpage)
        imgGetData(nowpage);

        if (delNewArr.length===data.length) {
            // pagecount()
            console.log(1)
            --nowpage
            this.setState({ onOff: false, nowpage })
            imgGetData(nowpage);
        }
        imgpagecount()
        console.log(nowpage)
        this.setState({ nowpage})
    }
    //搜索查询
    searchClick = () => {
        let { searchName, nowpage } = this.state;
        let { imgsearch, imgfindpagecount } = this.props;
        let ssinfo = this.refs.ss.value;
        console.log(ssinfo)
        console.log(searchName)
        if (searchName) {
            this.setState({
                nowpage: 1,
                namekey: searchName,
                kindkey: ssinfo
            })
            imgsearch(searchName, nowpage, ssinfo);
            imgfindpagecount(searchName, ssinfo)
            this.refs.searchName.value = '';
        } else {
            alert('请输入查询内容')
        }
    }
    //刷新按钮
    reloadClick = () => {
        let { nowpage } = this.state;
        let { imgGetData, imgpagecount } = this.props;
        imgGetData(nowpage)
        imgpagecount()
        this.setState({
            nowpage: 1,
            kindkey: '',
            namekey: ''
        })
    }
    render() {
        let {data,count}=this.props;
        let { namekind, stock, info, dz, state, name, onOff,nowpage,namekey,kindkey}=this.state;
        let newarr =data.length?data.map((e, i) => {
            return <ImgList
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
                        <a>图片管理></a>
                        <a>广告管理</a>
                    </p>
                    <div className="right_bg">
                        <div className="content_box">
                            <p className="search">搜索查询</p>
                            <div className="table_search">
                                <span>图片分类</span>
                                <select ref="ss">
                                    <option value="namekind">产品分类</option>
                                    <option value="dz">图片地址</option>
                                    <option value="stock">数量</option>
                                    <option value="info">描述</option>
                                    <option value="state">状态</option>
                                </select>
                                <span>搜索内容</span>
                                <input
                                    type="text"
                                    placeholder="输入品牌名称"
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
                                {/* <a className="cur">全部</a>
                                <a>首页轮播</a>
                                <a>轮播广告</a>
                                <a>单个广告</a> */}
                            </div>
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
                                                    <div className="th-inner ">分类</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">名称</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">数量</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">描述</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">链接地址</div>
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
                                    <ImgPage count={count} numFn={this.numFn} nowpage={nowpage} namekey={namekey} kindkey={kindkey} onOffFn={this.onOffFn} onOff={onOff} />
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
                                <span>所属分类:</span>
                                <select
                                    value={namekind}
                                    onChange={this.handleChange.bind(this)}
                                    name="namekind"
                                >
                                    <option value="请选择分类">请选择分类</option>
                                    <option value="首页轮播">首页轮播</option>
                                    <option value="轮播广告">轮播广告</option>
                                    <option value="单个广告">单个广告</option>
                                </select>
                            </div>
                            <div className="input_info">
                                <span>图片数量:</span>
                                <input 
                                    type="text" 
                                    className="left_text"
                                    value={stock}
                                    onChange={this.handleChange.bind(this)}
                                    name="stock"
                                />
                            </div>
                            <div className="input_info">
                                <span>图片名称:</span>
                                <input
                                    type="text"
                                    className="left_text"
                                    value={name}
                                    onChange={this.handleChange.bind(this)}
                                    name="name"
                                />
                            </div>
                            <div className="input_info">
                                <span>链接地址:</span>
                                <input type="text"
                                    value={dz}
                                    onChange={this.handleChange.bind(this)}
                                    name="dz"
                                />
                            </div>
                            <div className="input_info clear">
                                <span className="tp">图片描述:</span>
                                <textarea
                                    value={info}
                                    onChange={this.handleChange.bind(this)}
                                    name="info"
                                ></textarea>
                            </div>
                            <div className="input_info">
                                <span>图片状态:</span>
                                <select type="text"
                                    value={state}
                                    onChange={this.handleChange.bind(this)}
                                    name="state">
                                    <option value="请选择状态">请选择状态</option>
                                    <option value="正常">正常</option>
                                    <option value="隐藏">隐藏</option>
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
                                <span>所属分类:</span>
                                <select
                                    value={namekind}
                                    onChange={this.handleChange.bind(this)}
                                    name="namekind"
                                >
                                    <option value="请选择分类">请选择分类</option>
                                    <option value="首页轮播">首页轮播</option>
                                    <option value="轮播广告">轮播广告</option>
                                    <option value="单个广告">单个广告</option>
                                </select>
                            </div>
                            <div className="input_info">
                                <span>图片数量:</span>
                                <input
                                    type="text"
                                    className="left_text"
                                    value={stock}
                                    onChange={this.handleChange.bind(this)}
                                    name="stock"
                                />
                            </div>
                            <div className="input_info">
                                <span>图片名称:</span>
                                <input
                                    type="text"
                                    className="left_text"
                                    value={name}
                                    onChange={this.handleChange.bind(this)}
                                    name="name"
                                />
                            </div>
                            <div className="input_info">
                                <span>链接地址:</span>
                                <input type="text"
                                    value={dz}
                                    onChange={this.handleChange.bind(this)}
                                    name="dz"
                                />
                            </div>
                            <div className="input_info clear">
                                <span className="tp">图片描述:</span>
                                <textarea
                                    value={info}
                                    onChange={this.handleChange.bind(this)}
                                    name="info"
                                ></textarea>
                            </div>
                            <div className="input_info">
                                <span>图片状态:</span>
                                <select type="text"
                                    value={state}
                                    onChange={this.handleChange.bind(this)}
                                    name="state">
                                    <option value="请选择状态">请选择状态</option>
                                    <option value="正常">正常</option>
                                    <option value="隐藏">隐藏</option>
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

// export default Advertising;
export default connect((state) => {
    return {
        data: state.reducer2.content,
        count: state.reducer2.page
    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(Advertising)) 