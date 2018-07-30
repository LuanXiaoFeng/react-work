const ORDERDATA ='ORDERDATA';
const ORDERPAGE ='ORDERPAGE';
const ORDERSEARCH ='ORDERSEARCH';
function orderData(data){
    return {
        type: ORDERDATA,
        data:data
    }
}
function orderpage(num){
    return {
        type: ORDERPAGE,
        num
    }
}
function ordersearchFn(data){
   return {
       type: ORDERSEARCH,
        data
   } 
}

//请求单页数据的接口
export const order = (num) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/order?act=get&page='+num)
            .then(e => e.json())
            .then(e => {
                // console.log(e)
                dispatch(orderData(e))
            })
    }
}
//请求页码的接口
export const orderpagecount = () => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/order?act=get_page_count')
            .then(e => e.json())
            .then(e => {
                dispatch(orderpage(e.count))
            })
    }
}
//删除单条数据
export const orderdel = (id) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/order?act=del&id=' + id)
            .then(e => e.json())
            .then(e => {
                console.log(e)
            })
    }
}
//批量删除数据
export const orderdelAll = (ids) => {
    return dispath => {
        fetch('http://127.0.0.1:88/api/order?act=delall&all=' + ids)
            .then(e => e.json())
            .then(e => {
                console.log(e)
            })
    }
}
//搜索的数据接口
export const ordersearch = (name, num, namekind) => {
    return dispatch => {
         fetch('http://127.0.0.1:88/api/order?act=search&name=' + name + '&num=' + num + '&namekind=' + namekind)
            .then(e => e.json())
            .then(e => {
                dispatch(ordersearchFn(e))
            })
    }
}
//搜索数据的页码接口
export const orderfindpagecount = (name, namekind) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/order?act=get_find_count&name=' + name + '&namekind=' + namekind)
            .then(e => e.json())
            .then(e => {
                dispatch(orderpage(e.count))
            })
    }
}