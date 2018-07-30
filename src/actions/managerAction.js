const MANAGERdATA ='MANAGERdATA';
const MANAGERPAGEDATA ='MANAGERPAGEDATA';
const MANAGERSEARCH ='MANAGERSEARCH';
function managergetdata(data){
    return {
        type: MANAGERdATA,
        data
    }
}
function managerpage(num){
    return {
        type: MANAGERPAGEDATA,
        num
    }
}
function managersearchFn(data){
    return {
        type: MANAGERSEARCH,
        data
    }
}
//添加数据接口
export const managercreate = (records) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/manager?act=add' + records)
            .then(e => e.json())
            .then(e => {
                //console.log(e)
            })
    }
}
//请求单页数据的接口
export const managerodd = (num) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/manager?act=get&page=' + num)
            .then(e => e.json())
            .then(e => {
                // console.log(e)
                dispatch(managergetdata(e))
            })
    }
}
//请求页码的接口
export const managerpagecount = () => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/manager?act=get_page_count')
            .then(e => e.json())
            .then(e => {
                dispatch(managerpage(e.count))
            })
    }
}
//删除单条数据
export const managerdel = (id) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/manager?act=del&id=' + id)
            .then(e => e.json())
            .then(e => {
                console.log(e)
            })
    }
}
//批量删除数据
export const managerdelAll = (ids) => {
    return dispath => {
        fetch('http://127.0.0.1:88/api/manager?act=delall&all=' + ids)
            .then(e => e.json())
            .then(e => {
                console.log(e)
            })
    }
}
//请求编辑的数据
export const managerupdate = (e) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/manager/update', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            body: new URLSearchParams(e).toString()
        })
        .then(e => e.json())
        .then(res => {
        })
    }
}
//搜索的数据接口
export const managersearch = (name, num, namekind) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/manager?act=search&name=' + name + '&num=' + num + '&namekind=' + namekind)
            .then(e => e.json())
            .then(e => {
                console.log(e)
                dispatch(managersearchFn(e))
            })
    }
}
//搜索数据的页码接口
export const managerfindpagecount = (name, namekind) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/manager?act=get_find_count&name=' + name + '&namekind=' + namekind)
            .then(e => e.json())
            .then(e => {
                dispatch(managerpage(e.count))
            })
    }
}