const GETDATA = 'GETDATA';
const PAGE='PAGE';
const SEARCH ='SEARCH';
// const GETPASSWORD ='GETPASSWORD';
// function password(data){
//     return {
//         type: GETPASSWORD,
//         data
//     }
// }
//添加数据和获取数据的方法
function getdata(data){
   return {
       type: GETDATA,
       data
   }
}
//获取页码的方法
function page(num){
    return {
        type:PAGE,
        num
    }
}
//搜索查询的方法
function searchFn(data){
    return {
        type:SEARCH,
        data
    }
}
//请求密码的数据
// export const getPassword = (pw) => {
//     return dispatch => {
//         fetch('http://127.0.0.1:88/api/user/findpassword', {
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded"
//             },
//             method: "post",
//             body: new URLSearchParams({password:pw}).toString()
//         })
//         .then(e => e.json())
//         .then(res => {
//             console.log(res)
//             dispatch(password(res))
//         })
//     }
// }
//添加数据接口
export const create = (records)=>{
    return dispatch=>{
        fetch('http://127.0.0.1:88/api/weibo?act=add' + records)
        .then(e=>e.json())
        .then(e=>{
            //console.log(e)
        })
    }
}

//请求单页数据的接口
export const odd=(num)=>{
    return dispatch=>{
        fetch('http://127.0.0.1:88/api/weibo?act=get&page='+num)
        .then(e=>e.json())
        .then(e=>{
            console.log(e)
            dispatch(getdata(e))
        })
    }
}
//请求页码的接口
export const pagecount=()=>{
    return dispatch=>{
        fetch('http://127.0.0.1:88/api/weibo?act=get_page_count')
        .then(e=>e.json())
        .then(e=>{
            dispatch(page(e.count))
        })
    }
}
//删除单条数据
export const del=(id)=>{
    return dispatch=>{
        fetch('http://127.0.0.1:88/api/weibo?act=del&id='+id)
        .then(e=>e.json())
        .then(e=>{
            console.log(e)
        })
    }
} 
//批量删除数据
export const delAll=(ids)=>{
    return dispath=>{
        fetch('http://127.0.0.1:88/api/weibo?act=delall&all='+ids)
        .then(e=>e.json())
        .then(e=>{
            console.log(e)
        })
    }
}
//请求编辑的数据
export const update=(e)=>{
    return dispatch=>{
        fetch('http://127.0.0.1:88/api/weibo/update',{
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            method:"post",
            body:new URLSearchParams(e).toString()
        })
        .then(e=>e.json())
        .then(res=>{
            console.log(res)
        })
    }
}
//搜索的数据接口
export const search = (name, num, namekind)=>{
    return dispatch=>{
        fetch('http://127.0.0.1:88/api/weibo?act=search&name=' + name+'&num='+num + '&namekind=' + namekind)
        .then(e => e.json())
        .then(e => {
            console.log(e)
            dispatch(searchFn(e))
        })
    }
}
//搜索数据的页码接口
export const findpagecount = (name, namekind)=>{
    return dispatch=>{
        fetch('http://127.0.0.1:88/api/weibo?act=get_find_count&name=' + name + '&namekind=' + namekind)
        .then(e=>e.json())
        .then(e=>{
            dispatch(page(e.count))
        })
    }
}
