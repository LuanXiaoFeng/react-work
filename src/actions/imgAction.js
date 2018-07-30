const IMGDATA ='IMGDATA'
const IMGPAGE ='IMGPAGE'
const IMGSEARCH ='IMGSEARCH'

//图片获取当页数据
function imgData(data){
    return {
        type: IMGDATA,
        data
    }
}
//获取页码
function imgpage(num){
    return {
        type: IMGPAGE,
        num
    }
}
//图片搜索
function imgsearchFn(data){
    return {
        type: IMGSEARCH,
        data
    }
}

//添加数据接口
export const imgcreate = (records) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/img?act=add' + records)
            .then(e => e.json())
            .then(e => {
                console.log(e)
            })
    }
}
//请求单页数据的接口
export const imgGetData = (num) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/img?act=get&page='+num)
            .then(e => e.json())
            .then(e => {
                console.log(e)
                dispatch(imgData(e))
            })
    }
}
//请求页码的接口
export const imgpagecount = () => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/img?act=get_page_count')
            .then(e => e.json())
            .then(e => {
                dispatch(imgpage(e.count))
            })
    }
}
//请求编辑的数据
export const imgupdate = (e) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/img/update', {
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
export const imgdel = (id) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/img?act=del&id=' + id)
            .then(e => e.json())
            .then(e => {
                console.log(e)
            })
    }
}
//批量删除数据
export const imgdelAll = (ids) => {
    return dispath => {
        fetch('http://127.0.0.1:88/api/img?act=delall&all=' + ids)
            .then(e => e.json())
            .then(e => {
                console.log(e)
            })
    }
}
//搜索的数据接口
export const imgsearch = (name, num, namekind) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/img?act=search&name=' + name + '&num=' + num + '&namekind=' + namekind)
            .then(e => e.json())
            .then(e => {
                console.log(e)
                dispatch(imgsearchFn(e))
            })
    }
}
//搜索数据的页码接口
export const imgfindpagecount = (name, namekind) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/img?act=get_find_count&name=' + name + '&namekind=' + namekind)
            .then(e => e.json())
            .then(e => {
                dispatch(imgpage(e.count))
            })
    }
}
