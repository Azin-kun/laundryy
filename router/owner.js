const express = require("express")
const app = express()

const owner = require("../models/index").owner

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
    owner.findAll()
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
        tlp: req.body.tlp
    }

    owner.create(data)
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
        tlp: req.body.tlp
    }
        
    let param = {
        id_owner: req.body.id_owner
    }

//---------------------------------------------------------------------------------------------
    if (req.file) {
        let oldowner = await owner.findOne({where: param})
        let oldImage = oldowner.img_profil

        //delete file lama
        let pathfile = path.join(__dirname,"../image",oldImage)
        fs.unlink(pathfile, error => console.log(error))

        data.image = req.file.filename
    }

//---------------------------------------------------------------------------------------------
    owner.update(data,{where : param})
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

app.delete("/:id_owner", async(req, res) => {
    let id_owner = req.params.id_owner
    let perameter = {
        id_owner: id_owner
    }

//---------------------------------------------------------------------------------------------

    let oldowner = await owner.findOne({where: perameter})
    let oldImage = oldowner.img_profil

    //delete file lama
    let pathfile = path.join(__dirname,"../image",oldImage)
    fs.unlink(pathfile, error => console.log(error))

    // data.image = req.file.filename

//---------------------------------------------------------------------------------------------

    owner.destroy({where : perameter})
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