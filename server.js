
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())

let member = require("./router/member")
let outlet = require("./router/outlet")
let oprator = require("./router/oprator")
let paket = require("./router/paket")
let transaksi = require("./router/transaksi")
let detail_transaksi = require("./router/detail_transaksi")

app.use("/laundry/member", member)
app.use("/laundry/outlet", outlet)
app.use("/laundry/oprator", oprator)
app.use("/laundry/paket", paket)
app.use("/laundry/transaksi", transaksi)
app.use("/laundry/detail_transaksi", detail_transaksi)


app.use(express.static(__dirname))

app.listen(8000, ()=> {
    console.log(`server berjalan di port 8000`)
})