import React, { Component } from 'react';
import *as actionCreators from '../actions/memberAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class Mlist extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    delClick = () => {
        let delBox = document.getElementById('delBox');
        delBox.style.display = 'block';
    }
    bjclick = (e) => {
        let BjtanBox = document.getElementById('BjtanBox');
        BjtanBox.style.display = 'block';
        let { edit } = this.props;
        console.log(e)
        edit(e)
    }
    delBtnClick = () => {
        let { e, idFn } = this.props;
        let delBox = document.getElementById('delBox');
        delBox.style.display = 'block';
        idFn(e.id)
    }
    inputChange = () => {
        let { data, e } = this.props;
        let { onOff, onOffFn } = this.props;
        e.checked = !e.checked;
        this.setState({ data });
        onOff = data.every(e => e.checked = e.checked)
        onOffFn(onOff)
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
                        onChange={this.inputChange}
                    
                    />
                </td>
                <td>{e.number}</td>
                <td>{e.name}</td>
                <td>{e.sx}</td>
                <td>{e.phonenum}</td>
                <td>{e.email}</td>
                <td>{e.dz}</td>
                <td>{e.namekind}</td>
                <td>
                    <span className="text-success">{e.state}</span>
                </td>
                <td>
                    <a className="btn btn-xs btn-success btn-editone"
                        onClick={this.bjclick.bind(this, e)}
                    ><i className="iconfont icon-bianji"></i></a>
                    <a className="btn btn-xs btn-danger btn-delone"
                        onClick={this.delBtnClick}
                    ><i className="iconfont icon-shanchu1"></i></a>
                </td>
            </tr>
        );
    }
}

// export default Mlist;
export default connect((state) => {
    return {
        data: state.reducer3.content,
        count: state.reducer3.page
    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(Mlist))