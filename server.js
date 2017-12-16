var express=require('express');
var fs=require('fs');
var qs=require('querystring');

var app=express();

app.get('/login',function(req,res){
  fs.readFile('./user.json',function(err,data){
    if (err) {
      console.log(err);
    }else {
      var obj=JSON.parse(data);
      console.log(obj);
      // for (var i = 0; i < obj.length; i++) {
        if (obj.user==req.query.user&&obj.pass==req.query.pass) {
          return res.send('{"code":1,"des":"success"}');
        }else{
          return res.send('{"code":0,"des":"error"}');
        }

      // }
    }
  });

})

/**app.post('/register',function(req,res){
  var data='';
  req.on('data',function(chunk){
    data+=chunk;
  })
  req.on('end', function() {
    var objdata=qs.parse(data.toString());
    fs.readFile('./user.json',function(err,data){
      if (err) {
        console.error(err);
      }else {

        var obj=JSON.parse(data);
      //   for (var i = 0; i < obj.length; i++) {
      //     if (obj[i].user==req.query.user&&obj[i].pass==req.query.pass) {
      //       fs.writeFile('user.json','{"user":'+req.query.user+',"pass":'+req.query.pass+'}',{flag:'a'},function(err,data){
      //         if(err){
      //           return res.send('{"code":2,"des":"error"}');
      //         }else {
      //           return res.send('{"code":1,"des":"注册成功"}');
      //         }
      //       });
      //     }else{
      //       return res.send('{"code":0,"des":"error"}');
      //     }
      //
      // }
  };

})

})*/
app.post('/register',function(req,res){
  console.log('??');
  // 以文件流的形式提交的数据
  var dataP='';
  req.on('data',function(chunk){
    dataP+=chunk;
  })
  // 当文件流读取完毕时会触发end事件 在end事件中可以确保时间是完整的
  req.on('end',function(){
    var objData=qs.parse(dataP.toString());
    console.log(objData.user);
    // 判断是否存在
    fs.readFile('user.json',function(err,data){
      if(err){
        console.log(err);
      }else{
        var obj=JSON.parse(data);
        console.log(obj);
        // for(var i=0;i<obj.length;i++){
          if(obj.user==objData.user&&obj.pass==objData.pass){
          return   res.send('{"code":0,"des":"wrong"}');
          }else{
             var dd='{"user":"'+objData.user+'","pass":"'+objData.pass+'"}';
             fs.writeFile('user.json',dd,{flag:'w'},function(err,data){
               if (err) {
                 console.log(err);
               }else {
                 return   res.send('{"code":1,"des":"success"}');
               }

          });
          }
        // }
      }
    });
  });
});



app.get('*',function(req,res){
  // 判断请求的接口是否存在
  var bol=fs.existsSync('.'+req.path);

  if (bol) {
    var realpath=fs.realpathSync('.'+req.path);
    res.sendFile(realpath);
  }
})

app.listen(8888,function(){
  console.log('启动');
})
