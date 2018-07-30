import { combineReducers } from 'redux';

const reducer= (state ={content:[],page:0}, action) => {
    switch (action.type) {
        //获取当页数据
        case 'GETDATA':
            let newobj=Object.assign({},state);
            newobj.content=action.data;
            //console.log(newobj)
            return newobj
        //页码
        case 'PAGE':
            let pageobj = Object.assign({}, state);
            pageobj.page=action.num;
            return pageobj
        //搜索
        case 'SEARCH':
            let searchobj = Object.assign({}, state);
            searchobj.content=[...action.data]
            return searchobj
        // case 'GETPASSWORD':
        //     let passwordobj = Object.assign({}, state);
        //     passwordobj.content = [...action.data]
        //     return passwordobj
        default:
            return state
    }
}
//订单页面
const reducer1 = (state = { content: [], page: 0 }, action) => {
    switch (action.type) {
        //获取当页数据
        case 'ORDERDATA':
            let newobj2 = Object.assign({}, state);
            newobj2.content = action.data;
            // console.log(newobj2)
            return newobj2
        //页码
        case 'ORDERPAGE':
            let pageobj2 = Object.assign({}, state);
            pageobj2.page = action.num;
            return pageobj2
        //搜索
        case 'ORDERSEARCH':
            console.log(1)
            let searchobj2 = Object.assign({}, state);
            searchobj2.content = action.data
            
            return searchobj2
        default:
            return state
    }
}
//图片页面
const reducer2 = (state = { content: [], page: 0 }, action) => {
    switch (action.type) {
        //获取当页数据
        case 'IMGDATA':
            let newobj3 = Object.assign({}, state);
            newobj3.content = action.data;
            console.log(newobj3)
            return newobj3
        //页码
        case 'IMGPAGE':
            let pageobj3 = Object.assign({}, state);
            pageobj3.page = action.num;
            return pageobj3
        //搜索
        case 'IMGSEARCH':
            let searchobj3 = Object.assign({}, state);
            searchobj3.content = action.data

            return searchobj3
        default:
            return state
    }
}
//会员页面
const reducer3 = (state = { content: [], page: 0 }, action) => {
    switch (action.type) {
        //获取当页数据
        case 'MEMBERDATA':
            let newobj4 = Object.assign({}, state);
            newobj4.content = action.data;
            // console.log(newobj4)
            return newobj4
        //页码
        case 'MEMBERPAGE':
            let pageobj4 = Object.assign({}, state);
            pageobj4.page = action.num;
            return pageobj4
        // //搜索
        case 'MEMBERSEARCH':
            let searchobj4 = Object.assign({}, state);
            searchobj4.content = action.data

            return searchobj4
        default:
            return state
    }
}

//消息页面
const reducer4 = (state = { content: [], page: 0 }, action) => {
    switch (action.type) {
        //获取当页数据
        case 'NEWSDATA':
            let newobj5 = Object.assign({}, state);
            newobj5.content = action.data;
            // console.log(newobj4)
            return newobj5
        //页码
        case 'NEWSPAGENUM':
            let pageobj5 = Object.assign({}, state);
            pageobj5.page = action.num;
            return pageobj5
        // // //搜索
        case 'MEWSEARCHDATA':
            let searchobj5 = Object.assign({}, state);
            searchobj5.content = action.data

            return searchobj5
        default:
            return state
    }
}

//管理员页面
const reducer5 = (state = { content: [], page: 0 }, action) => {
    switch (action.type) {
        //获取当页数据
        case 'MANAGERdATA':
            let newobj6 = Object.assign({}, state);
            newobj6.content = action.data;
            // console.log(newobj4)
            return newobj6
        //页码
        case 'MANAGERPAGEDATA':
            let pageobj6 = Object.assign({}, state);
            pageobj6.page = action.num;
            return pageobj6
        // // //搜索
        case 'MANAGERSEARCH':
            let searchobj6 = Object.assign({}, state);
            searchobj6.content = action.data

            return searchobj6
        default:
            return state
    }
}
const reducers = combineReducers({
    reducer,
    reducer1,
    reducer2,
    reducer3,
    reducer4,
    reducer5
});
export { reducers };