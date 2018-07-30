const NEWSDATA ='NEWSDATA';
const NEWSPAGENUM ='NEWSPAGENUM';
const MEWSEARCHDATA ='MEWSEARCHDATA';
function getnewsdata(data){
    return {
        type: NEWSDATA,
        data
    }
}
function newspage(num){
    return {
        type: NEWSPAGENUM,
        num
    }
}
function newsearchFn(data){
    return {
        type: MEWSEARCHDATA,
        data
    }
}


//请求单页数据的接口
export const newsodd = (num) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/news?act=get&page=' + num)
            .then(e => e.json())
            .then(e => {
                // console.log(e)
                dispatch(getnewsdata(e))
            })
    }
}
//请求页码的接口
export const newspagecount = () => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/news?act=get_page_count')
            .then(e => e.json())
            .then(e => {
                dispatch(newspage(e.count))
            })
    }
}
//删除单条数据
export const newsdel = (id) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/news?act=del&id=' + id)
            .then(e => e.json())
            .then(e => {
                console.log(e)
            })
    }
} 
//批量删除数据
export const newsdelAll = (ids) => {
    return dispath => {
        fetch('http://127.0.0.1:88/api/news?act=delall&all=' + ids)
            .then(e => e.json())
            .then(e => {
                console.log(e)
            })
    }
}
//搜索的数据接口
export const newsearch = (name, num, namekind) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/news?act=search&name=' + name + '&num=' + num + '&namekind=' + namekind)
            .then(e => e.json())
            .then(e => {
                console.log(e)
                dispatch(newsearchFn(e))
            })
    }
}
//搜索数据的页码接口
export const newsfindpagecount = (name, namekind) => {
    return dispatch => {
        fetch('http://127.0.0.1:88/api/news?act=get_find_count&name=' + name + '&namekind=' + namekind)
            .then(e => e.json())
            .then(e => {
                dispatch(newspage(e.count))
            })
    }
}