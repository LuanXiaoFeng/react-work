import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import cookie from "react-cookies";
class IndexLeft extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            arr: [
                {
                    k: '产品管理',
                    onOff: false,
                    icon: 'iconfont icon-chanpinguanli',
                    child: [
                        {
                            title: "产品列表",
                            rs:'/index/product',
                        }
                    ]
                },
                {
                    k: '图片管理',
                    onOff: false,
                    icon: 'iconfont icon-guanliyuan_guanliyuanliebiao',
                    child: [
                        {
                            title: "分类管理",
                            rs:'/index/advertising'
                        }
                       
                    ]
                },
                {
                    k: '交易管理',
                    onOff: false,
                    icon: 'iconfont icon-jiaoyiguanliicon',
                    child: [
                        {
                            title: "订单信息",
                            rs:'/index/orderimg'
                        },
                        {
                            title: "订单管理",
                            rs:'/index/ordertab'
                        }
                    ]
                },
                {
                    k: '会员管理',
                    onOff: false,
                    icon: 'iconfont icon-huiyuanguanlipx',
                    child: [
                        {
                            title: "会员列表",
                            rs:'/index/memberlist'

                        }
                    ]
                },
                {
                    k: '消息管理',
                    onOff: false,
                    icon: 'iconfont icon-xiaoxiguanli',
                    child: [
                        {
                            title: "留言列表",
                            rs:'/index/news'
                        }
                       
                    ]
                },
                 {
                     k: '系统管理',
                    onOff: false,
                     icon: 'iconfont icon-xitongguanli',
                    child: [
                        {
                            title: "系统设置",
                            rs:'/index/systemsetup'
                        }
                    ]
                },
                {
                    k: '管理员管理',
                    onOff: false,
                    icon: 'iconfont icon-dianpuguanlipx',
                    child: [
                        {
                            title: "管理员列表",
                            rs:'/index/managerlist'
                        }
                    ]
                }
            ],

        };
    }
    click = (e) => {
        let { arr } = this.state  
        arr.forEach((ev,i)=> {
            if(i!==e){
                 ev.onOff = false
                 this.refs.sy.className='' 
            }   
        })  
        arr[e].onOff= !arr[e].onOff 
        this.setState({arr})
    }
    cur=()=>{
        this.refs.sy.className='cur' 
        let { arr } = this.state 
        arr.forEach(e=>{
            e.onOff=false
        })
        this.setState({arr})
    }
    navOver=()=>{
        let close=document.getElementById('close');
        close.style.display='block';        
        //console.log(this)
        this.refs.btn.classList.add('nav_avtive');
    }
    navOut=()=>{
        let close=document.getElementById('close');
        close.style.display='none';        
        //console.log(this)
        this.refs.btn.classList.remove('nav_avtive');
    }
    closeClick=()=>{
        let close = document.getElementById('close');
        close.style.display = 'none';
        cookie.remove("username");
        cookie.remove("password");
    }
    change=()=>{}
    // componentWillMount() {
    //     let { url: { history } } = this.props;
    //     if (!sessionStorage.getItem('key')) {
    //         history.push('/')
    //     }
    // }
    render() {
        let {arr} = this.state
        let a = null
        let cur=null
        let num = 0;
        let new2 = []
        let arr4 = []
        arr.forEach((e, i) => {
            if (e.child) {
                arr4 = []
                arr4 = e.child.map(e => {
                    num++;
                    return ( 
                            <li className="list_box clear" key={+new Date() + num} >
                                <Link className="left_text" to={e.rs} >
                                    <i className="ico iconfont icon-jiantouyou"></i>
                                    <span>{e.title}</span>
                                </Link>
                            </li>           
                    )
                })
                new2.push(arr4)
            }

        })
        let newArr3 = [];
        // let {url:{location:{pathname}}}=this.props;
        // console.log(pathname)
        // let reg=/\/index\/(\w+)/;
        // let sty='';
        // if (reg.test(pathname)){
        //     sty = pathname.replace(reg,($0,$1)=>{
        //         return $1;
        //     })
        // }
        
        let newArr = arr.map((e, i) => {
            // console.log(e.child[i].rs)
            a = e.onOff ? 'show' : ''
            cur = e.onOff ? 'clear cur' : 'clear'
            newArr3 = new2[i]
            
            return (
                <li className="list_box" key={i}>
                    <div className={cur} onClick={this.click.bind(this, i)} ref='lb'>
                        <i className={e.icon}></i>
                        <a className="left_text">{e.k}</a>
                        <a className="list_a"><i className="iconfont icon-xiangxiajiantou"></i></a>
                    </div>
                    <ul className={a}>
                        {newArr3}  
                    </ul>
                </li>
              
            )

        })
        return (
            <div>
                <div className="head">
                    <a className="head_nav">后台管理系统</a>
                    <div className="right_nav clear" onMouseOver={this.navOver} onMouseOut={this.navOut} ref='btn'>
                        <a className="nav_ico"><img src={require("../pcImg/avatar.png")} alt=""/></a>
                        <a className="nav_txt">admin</a>
                        <a className="nav_close iconfont icon-unie657"> </a>
                        <div className="dw_box" id="close">
                            <div className="dw_img">
                                <a className="nav_ico">
                                    <img src={require("../pcImg/avatar.png")} alt=""/>
                                </a>
                                <p>Admin</p>
                                <p>尊敬的用户,欢迎您的使用 !</p>
                            </div>
                            <div className="close_box">
                                <Link to='/' onClick={this.closeClick}>注销</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content clear">
                    <div className="left_box">
                        <div className="left_head clear">
                            <a className="head_ico"><img src={require("../pcImg/avatar.png")} alt=""/></a>
                            <p>
                                <a className="head_name">Admin</a>
                                <a className="head_state"><i></i><span>在线</span></a>
                            </p>
                        </div>
                        <form id="search">
                            <div className="search_box clear">
                                <input type="text" value="搜索菜单" onChange={this.change}/>
                                <span></span>
                            </div>
                        </form>
                        <ul className="left_list">
                            <li className="list_box">
                                <div className="cur clear" ref='sy' onClick={this.cur}>
                                    <i className="iconfont icon-tubiaozhizuomoban"></i>
                                    <Link to='/index' className="left_text">首页</Link>
                                </div>

                            </li>
                            {newArr}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default IndexLeft;