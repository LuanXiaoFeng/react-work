import React, { Component } from 'react';
import cookie from "react-cookies";
import '../css/login.css'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            uVal:'',
            pVal:''
         };
    }
    //用户名  密码
    userChange=(ev)=>{
        let {uVal}=this.state;
        uVal=ev.target.value;
        this.setState({uVal})
    }
    passChange=(ev)=>{
        let {pVal}=this.state;
        pVal=ev.target.value;
        this.setState({pVal})
    }
    click=()=>{
        let {uVal,pVal}=this.state;
        let {url:{history}}=this.props;
        console.log(uVal)
        if(uVal&&pVal){
            fetch("http://127.0.0.1:88/api/user/login", {
              method: "post",
              body: `username=${uVal}&password=${pVal}`,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
              .then(e => e.json())
              .then(data => {
                console.log(data);
                if (data.code === 0) {
                  setTimeout(() => {
                    history.push("/index");
                  }, 1000);
                  cookie.save("username", "admin");
                  cookie.save("password", pVal);
                } else if (data.code === -3) {
                  this.setState({ uVal: "", pVal: "" });
                }
              }); 
        }
    }
    // componentWillMount() {
    //     setTimeout(function(){
    //         fetch('http://127.0.0.1:88/api/user/findpassword', {
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded"
    //             },
    //             method: "post",
    //             body: new URLSearchParams().toString()
    //         }).then(e => e.json())
    //             .then(e => {
    //                 console.log(e);

    //             })
    //     }, 50)
    // }
    render() {
        let { uVal, pVal } = this.state;
        let k=localStorage.getItem('key');
        let ks=JSON.parse(k);
        return <div className="login_box">
            <div className="center_box">
              <div className="img_box">
                <img src={require("../pcImg/avatar.png")} alt="" />
              </div>
              <p className="text_box">用户名:admin 密码:{ks}</p>
              <div className="input_box clear">
                <span className="iconfont icon-yonghu-tianchong" />
                <input type="text" placeholder="用户名" value={uVal} onChange={this.userChange} />
              </div>
              <div className="input_box clear">
                <span className="iconfont icon-mima" />
                <input type="password" placeholder="密码" value={pVal} onChange={this.passChange} />
              </div>
              <a className="login_btn" onClick={this.click}>
                登录
              </a>
            </div>
          </div>
    }
}

export default Login;