const express = require("express")
const app = express()

const member = require("../models/index").member

const multer = require("multer")
const path = require("path")
const fs = require("fs")

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
    member.findAll({
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
        no_tlp: req.body.no_tlp,
        alamat: req.body.alamat
    }

    member.create(data)
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
        no_tlp: req.body.no_tlp,
        alamat: req.body.alamat
    }
        
    let param = {
        id_member: req.body.id_member
    }

//---------------------------------------------------------------------------------------------
    if (req.file) {
        let oldmember = await member.findOne({where: param})
        let oldImage = oldmember.img_profil

        //delete file lama
        let pathfile = path.join(__dirname,"../image",oldImage)
        fs.unlink(pathfile, error => console.log(error))

        data.image = req.file.filename
    }

//---------------------------------------------------------------------------------------------
    member.update(data,{where : param})
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

app.delete("/:id_member", async(req, res) => {
    let id_member = req.params.id_member
    let perameter = {
        id_member: id_member
    }

//---------------------------------------------------------------------------------------------

    let oldmember = await member.findOne({where: perameter})
    let oldImage = oldmember.img_profil

    //delete file lama
    let pathfile = path.join(__dirname,"../image",oldImage)
    fs.unlink(pathfile, error => console.log(error))

    // data.image = req.file.filename

//---------------------------------------------------------------------------------------------

    member.destroy({where : perameter})
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

module.exports = app