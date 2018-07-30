
"use strict";
let express = require('express');
let router = express.Router();
let User = require('../models/user');
let Weibo = require('../models/weibo');
let Order = require('../models/order');
let Img = require('../models/img');
let Member = require('../models/member');
let News = require('../models/news');
let Manager = require('../models/manager');
let multiparty = require('multiparty');
let fs = require('fs');
let resData;

router.use(function (req, res, next) {
  resData = {
    code: 0,
    msg: ''
  };
  next();
});

router.post('/user/login', (req, res, next) => {
 
  let username = req.body.username;
  let password = req.body.password;
  console.log(username,password)
  if (username == '' || password == '') {
    resData.code = -1;
    resData.msg = '用户名或密码不能为空';
    res.json(resData);
    return;
  }
  User.findOne({
    username: username,
    password: password
  }).then((userInfo) => {
    if (!userInfo) {
      resData.code = -3;
      resData.msg = '用户不存在或密码错误'
      res.json(resData);
      return;
    }
    resData.msg = '登录成功';
    resData.userInfo = {
      _id: userInfo._id,
      username: userInfo.username
    };
    res.json(resData);
  })
});

router.post('/user/register', (req, res, next) => {

  let username = req.body.username;
  let password = req.body.password;

  if (username == '') {
    resData.code = -1;
    resData.msg = '用户名不能为空';
    res.json(resData);
    return;
  }
  if (password == '') {
    resData.code = -2;
    resData.msg = '密码不能为空';
    res.json(resData);
    return;
  }
  // let user = new User({
  //   username: username,
  //   password: password
  // });
// user.save().then(function (newUserInfo) {

  console.log(username,'这个就是前端传的name')
  User.findOne({
    username: username
  }).then(function(newUserInfo){
    console.log(newUserInfo+'OK');
    if(!newUserInfo){
      let user = new User({
        username: username,
        password: password
      });
      user.save().then(()=>{
        resData.code = 0;
        resData.msg = '注册成功！';
        console.log(resData);
        res.json(resData);
      });
    }else{
        resData.code = 1;
        resData.msg = '用户名已占用!';
        res.json(resData);
    }
  });
});
//获取原来的密码
router.post('/user/findpassword', (req, res, next) => {
  let password = req.body.password;
  User
    .find({ password: password })
    .sort('-time')
    .exec((err, data) => {
      let arr = [];
      for (let o of data) {
        let obj = {
          id: o._id,
          username: o.username,
          password: o.password
        };

        arr.push(obj);

      }
      res.json(arr);
    });

})
//修改账号密码
router.post('/user/update', (req, res, next) => {
  console.log(req.body);

  let id = req.body.id;
  let username = req.body.username;
  let password = req.body.password;
  let obj = {
    username,
    password
  }
  console.log(obj)
  User.findByIdAndUpdate(id, obj, (err, data) => {
    console.log('这是我的err：' + err);
    if (err) {
      resData.code = -1;
      resData.msg = '更新失败！';
      res.json(resData);
    } else {
      resData.code = 0;
      resData.msg = '更新成功！';
      resData.id = data._id;
      resData.username = data.username;
      resData.password = data.password;
      res.json(resData);
    }
  });
});


router.post('/upload', (req, res, next) => {
  //生成对象，配置上传目标路径
  let form = new multiparty.Form({
    uploadDir: './public/files/',
    encoding: 'utf-8'
  });
  form.parse(req, function (err, fields, files) {
    fs.rename(files.file[0].path, './public/files/' + files.file[0].originalFilename, function (err) {
      if (err) {
       console.log('重命名失败');
      } else {
        resData.code = 0;
        resData.msg = '上传成功！';
        res.json(resData);
      }
    })
  });
});
//编辑
router.post('/weibo/update', (req, res, next) => {
  console.log(req.body);

  let id = req.body.id;
  let name = req.body.name;
  let price = Number(req.body.price);
  let stock = Number(req.body.stock);
  // let checked = false;
  let state =req.body.state
  let namekind = req.body.namekind
  // let number = +new Date
  // let time = req.body.time
  let obj = {
    // id,
    name,
    price,
    stock,
    // checked,
    state,
    namekind,
    // time,
    // number
  }
  console.log(obj)
  Weibo.findByIdAndUpdate(id, obj, (err, data) => {
    console.log('这是我的err：' + err);
    if (err) {
      resData.code = -1;
      resData.msg = '更新失败！';
      res.json(resData);
    } else {
      resData.code = 0;
      resData.msg = '更新成功！';
      resData.id = data._id;
      resData.time = data.time;
      resData.name = data.name;
      resData.number = data.number;
      resData.namekind = data.namekind;
      resData.state = data.state;
      resData.checked = data.checked;
      resData.stock = data.stock;
      resData.price = data.price;
      res.json(resData);
    }
  });
});
//图片的编辑
router.post('/img/update', (req, res, next) => {
  console.log(req.body);

  let id = req.body.id;
  let name = req.body.name;
  let stock = Number(req.body.stock);
  // let checked = false;
  let state = req.body.state
  let namekind = req.body.namekind
  let info = req.body.info
  let dz = req.body.dz
  // let number = +new Date
  // let time = req.body.time
  let obj = {
    // id,
    name,
    stock,
    info,
    state,
    namekind,
    dz,
    // number
  }
  console.log(obj)
  Img.findByIdAndUpdate(id, obj, (err, data) => {
    console.log('这是我的err：' + err);
    if (err) {
      resData.code = -1;
      resData.msg = '更新失败！';
      res.json(resData);
    } else {
      resData.code = 0;
      resData.msg = '更新成功！';
      resData.id = data._id;
      resData.name = data.name;
      resData.namekind = data.namekind;
      resData.state = data.state;
      resData.info = data.info;
      resData.stock = data.stock;
      resData.dz = data.dz;
      res.json(resData);
    }
  });
});
//会员的编辑
router.post('/member/update', (req, res, next) => {
  console.log(req.body);

  let id = req.body.id;
  let name = req.body.name;
  // let stock = Number(req.body.stock);
  // let checked = false;
  let phonenum = Number(req.body.phonenum);
  let state = req.body.state
  let namekind = req.body.namekind
  let email = req.body.email
  let dz = req.body.dz
  let sx = req.body.sx
  // let number = +new Date
  // let time = req.body.time
  let obj = {
    //  id,
    name,
    // stock,
    sx,
    email,
    phonenum,
    state,
    namekind,
    dz,
    // number
  }
  console.log(obj)
  Member.findByIdAndUpdate(id, obj, (err, data) => {
    console.log('这是我的err：' + err);
    if (err) {
      resData.code = -1;
      resData.msg = '更新失败！';
      res.json(resData);
    } else {
      resData.code = 0;
      resData.msg = '更新成功！';
      resData.id = data._id;
      resData.name = data.name;
      resData.namekind = data.namekind;
      resData.state = data.state;
      resData.phonenum = data.phonenum;
      resData.sx = data.sx;
      resData.email = data.email;
      resData.dz = data.dz;
      res.json(resData);
    }
  });
});
//管理员的编辑
router.post('/manager/update', (req, res, next) => {
  console.log(req.body);

  let id = req.body.id;
  let name = req.body.name;
  let phonenum = Number(req.body.phonenum);
  // let checked = false;
  let state = req.body.state
  let namekind = req.body.namekind
  let sx = req.body.sx
  let email = req.body.email
  // let number = +new Date
  // let time = req.body.time
  let obj = {
    // id,
    name,
    phonenum,
    sx,
    state,
    namekind,
    email,
    // number
  }
  console.log(obj)
  Manager.findByIdAndUpdate(id, obj, (err, data) => {
    console.log('这是我的err：' + err);
    if (err) {
      resData.code = -1;
      resData.msg = '更新失败！';
      res.json(resData);
    } else {
      resData.code = 0;
      resData.msg = '更新成功！';
      resData.id = data._id;
      resData.name = data.name;
      resData.namekind = data.namekind;
      resData.state = data.state;
      resData.sx = data.sx;
      resData.phonenum = data.phonenum;
      resData.email = data.email;
      res.json(resData);
    }
  });
});

//weibo
router.get('/weibo', (req, res, next) => {
  let act = req.query.act;
  let id,content;
  const PAGE_SIZE = 10;

  switch(act) {
    case 'add':
      let name = req.query.name;
      let price = req.query.price;
      let checked = req.query.checked;
      let state = req.query.state;
      let namekind = req.query.namekind;
      let stock = req.query.stock;
      let time = +new Date();
      let number = +new Date();
      if (!name) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        name = name.replace('\n','');
        let weibo = new Weibo({
          name,
          number,
          time,
          price,
          checked,
          state,
          namekind,
          stock
        });
        weibo.save((err, data) => {
          resData.code = 0;
          resData.msg = '提交成功！';
          resData.id = data._id;
          resData.name = data.name;
          resData.number = data.number;
          resData.time = data.time;
          resData.price = data.price;
          resData.checked = data.checked;
          resData.state = data.state;
          resData.namekind = data.namekind;
          resData.stock = data.stock;
          res.json(resData);
        });
      }
      break;
    case 'get_page_count':
      Weibo.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get_find_count':
      let goodname1 = req.query.name;
      let goodkind1 = req.query.namekind;
      Weibo.count({ [goodkind1]: goodname1}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get':
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        Weibo
        .find({})
        .sort('-time')
        .skip(PAGE_SIZE * (page-1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              name: o.name,
              time: o.time,
              number: o.number,
              price: o.price,
              checked: o.checked,
              state: o.state,
              namekind: o.namekind,
              stock:o.stock
            };
            arr.push(obj);
          }
          res.json(arr);
        });
      }
      break;       
    case 'del':
      id = req.query.id;
      Weibo.remove({_id: id}, (err) => {
        if (!err) {
          resData.code = 0;
          resData.msg = '删除成功';
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = '删除失败';
          res.json(resData);
        }
      });
      break;
    case 'delall':
      console.log(req.query);
      let all = req.query.all;
      let l = JSON.parse(all);
      console.log(l);
      for (let i = 0; i < all.length; i++) {
        Weibo.remove({ _id: l[i] }, (err) => {
          if (!err) {
            resData.code = 0;
            resData.msg = '删除成功';
          } else {
            resData.code = -1;
            resData.msg = '删除失败';
          }
        });
      }
      res.json(resData);
      break;
    case 'search':
      let goodname = req.query.name; 
      let goodkind = req.query.namekind; 
      let num = req.query.num; 
      Weibo.find({[goodkind]: goodname })
      .sort('-time')
      .skip(PAGE_SIZE * (num - 1))
      .limit(PAGE_SIZE)
      .exec((err, data) => {
        console.log(data); 
        let arr = []; 
        for (let o of data) {          
          let obj = {
              id: o._id, 
              namekind: o.namekind, 
              name: o.name, 
              number: o.number, 
              stock: o.stock, 
              checked: o.checked, 
              price: o.price, 
              state: o.state
            }; 
          arr.push(obj);
        }
        res.json(arr);
      })
    break;
    default:
      resData.code = -1;
      resData.msg = '参数错误';
      res.json(resData);
  }

});

//图片管理
router.get('/img', (req, res, next) => {
  let act = req.query.act;
  let id, content;
  const PAGE_SIZE = 10;

  switch (act) {
    case 'add':
      let name = req.query.name;
      let price = req.query.price;
      let checked = req.query.checked;
      let state = req.query.state;
      let namekind = req.query.namekind;
      let stock = req.query.stock;
      let info = req.query.info;
      let dz = req.query.dz;
      let time = +new Date();
      let number = +new Date();
      if (!name) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        name = name.replace('\n', '');
        let img = new Img({
          name,
          number,
          time,
          price,
          checked,
          state,
          namekind,
          stock,
          info,
          dz
        });
        img.save((err, data) => {
          resData.code = 0;
          resData.msg = '提交成功！';
          resData.id = data._id;
          resData.name = data.name;
          resData.number = data.number;
          resData.time = data.time;
          resData.price = data.price;
          resData.checked = data.checked;
          resData.state = data.state;
          resData.namekind = data.namekind;
          resData.stock = data.stock;
          resData.info = data.info;
          resData.dz = data.dz;
          res.json(resData);
        });
      }
      break;
    case 'get_page_count':
      Img.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get_find_count':
      let goodname1 = req.query.name;
      let goodkind1 = req.query.namekind;
      Img.count({ [goodkind1]: goodname1 }, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get':
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        Img
          .find({})
          .sort('-time')
          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            let arr = [];
            for (let o of data) {
              let obj = {
                id: o._id,
                name: o.name,
                time: o.time,
                number: o.number,
                price: o.price,
                checked: o.checked,
                state: o.state,
                namekind: o.namekind,
                stock: o.stock,
                info: o.info,
                dz: o.dz
              };
              arr.push(obj);
            }
            res.json(arr);
          });
      }
      break;
    case 'del':
      id = req.query.id;
      Img.remove({ _id: id }, (err) => {
        if (!err) {
          resData.code = 0;
          resData.msg = '删除成功';
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = '删除失败';
          res.json(resData);
        }
      });
      break;
    case 'delall':
      console.log(req.query);
      let all = req.query.all;
      let l = JSON.parse(all);
      console.log(l);
      for (let i = 0; i < all.length; i++) {
        Img.remove({ _id: l[i] }, (err) => {
          if (!err) {
            resData.code = 0;
            resData.msg = '删除成功';
          } else {
            resData.code = -1;
            resData.msg = '删除失败';
          }
        });
      }
      res.json(resData);
      break;
    case 'search':
      let goodname = req.query.name;
      let goodkind = req.query.namekind;
      let num = req.query.num;
      Img.find({ [goodkind]: goodname })
        .sort('-time')
        .skip(PAGE_SIZE * (num - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              namekind: o.namekind,
              name: o.name,
              number: o.number,
              stock: o.stock,
              checked: o.checked,
              state: o.state,
              info:o.info,
              dz:o.dz
            };
            arr.push(obj);
          }
          res.json(arr);
        })
      break;
    default:
      resData.code = -1;
      resData.msg = '参数错误';
      res.json(resData);
  }

});
//会员管理
router.get('/member', (req, res, next) => {
  let act = req.query.act;
  let id, content;
  const PAGE_SIZE = 10;

  switch (act) {
    case 'add':
      let name = req.query.name;
      let phonenum = req.query.phonenum;
      let checked = req.query.checked;
      let state = req.query.state;
      let namekind = req.query.namekind;
      let stock = req.query.stock;
      let dz = req.query.dz;
      let email = req.query.email;
      let sx=req.query.sx;
      let time = +new Date();
      let number = +new Date();
      if (!name) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        name = name.replace('\n', '');
        let member = new Member({
          name,
          number,
          time,
          phonenum,
          checked,
          state,
          namekind,
          stock,
          dz,
          email,
          sx
        });
        member.save((err, data) => {
          resData.code = 0;
          resData.msg = '提交成功！';
          resData.id = data._id;
          resData.name = data.name;
          resData.number = data.number;
          resData.time = data.time;
          resData.checked = data.checked;
          resData.state = data.state;
          resData.namekind = data.namekind;
          resData.stock = data.stock;
          resData.phonenum = data.phonenum;
          resData.dz = data.dz;
          resData.email = data.email;
          resData.sx = data.sx;
          res.json(resData);
        });
      }
      break;
    case 'get_page_count':
      Member.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get_find_count':
      let goodname1 = req.query.name;
      let goodkind1 = req.query.namekind;
      Member.count({ [goodkind1]: goodname1 }, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get':
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        Member
          .find({})
          .sort('-time')
          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            let arr = [];
            for (let o of data) {
              let obj = {
                id: o._id,
                name: o.name,
                time: o.time,
                number: o.number,
                phonenum: o.phonenum,
                checked: o.checked,
                state: o.state,
                namekind: o.namekind,
                stock: o.stock,
                dz:o.dz,
                email:o.email,
                sx:o.sx
              };
              arr.push(obj);
            }
            res.json(arr);
          });
      }
      break;
    case 'del':
      id = req.query.id;
      Member.remove({ _id: id }, (err) => {
        if (!err) {
          resData.code = 0;
          resData.msg = '删除成功';
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = '删除失败';
          res.json(resData);
        }
      });
      break;
    case 'delall':
      console.log(req.query);
      let all = req.query.all;
      let l = JSON.parse(all);
      console.log(l);
      for (let i = 0; i < all.length; i++) {
        Member.remove({ _id: l[i] }, (err) => {
          if (!err) {
            resData.code = 0;
            resData.msg = '删除成功';
          } else {
            resData.code = -1;
            resData.msg = '删除失败';
          }
        });
      }
      res.json(resData);
      break;
    case 'search':
      let goodname = req.query.name;
      let goodkind = req.query.namekind;
      let num = req.query.num;
      Member.find({ [goodkind]: goodname })
        .sort('-time')
        .skip(PAGE_SIZE * (num - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              namekind: o.namekind,
              name: o.name,
              number: o.number,
              stock: o.stock,
              checked: o.checked,
              phonenum: o.phonenum,
              state: o.state,
              dz:o.dz,
              email:o.email,
              sx:o.sx
            };
            arr.push(obj);
          }
          res.json(arr);
        })
      break;
    default:
      resData.code = -1;
      resData.msg = '参数错误';
      res.json(resData);
  }

});
//订单页面的后台
router.get('/order', (req, res, next) => {
  let act = req.query.act;
  let id, content;
  const PAGE_SIZE = 10;

  switch (act) {
    case 'add':
      let { name, price, yhprice, jyprice, checked, state, namekind, stock}=req.query;
      let time = +new Date();
      let number = +new Date();
      if (!name) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        name = name.replace('\n', '');
        let order = new Order({
          name,
          number,
          time,
          price,
          checked,
          state,
          namekind,
          stock,
          jyprice,
          yhprice
        });
        order.save((err, data) => {
          resData.code = 0;
          resData.msg = '提交成功！';
          resData.id = data._id;
          resData.name = data.name;
          resData.number = data.number;
          resData.time = data.time;
          resData.price = data.price;
          resData.checked = data.checked;
          resData.state = data.state;
          resData.namekind = data.namekind;
          resData.stock = data.stock;
          resData.jyprice = data.jyprice;
          resData.yhprice = data.yhprice;
          res.json(resData);
        });
      }
      break;
    case 'get_page_count':
      Order.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get_find_count':
      let goodname1 = req.query.name;
      let goodkind1 = req.query.namekind;
      Order.count({ [goodkind1]: goodname1 }, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get':
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        Order
          .find({})
          .sort('-time')
          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            let arr = [];
            for (let o of data) {
              let obj = {
                id: o._id,
                name: o.name,
                time: o.time,
                number: o.number,
                price: o.price,
                checked: o.checked,
                state: o.state,
                namekind: o.namekind,
                stock: o.stock,
                yhprice: o.yhprice,
                jyprice: o.jyprice
              };
              arr.push(obj);
            }
            res.json(arr);
          });
      }
      break;
    case 'del':
      id = req.query.id;
      Order.remove({ _id: id }, (err) => {
        if (!err) {
          resData.code = 0;
          resData.msg = '删除成功';
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = '删除失败';
          res.json(resData);
        }
      });
      break;
    case 'delall':
      console.log(req.query);
      let all = req.query.all;
      let l = JSON.parse(all);
      console.log(l);
      for (let i = 0; i < all.length; i++) {
        Order.remove({ _id: l[i] }, (err) => {
          if (!err) {
            resData.code = 0;
            resData.msg = '删除成功';
          } else {
            resData.code = -1;
            resData.msg = '删除失败';
          }
        });
      }
      res.json(resData);
      break;
    case 'search':
      let goodname = req.query.name;
      let goodkind = req.query.namekind;
      let num = req.query.num;
      Order.find({ [goodkind]: goodname })
        .sort('-time')
        .skip(PAGE_SIZE * (num - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              namekind: o.namekind,
              name: o.name,
              number: o.number,
              stock: o.stock,
              checked: o.checked,
              price: o.price,
              yhprice:o.yhprice,
              jyprice:o.jyprice,
              state: o.state
            };
            arr.push(obj);
          }
          res.json(arr);
        })
      break;
    default:
      resData.code = -1;
      resData.msg = '参数错误';
      res.json(resData);
  }

});

//消息管理
router.get('/news', (req, res, next) => {
  let act = req.query.act;
  let id, content;
  const PAGE_SIZE = 10;

  switch (act) {
    case 'add':
      let name = req.query.name;
      let checked = req.query.checked;
      let state = req.query.state;
      let newsinfo = req.query.newsinfo;
      let time = +new Date();
      let number = +new Date();
      if (!name) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        name = name.replace('\n', '');
        let news = new News({
          name,
          number,
          time,
          checked,
          state,
          newsinfo
        });
        news.save((err, data) => {
          resData.code = 0;
          resData.msg = '提交成功！';
          resData.id = data._id;
          resData.name = data.name;
          resData.number = data.number;
          resData.time = data.time;
          resData.price = data.price;
          resData.checked = data.checked;
          resData.state = data.state;
          resData.namekind = data.namekind;
          resData.stock = data.stock;
          res.json(resData);
        });
      }
      break;
    case 'get_page_count':
      News.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get_find_count':
      let goodname1 = req.query.name;
      let goodkind1 = req.query.namekind;
      News.count({ [goodkind1]: goodname1 }, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get':
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        News
          .find({})
          .sort('-time')
          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            let arr = [];
            for (let o of data) {
              let obj = {
                id: o._id,
                name: o.name,
                time: o.time,
                number: o.number,
                checked: o.checked,
                state: o.state,
                newsinfo: o.newsinfo
              };
              arr.push(obj);
            }
            res.json(arr);
          });
      }
      break;
    case 'del':
      id = req.query.id;
      News.remove({ _id: id }, (err) => {
        if (!err) {
          resData.code = 0;
          resData.msg = '删除成功';
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = '删除失败';
          res.json(resData);
        }
      });
      break;
    case 'delall':
      console.log(req.query);
      let all = req.query.all;
      let l = JSON.parse(all);
      console.log(l);
      for (let i = 0; i < all.length; i++) {
        News.remove({ _id: l[i] }, (err) => {
          if (!err) {
            resData.code = 0;
            resData.msg = '删除成功';
          } else {
            resData.code = -1;
            resData.msg = '删除失败';
          }
        });
      }
      res.json(resData);
      break;
    case 'search':
      let goodname = req.query.name;
      let goodkind = req.query.namekind;
      let num = req.query.num;
      News.find({ [goodkind]: goodname })
        .sort('-time')
        .skip(PAGE_SIZE * (num - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              newsinfo: o.newsinfo,
              name: o.name,
              number: o.number,
              checked: o.checked,
              state: o.state,
              time:o.time
            };
            arr.push(obj);
          }
          res.json(arr);
        })
      break;
    default:
      resData.code = -1;
      resData.msg = '参数错误';
      res.json(resData);
  }

});

//管理员管理
router.get('/manager', (req, res, next) => {
  let act = req.query.act;
  let id, content;
  const PAGE_SIZE = 10;

  switch (act) {
    case 'add':
      let name = req.query.name;
      let sx = req.query.sx;
      let checked = req.query.checked;
      let state = req.query.state;
      let namekind = req.query.namekind;
      let email = req.query.email;
      let phonenum = req.query.phonenum;
      let time = +new Date();
      let number = +new Date();
      if (!name) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        name = name.replace('\n', '');
        let manager = new Manager({
          name,
          number,
          time,
          email,
          checked,
          state,
          namekind,
          phonenum,
          sx
        });
        manager.save((err, data) => {
          resData.code = 0;
          resData.msg = '提交成功！';
          resData.id = data._id;
          resData.name = data.name;
          resData.number = data.number;
          resData.time = data.time;
          resData.phonenum = data.phonenum;
          resData.checked = data.checked;
          resData.state = data.state;
          resData.namekind = data.namekind;
          resData.sx = data.sx;
          resData.email = data.email;
          res.json(resData);
        });
      }
      break;
    case 'get_page_count':
      Manager.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get_find_count':
      let goodname1 = req.query.name;
      let goodkind1 = req.query.namekind;
      Manager.count({ [goodkind1]: goodname1 }, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get':
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        Manager
          .find({})
          .sort('-time')
          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            let arr = [];
            for (let o of data) {
              let obj = {
                id: o._id,
                name: o.name,
                time: o.time,
                number: o.number,
                sx: o.sx,
                checked: o.checked,
                state: o.state,
                namekind: o.namekind,
                email: o.email,
                phonenum: o.phonenum,
              };
              arr.push(obj);
            }
            res.json(arr);
          });
      }
      break;
    case 'del':
      id = req.query.id;
      Manager.remove({ _id: id }, (err) => {
        if (!err) {
          resData.code = 0;
          resData.msg = '删除成功';
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = '删除失败';
          res.json(resData);
        }
      });
      break;
    case 'delall':
      console.log(req.query);
      let all = req.query.all;
      let l = JSON.parse(all);
      console.log(l);
      for (let i = 0; i < all.length; i++) {
        Manager.remove({ _id: l[i] }, (err) => {
          if (!err) {
            resData.code = 0;
            resData.msg = '删除成功';
          } else {
            resData.code = -1;
            resData.msg = '删除失败';
          }
        });
      }
      res.json(resData);
      break;
    case 'search':
      let goodname = req.query.name;
      let goodkind = req.query.namekind;
      let num = req.query.num;
      Manager.find({ [goodkind]: goodname })
        .sort('-time')
        .skip(PAGE_SIZE * (num - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              name: o.name,
              time: o.time,
              number: o.number,
              sx: o.sx,
              checked: o.checked,
              state: o.state,
              namekind: o.namekind,
              email: o.email,
              phonenum: o.phonenum,
            };
            arr.push(obj);
          }
          res.json(arr);
        })
      break;
    default:
      resData.code = -1;
      resData.msg = '参数错误';
      res.json(resData);
  }

});
module.exports = router;