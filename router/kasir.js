const express = require("express")
const app = express()

const kasir = require("../models/index").kasir

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
    kasir.findAll({
        include: ["outlet"]
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

app.post("/", upload.single("image") , async(req, res) => {
    let data = {
        nama: req.body.nama,
        img_profil: req.file.filename,
        username: req.body.username,
        password: req.body.password,
        id_outlet: req.body.id_outlet
    }

    kasir.create(data)
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
        password: req.body.password,
        id_outlet: req.body.id_outlet
    }
        
    let param = {
        id_kasir: req.body.id_kasir
    }

//---------------------------------------------------------------------------------------------
    if (req.file) {
        let oldkasir = await kasir.findOne({where: param})
        let oldImage = oldkasir.img_profil

        //delete file lama
        let pathfile = path.join(__dirname,"../image",oldImage)
        fs.unlink(pathfile, error => console.log(error))

        data.image = req.file.filename
    }

//---------------------------------------------------------------------------------------------
    kasir.update(data,{where : param})
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

app.delete("/:id_kasir", async(req, res) => {
    let id_kasir = req.params.id_kasir
    let perameter = {
        id_kasir: id_kasir
    }

//---------------------------------------------------------------------------------------------

    let oldkasir = await kasir.findOne({where: perameter})
    let oldImage = oldkasir.img_profil

    //delete file lama
    let pathfile = path.join(__dirname,"../image",oldImage)
    fs.unlink(pathfile, error => console.log(error))

    // data.image = req.file.filename

//---------------------------------------------------------------------------------------------

    kasir.destroy({where : perameter})
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