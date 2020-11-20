const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true, useNewUrlParser: true })//连接数据库
    .then(() => {
        console.log('数据库链接成功')
    })
    .catch(err => {
        console.log('数据库链接失败', err)
    })
module.exports=mongoose