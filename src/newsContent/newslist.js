import React, { Component } from 'react';
import *as actionCreators from '../actions/newsAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class NewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        let time=e.time;
        let d=new Date(time*1)
        d.setTime(d.getTime(time))
        let newtime=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'  '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
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
                <td className="news_tab">{e.newsinfo}</td>
                <td>{newtime}</td>
                <td><span className="text-success">{e.state}</span></td>
                <td>
                    <a className="btn btn-xs btn-danger btn-delone"
                        onClick={this.delBtnClick}
                    ><i className="iconfont icon-shanchu1"></i></a>
                </td>
            </tr>
        );
    }
}

// export default NewsList;
export default connect((state) => {
    return {
        data: state.reducer4.content,
        count: state.reducer4.page
    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(NewsList))