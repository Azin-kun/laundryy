const express = require("express")
const app = express()
const md5 = require("md5")

const oprator = require("../models/index").oprator

const multer = require("multer")
const path = require("path")
const fs = require("fs")

const auth = require("./auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "nodekel6"

//---------------------------------------------------------------------------------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./image")
    },
    filename: (req, file, cb) => {
        cb(null, "img_profil-" + Date.now() + path.extname(file.originalname))
    }
}) 

const upload = multer({storage:storage})
//---------------------------------------------------------------------------------------------

app.use(express.urlencoded({extended:true}))

app.get("/",async(req, res) => {
    oprator.findAll({
        include:["outlet"]
    })
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", upload.single("img_profil") , async(req, res) => {
    let data = {
        nama: req.body.nama,
        img_profil: req.file.filename,
        username: req.body.username,
        password: md5(req.body.password),
        no_tlp: req.body.no_tlp,
        level: req.body.level,
        id_outlet: req.body.id_outlet
    }

    oprator.create(data)
    .then(result => {
        res.json({
            message: "data telah di masukan",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/",upload.single("img_profil") ,async(req, res) => {
    let data = {
        nama: req.body.nama,
        img_profil: req.file.filename,
        username: req.body.username,
        password: md5(req.body.password),
        no_tlp: req.body.no_tlp,
        level: req.body.level,
        id_outlet: req.body.id_outlet
    }
        
    let param = {
        id_oprator: req.body.id_oprator
    }

//---------------------------------------------------------------------------------------------
    if (req.file) {
        let oldoprator = await oprator.findOne({where: param})
        let oldImage = oldoprator.img_profil

        //delete file lama
        let pathfile = path.join(__dirname,"../image",oldImage)
        fs.unlink(pathfile, error => console.log(error))

        data.image = req.file.filename
    }

//---------------------------------------------------------------------------------------------
    oprator.update(data,{where : param})
    .then(result => {
        res.json({
            message: "data telah di update",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_oprator", async(req, res) => {
    let id_oprator = req.params.id_oprator
    let perameter = {
        id_oprator: id_oprator
    }

//---------------------------------------------------------------------------------------------

    let oldoprator = await oprator.findOne({where: perameter})
    let oldImage = oldoprator.img_profil

    //delete file lama
    let pathfile = path.join(__dirname,"../image",oldImage)
    fs.unlink(pathfile, error => console.log(error))

    // data.image = req.file.filename

//---------------------------------------------------------------------------------------------

    oprator.destroy({where : perameter})
    .then(result => {
        res.json({
            message: "data telah di hapus",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/login", async (req,res) => {
    let params = {
        username: req.body.username,
        password: req.body.password
    }

    let result = await oprator.findOne({where: params})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app
