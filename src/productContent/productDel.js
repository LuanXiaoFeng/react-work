import React, { Component } from 'react';
import '../css/tan.css';
class Dele extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    click=()=>{
        let delBox=document.getElementById('delBox');
        delBox.style.display='none'
    }
    render() {
        return (
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
                            onClick={this.click}
                            >确定</a>
                            <a className="replay"
                            onClick={this.click}
                            >取消</a>
                        </div>
                    </div>   
                </div>
            </div>
        );
    }
}

export default Dele;