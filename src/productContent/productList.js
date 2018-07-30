import React,{ Component } from 'react';
import *as actionCreators from '../actions/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import List from './list';
import ListPage from './listPage'
import '../css/contentFirst.css';
import '../css/tan.css'
class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:'',
            price: '',
            checked: '',
            state: '',
            namekind:'',
            stock:'',
            nowpage: 1,
            pagecontent: 10,
            onOff:false,
            id:'',
            searchName:'',
            namekey:'',
            kindkey:''
        };
    }
    componentDidMount() {
        let { odd, pagecount} = this.props 
        odd(1);
        pagecount();

    }
    click = () => {
        let tanBox = document.getElementById('tanBox');
        tanBox.style.display = 'block';
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
    change=()=>{}
    surclick = () => {
        let tanBox = document.getElementById('tanBox');
        let { name, number, price, state, namekind, stock, nowpage, checked}=this.state;
        let records = `&number=${number}&name=${name}&namekind=${namekind}&stock=${stock}&state=${state}&price=${price}&checked=${checked}`;
        let { create, odd, pagecount}=this.props;
        if (name && namekind && stock && state && price){
            create(records);
            odd(nowpage);
            pagecount();
            setTimeout(() => {
                tanBox.style.display = 'none';
                this.setState({
                    name:'',
                    number:'',
                    price:'',
                    state:'',
                    namekind:'',
                    stock:'',
                    id:''
                })
            },50);
        }else{
            alert('请输入添加的内容')
        }               
    }
    delclick = () => {
        let delBox = document.getElementById('delBox');
        delBox.style.display = 'none'
    }
    // componentWillMount() {
    //     let { url: { history } } = this.props;
    //     if (!sessionStorage.getItem('key')) {
    //         history.push('/')
    //     }
    // }
    //添加弹窗的value
    handleChange=(ev)=>{
        let name, obj;
        name = ev.target.name;
        this.setState((
            obj = {},
            obj["" + name] = ev.target.value,
            obj
        ))
    }
    //全部选中的开关
    onOffFn=(onOff)=>{
        this.setState({onOff})
    }
    //全选按钮
    changeAll=()=>{
        let { onOff}=this.state;
        let {data}=this.props;
        onOff=!onOff;
        for (let i = 0; i < data.length; i++) {
            if(data[i]){
                data[i].checked=onOff
            }
        }
        this.setState({ onOff })
    }
    //获取当条数据的id
    idFn=(id)=>{
        this.setState({id})
    }
    //确定删除
    sureclick=()=>{
        let {del, odd, pagecount,data,count}=this.props;
        let { id, nowpage}=this.state;
        console.log(nowpage)
        del(id);
        odd(nowpage);
        pagecount();
        if(data.length===1){
            this.setState({onOff:false})
            odd(nowpage-1);
            this.setState({ nowpage: count-1})
            // console.log(nowpage, count)
        }
        setTimeout(function(){
            let delBox = document.getElementById('delBox');
            delBox.style.display = 'none'
        },50)
    }
    //批量删除
    delAllClick=()=>{
        let {data}=this.props;
        let { odd, delAll, pagecount}=this.props;
        let {nowpage}=this.state;
        let delarr=data.filter(e=>{
            return e.checked
        })
        let delNewArr=[];
        delarr.forEach(e => {
            delNewArr.push(e.id)
        });
        let ids = JSON.stringify(delNewArr)
        delAll(ids)
        // odd(nowpage)
        odd(nowpage);
        
        if (delNewArr.length===data.length) {
            // pagecount()
            console.log(1)
            --nowpage
            this.setState({ onOff: false,nowpage })
            odd(nowpage);
        } 
        pagecount()
        console.log(nowpage)
        this.setState({ nowpage, })
    }
    //关闭添加商品弹窗
    tanclick=()=>{
        let tanBox = document.getElementById('tanBox');
        tanBox.style.display = 'none'
    }
    //接收页码的num
    numFn=(num)=>{
        this.setState({nowpage:num})
    }
    //编辑弹窗
    edit=(e)=>{
        let tanBoxnew = document.getElementById('tanBoxnew');
        tanBoxnew.style.display = 'block';
        this.setState({
            name:e.name,
            price:e.price,
            state:e.state,
            namekind:e.namekind,
            stock:e.stock,
            id:e.id,
        })
    }
    //编辑确定更改
    tanclicknew = () => {
        let tanBoxnew = document.getElementById('tanBoxnew');
        let { name, price, state, namekind, stock, id, nowpage}=this.state;
        let { update, odd}=this.props;
        let records={
            name,
            price,
            state,
            namekind,
            stock,
            id
        }
        console.log(nowpage)
        update(records);
        odd(nowpage)
        setTimeout(()=>{
            tanBoxnew.style.display = 'none'
        },50)
    }
    bjclick=()=>{
        let tanBoxnew = document.getElementById('tanBoxnew');
        tanBoxnew.style.display = 'none'
    }
    //搜索查询
    searchClick=()=>{
        let { searchName, nowpage}=this.state;
        let { search, findpagecount}=this.props;
        let ssinfo=this.refs.ss.value;
        console.log(ssinfo)
        console.log(searchName)
        if (searchName){
            this.setState({
                nowpage:1,
                namekey: searchName,
                kindkey: ssinfo
            })
            search(searchName,nowpage,ssinfo);
            findpagecount(searchName, ssinfo)
            this.refs.searchName.value='';
        }else{
            alert('请输入查询内容')
        }       
    }
    //刷新按钮
    reloadClick=()=>{
        let {nowpage}=this.state;
        let {odd,pagecount}=this.props;
        odd(nowpage)
        pagecount()
        this.setState({
            nowpage:1,
            kindkey:'',
            namekey:''
        })
    }
    render() {
        let {data,count}=this.props;
        let { name, price, state, namekind, stock, onOff, nowpage, namekey,kindkey}=this.state;
        let newarr =data.length?data.map((e,i)=>{
            return <List
                {...{
                    key:i,
                    e,
                    i,
                    onOff,
                    onOffFn:this.onOffFn,
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
                        <a>产品管理></a>
                        <a>产品列表</a>
                    </p>
                    <div className="right_bg">
                        <div className="content_box">
                            <p className="search">搜索查询</p>
                            <div className="table_search">
                                <span>产品分类</span>
                                <select ref="ss">
                                    <option value="namekind">产品分类</option>
                                    <option value="name">产品名称</option>
                                    <option value="stock">库存</option>
                                    <option value="price">价格</option>
                                    <option value="state">状态</option>
                                </select>
                                <span>产品名称</span>
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
                            {/* <div className="tab_nav">
                                <a className="cur">全部</a>
                                <a>果蔬</a>
                                <a>数码</a>
                                <a>服饰</a>
                            </div> */}
                            <div className="tab_content">
                                <div className="tab_table">
                                    <div className="btn_box clear">
                                        <a className="btn_add"
                                        onClick={this.click}
                                        ><i className="iconfont icon-tianjia"></i>添加</a>
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
                                                        checked={onOff?'checked':''}
                                                        onChange={this.changeAll}
                                                        />
                                                    </div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">产品编号</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">产品名称</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">产品分类</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">产品图片</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">价格</div>
                                                    <div className="fht-cell"></div>
                                                </th>
                                                <th>
                                                    <div className="th-inner ">库存</div>
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
                                    <ListPage count={count} numFn={this.numFn} nowpage={nowpage} namekey={namekey} kindkey={kindkey} onOffFn={this.onOffFn} onOff={onOff} />
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
                                onClick={this.tanclick}
                            ><i>×</i></a>
                        </div>
                        <div className="input_content">
                            <div className="input_info">
                                <span>产品分类:</span>
                                <select type="text" 
                                    value={namekind}
                                    onChange={this.handleChange.bind(this)}
                                    name="namekind">
                                    <option value="请选择分类">请选择分类</option>
                                    <option value="全部分类">全部分类</option>
                                    <option value="果蔬">果蔬</option>
                                    <option value="数码">数码</option>
                                    <option value="服饰">服饰</option>
                                </select>
                            </div>
                            <div className="input_info">
                                <span>产品名称:</span>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={this.handleChange.bind(this)}
                                    name="name"
                                />
                            </div>
                            <div className="input_info">
                                <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格:</span>
                                <input
                                    type="text"
                                    value={price}
                                    onChange={this.handleChange.bind(this)}
                                    name="price"
                                />
                            </div>
                            <div className="input_info">
                                <span>商品库存:</span>
                                <input 
                                    type="text"
                                    value={stock}
                                    onChange={this.handleChange.bind(this)}
                                    name="stock"
                                 />
                            </div>
                            <div className="input_info">
                                <span>商品状态:</span>
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
                                <a
                                    onClick={this.surclick}
                                    className="sure">确定</a>
                                <a className="replay"
                                   onClick={this.tanclick} 
                                >取消</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 编辑的弹窗 */}
                <div className="tan_content" id="tanBoxnew">
                    <div className="bg"></div>
                    <div className="tan_box">
                        <div className="tan_title clear">
                            <span>编辑</span>
                            <a
                                onClick={this.bjclick}
                            ><i>×</i></a>
                        </div>
                        <div className="input_content">
                            <div className="input_info">
                                <span>产品分类:</span>
                                <select type="text"
                                    value={namekind}
                                    onChange={this.handleChange.bind(this)}
                                    name="namekind">
                                    <option value="请选择分类">请选择分类</option>
                                    <option value="全部分类">全部分类</option>
                                    <option value="果蔬">果蔬</option>
                                    <option value="数码">数码</option>
                                    <option value="服饰">服饰</option>
                                </select>
                            </div>
                            <div className="input_info">
                                <span>产品名称:</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={this.handleChange.bind(this)}
                                    name="name"
                                />
                            </div>
                            <div className="input_info">
                                <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格:</span>
                                <input
                                    type="text"
                                    value={price}
                                    onChange={this.handleChange.bind(this)}
                                    name="price"
                                />
                            </div>
                            <div className="input_info">
                                <span>商品库存:</span>
                                <input
                                    type="text"
                                    value={stock}
                                    onChange={this.handleChange.bind(this)}
                                    name="stock"
                                />
                            </div>
                            <div className="input_info">
                                <span>商品状态:</span>
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
                                <a
                                    onClick={this.tanclicknew}
                                    className="sure">确定</a>
                                <a 
                                    className="replay"
                                    onClick={this.bjclick}
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
                                onClick={this.delclick}
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
                                    onClick={this.delclick}
                                >取消</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}

// export default ProductList;
export default connect((state) => {
    return {
        data: state.reducer.content,
        count:state.reducer.page
    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(ProductList)) 