import React, { Component } from 'react';
class NewsTan extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    click=()=>{
        let tanBox=document.getElementById('tanBox');
        tanBox.style.display='none';
    }
    render() {
        return (
            <div className="tan_content" id="tanBox">
                <div className="bg"></div>
                <div className="tan_box">
                    <div className="tan_title clear">
                        <span>编辑</span>
                        <a
                        onClick={this.click}
                        ><i>×</i></a>
                    </div> 
                    <div className="input_content">
                        <div className="input_info">
                            <span>留言用户:</span>
                            <input type="text"/>
                        </div>
                        <div className="input_info clear">
                            <span className="tp">留言内容:</span>
                            <textarea></textarea>
                        </div>
                        <div className="input_info">
                            <span>是否回复:</span>
                            <input type="checkbox" className="radio_btn"/>
                            <span>回复</span>
                        </div>
                        <div className="btn_sure">
                            <a className="sure"
                            onClick={this.click}
                            >提交</a>
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

export default NewsTan;