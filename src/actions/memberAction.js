const MEMBERDATA ='MEMBERDATA';
const MEMBERPAGE ='MEMBERPAGE';
const MEMBERSEARCH ='MEMBERSEARCH';
function memberData(data){
    return {
        type: MEMBERDATA,
        data
    }
}
function memberpage(num){
    return {
        type: MEMBERPAGE,
        num
    }
}
function memsearchFn(data){
    return {
        type: MEMBERSEARCH,
        data
    }
}

//添加数据接口
export const memberCreate = (records) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/member?act=add' + records)
            .then(e => e.json())
            .then(e => {
                //console.log(e)
            })
    }
}
//请求单页数据的接口
export const member = (num) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/member?act=get&page=' + num)
            .then(e => e.json())
            .then(e => {
                // console.log(e)
                dispatch(memberData(e))
            })
    }
}
//请求页码的接口
export const memberpagecount = () => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/member?act=get_page_count')
            .then(e => e.json())
            .then(e => {
                dispatch(memberpage(e.count))
            })
    }
}
//请求编辑的数据
export const memberupdate = (e) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/member/update', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            body: new URLSearchParams(e).toString()
        })
            .then(e => e.json())
            .then(res => {
                console.log(res)
            })
    }
}
//删除单条数据
export const memberdel = (id) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/member?act=del&id=' + id)
            .then(e => e.json())
            .then(e => {
                console.log(e)
            })
    }
} 
//批量删除数据
export const memberdelAll = (ids) => {
    return dispath => {
        fetch('http://127.0.0.1:88/api/member?act=delall&all=' + ids)
            .then(e => e.json())
            .then(e => {
                console.log(e)
            })
    }
}
//搜索的数据接口
export const membersearch = (name, num, namekind) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/member?act=search&name=' + name + '&num=' + num + '&namekind=' + namekind)
            .then(e => e.json())
            .then(e => {
                console.log(e)
                dispatch(memsearchFn(e))
            })
    }
}
//搜索数据的页码接口
export const memfindpagecount = (name, namekind) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/member?act=get_find_count&name=' + name + '&namekind=' + namekind)
            .then(e => e.json())
            .then(e => {
                dispatch(memberpage(e.count))
            })
    }
}