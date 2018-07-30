import React, { Component } from 'react';
import cookie from "react-cookies";
import '../css/xtsz.css';
class SystemSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key:cookie.load('username'),
            password:''
        };
    }
    // componentWillMount() {
    //     let { url: { history } } = this.props;
    //     if (!sessionStorage.getItem('key')) {
    //         history.push('/')
    //     }
    // }
    handleChange(event) {
        // let name;
        // name = event.target.name;
    }
    sureClick=()=>{
        // let { key, password}=this.state;
        let { url: { history } } = this.props;
        let that=this;
        if(!this.refs.password.value || !this.refs.password2.value || !this.refs.password3.value){
            this.refs.ts.style.display = "block";
            setTimeout(()=>{
                this.refs.ts.style.display='none'
            },2000)
            return
        }
        setTimeout(function () {
            fetch('http://127.0.0.1:88/api/user/findpassword', {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "post",
                body: new URLSearchParams({
                    password: that.refs.password.value,
                }).toString()
            }).then(e => e.json())
                .then(e => {
                    console.log(e);

                    that.setState({ password: e })
                })
        }, 50)
        setTimeout(function () {
            let { password} = that.state;
            if (password[0]) {
                if (that.refs.password2.value === that.refs.password3.value) {
                    password[0].password = that.refs.password3.value
                    let a = password[0]
                    fetch('http://127.0.0.1:88/api/user/update', {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "post",
                        body: new URLSearchParams({
                            ...a
                        }).toString()
                    })
                    .then(e => e.json())
                    .then(e => {
                        console.log(e)
                    })
                    that.refs.tsx.style.display='block'
                    localStorage.setItem("key", JSON.stringify(that.refs.password2.value));
                    that.refs.password.value = that.refs.password2.value = that.refs.password3.value = ''
                    cookie.remove('username')
                    cookie.remove("password");
                    
                   setTimeout(()=>{
                        history.push("/")
                   },2000)
                    // cookie.save("username", "admin");
                    // cookie.save("password", "123");
                    
                    
                }
                else {
                    that.refs.password2.value = that.refs.password3.value = ''
                }
            } else {
                that.refs.password.value = ''
            }
        }, 200)

    }
    clearClick=()=>{
        this.refs.password.value = this.refs.password2.value = this.refs.password3.value = ''
    }
    render() {
        let { key} = this.state;
        // console.log(password)
        return <div className="right_box">
            <p className="br_nav">
              <a>首页></a>
              <a>系统管理</a>
            </p>
            <div className="right_bg">
              <div className="content_box">
                <p className="search">个人配置</p>
              </div>
              <div className="tab_box">
                <div className="tab_nav" />
                <div className="tab_content">
                  <div className="tab_table">
                    <div className="sz_img">
                      <img src={require("../pcImg/avatar.png")} alt="" />
                    </div>
                    <div className="sz_info">
                      <span>
                        <i>* </i>用 户 名 :
                      </span>
                      <input type="text" placeholder="请输入用户名" onChange={this.nameChange} disabled value={key} />
                    </div>
                    <div className="sz_info">
                      <span>
                        <i>* </i>原 密 码 :
                      </span>
                      <input type="password" placeholder="请输入原来的密码" onChange={this.handleChange} name="password" ref="password" />
                      <span className="ts" ref="ts">请输入密码</span>
                      <span className="ts" ref="tsx">更改成功</span>
                    </div>
                    <div className="sz_info">
                      <span>
                        <i>* </i>新 密 码 :
                      </span>
                      <input type="password" placeholder="请输入更改后的密码" onChange={this.handleChange} name="password" ref="password2" />
                    </div>
                    <div className="sz_info">
                      <span>
                        <i>* </i>确认密码:
                      </span>
                      <input type="password" placeholder="请输入更改后的密码" onChange={this.handleChange} name="password" ref="password3" />
                    </div>
                    <div className="sz_info">
                      <a className="bc" onClick={this.sureClick}>
                        确定
                      </a>
                      <a className="qx" onClick={this.clearClick}>
                        取消
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>;
    }
}

export default SystemSetup;