const express = require("express")
const app = express()

const admin = require("../models/index").admin

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

app.get("/", async(req, res) => {
    admin.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", upload.single("image") , async(req, res) => {
    let data = {
        nama: req.body.nama,
        img_profil: req.file.filename,
        username: req.body.username,
        password: req.body.password
    }

    admin.create(data)
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

app.put("/", upload.single("image") ,async(req, res) => {
    let data = {
        nama: req.body.nama,
        img_profil: req.file.filename,
        username: req.body.username,
        password: req.body.password
    }
        
    let param = {
        id_admin: req.body.id_admin
    }

//---------------------------------------------------------------------------------------------
    if (req.file) {
        let oldadmin = await admin.findOne({where: param})
        let oldImage = oldadmin.img_profil

        //delete file lama
        let pathfile = path.join(__dirname,"../image",oldImage)
        fs.unlink(pathfile, error => console.log(error))

        data.image = req.file.filename
    }

//---------------------------------------------------------------------------------------------
    admin.update(data,{where : param})
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

app.delete("/:id_admin", async(req, res) => {
    let id_admin = req.params.id_admin
    let perameter = {
        id_admin: id_admin
    }

//---------------------------------------------------------------------------------------------

    let oldadmin = await admin.findOne({where: perameter})
    let oldImage = oldadmin.img_profil

    //delete file lama
    let pathfile = path.join(__dirname,"../image",oldImage)
    fs.unlink(pathfile, error => console.log(error))

    // data.image = req.file.filename

//---------------------------------------------------------------------------------------------

    admin.destroy({where : perameter})
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