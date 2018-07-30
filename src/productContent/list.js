import React, { Component } from 'react';
import *as actionCreators from '../actions/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    click = () => {
        let tanBox = document.getElementById('tanBox');
        tanBox.style.display = 'block';
    }
    bjclick=(e)=>{
        let {edit}=this.props;
        edit(e)
    }
    delBtnClick = () => {
        let {e, idFn}=this.props;
        let delBox = document.getElementById('delBox');
        delBox.style.display = 'block'; 
        idFn(e.id)  
    }
    //单选的onChange
    inputChange=()=>{
        let {data,e}=this.props;
        let { onOff,onOffFn}=this.props;
        e.checked=!e.checked;
        this.setState({data});
        onOff=data.every(e=>e.checked=e.checked)
        onOffFn(onOff)
    }
    render() {
        let {e,i}=this.props;
        //console.log(data,e)
        return (
            <tr key={i}>
                <td>
                    <input 
                        data-index="0" 
                        name="btSelectItem" 
                        type="checkbox" 
                        checked={e.checked}
                        onChange={this.inputChange}
                    />
                </td>
                <td>{e.number}</td>
                <td>{e.name}</td>
                <td>{e.namekind}</td>
                <td>
                    <img src={require("../pcImg/avatar.png")} alt="" />
                </td>
                <td>{e.price}</td>
                <td>{e.stock}</td>
                <td>{e.state}</td>
                <td>
                    <a className="btn btn-xs btn-success btn-editone"
                        onClick={this.bjclick.bind(this,e)}
                    ><i className="iconfont icon-bianji"></i></a>
                    <a className="btn btn-xs btn-danger btn-delone"
                        onClick={this.delBtnClick}
                    ><i className="iconfont icon-shanchu1"></i></a>
                </td>
            </tr> 
        );
    }
}

export default connect((state) => {
    return { 
        data: state.reducer.content,
        count: state.reducer.page
    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(List) 