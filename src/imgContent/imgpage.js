import React, { Component } from 'react';
import *as actionCreators from '../actions/imgAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class ImgPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: this.props.nowpage
        };
    }
    //页码的数字点击
    pageClick = (i) => {
        let { namekey, kindkey, onOffFn, onOff } = this.props;
        let { imgGetData, numFn, imgsearch } = this.props;
        this.setState({ num: i })
        onOff = false;
        onOffFn(onOff)
        if (!kindkey) {
            imgGetData(i)
        } else {
            imgsearch(namekey, i, kindkey)
        }

        numFn(i)
    }
    //页码的上一页
    leftClick = (num) => {
        let { namekey, kindkey, onOff, onOffFn } = this.props;
        let { imgGetData, numFn, imgsearch } = this.props;
        onOff = false;
        onOffFn(onOff)
        if (num > 1) {
            num--
            if (!kindkey) {
                imgGetData(num)
            } else {
                imgsearch(namekey, num, kindkey)
            }
            numFn(num)
            this.setState({ num })
        }
    }
    //页码的下一页
    rightClick = (num) => {
        let { namekey, kindkey, onOffFn, onOff } = this.props;
        let { imgGetData, numFn, imgsearch, count } = this.props;
        onOff = false;
        onOffFn(onOff)
        if (num < count) {
            num++
            if (!kindkey) {
                imgGetData(num)
            } else {
                imgsearch(namekey, num, kindkey)
            }
            numFn(num)
            this.setState({ num })
        }
    }
    render() {
        let { count, nowpage } = this.props;
        let { num } = this.state;
        num = nowpage
        let pagearr = []
        // console.log(num)
        for (let i = 1; i <= count; i++) {
            pagearr.push(
                <a
                    className={(i === num) ? 'cur' : ''}
                    key={i}
                    onClick={this.pageClick.bind(this, i)}
                >{i}</a>
            )
        }
        return (
            <div className="page_box">
                <a onClick={this.leftClick.bind(this, num)}>&lt;</a>
                {pagearr}
                <a onClick={this.rightClick.bind(this, num)}>&gt;</a> 
            </div>
        );
    }
}

// export default ImgPage;
export default connect((state) => {
    return {
        data: state.reducer2.content,
        count: state.reducer2.page
    };
}, (dispatch) => bindActionCreators(actionCreators, dispatch))(withRouter(ImgPage)) 