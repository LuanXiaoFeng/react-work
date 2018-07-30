import React, { Component } from 'react';
import *as actionCreators from '../actions/orderAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    delBtnClick = () => {
        let { e, idFn } = this.props;
        let delBox = document.getElementById('delBox');
        delBox.style.display = 'block';
        idFn(e.id)
    }
    //单选的onChange
    inputsChange = () => {
        let { data, e } = this.props;
        let { onOff, onOffFn } = this.props;
        e.checked = !e.checked;
        this.setState({ data });
        onOff = data.every(e => e.checked = e.checked)
        onOffFn(onOff)
    }
    infoClick=()=>{
        let { e, dataNow}=this.props;
        console.log(e)
        let childBox = document.getElementById('child_box');
        childBox.style.display = 'block';
        let parentBox = document.getElementById('parent_box');
        parentBox.style.display = 'none';
        dataNow(e)
    }
    render() {
        let { e, i } = this.props;
        return (
            <tr key={i}>
                <td>
                    <input 
                        data-index="0" 
                        name="btSelectItem" 
                        type="checkbox" 
                        checked={e.checked}
                        onChange={this.inputsChange}
                    />
                </td>
                <td>{e.number}</td>
                <td>{e.name}</td>
                <td>{e.price}</td>
                <td>{e.yhprice}</td>
                <td>{e.jyprice}</td>
                <td>{e.namekind}</td>
                <td>{e.stock}</td>
                <td>
                    <span className="text-success">{e.state}</span>
                </td>
                <td>
                    <a className="btn btn-xs btn-success btn-editone"
                        onClick={this.infoClick}
                    ><i className="iconfont icon-liebiao"></i></a>
                    <a className="btn btn-xs btn-danger btn-delone"
                        onClick={this.delBtnClick}
                    ><i className="iconfont icon-shanchu1"></i></a>
                </td>
            </tr>
        );
    }
}

// export default OrderList;
export default connect((state) => {
    return {
        data: state.reducer1.content,
        count: state.reducer1.page
    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(OrderList) 