const express = require('express')
const List = require('../model/list')
const Classify = require('../model/classify')
const books = express.Router()
books.get('/getlist', async (req, res) => {
    const data = await List.find()
    res.send(data)
})
//获取分类及链表
books.get('/getclasslist', async (req, res) => {
    Classify.aggregate([
        {
            $lookup: {
                from: 'lists',
                localField: 'status',
                foreignField: 'status',
                as: 'items'
            }
        }
    ], (err,data) => {
        console.log(data)
        res.send(data)
     })
 
})
// 添加
books.post('/addbook', async (req, res) => {
    const data = await List.create(req.body)
    res.send(data)
})
// books.get('/addclass',async(req,res)=>{
//     const data=await Classify.create({name:'公开',status:1,passwads:null})
//     res.send(JSON.stringify(data))
// })
//编辑展示
books.get('/editbook', async (req, res) => {
    const data = await List.findOne(req.query)
    res.send(data)
})
//编辑
books.get('/updatebook', async (req, res) => {
    const data = await List.updateOne({ _id: req.query._id }, { ...req.query })
    res.send(data)
})
//添加密码
books.get('/addpasswad',  async(req, res) => {
    const data = await Classify.updateOne({status:req.query.status }, { ...req.query })
    res.send(data)
})
//核对密码
books.get('/chexkpasswad',  async(req, res) => {
    const data = await Classify.findOne({status:2,passwads:req.query.passwads})
    res.send(data)
})
// //删除单个,查找到一条文档并且删除，返回删除的文档
// List.findOneAndDelete({_id:'5f6085b8c664a03760dbec4f'}).then(res=>console.log(res))
// //删除多条数据
// List.deleteMany({}).then(res=>console.log(res))
module.exports = books