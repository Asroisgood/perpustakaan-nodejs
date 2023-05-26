const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./connection')
const response = require('./response')

const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts')

const port = 3000

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(methodOverride('_method'))

app.get('/buku', (req, res) => {
  res.render('tambah_buku', {
    title: 'Form Tambah Buku',
    layout: 'layouts/main-layout',
  })
})

app.post('/buku', (req, res) => {
  const { kode_buku, judul_buku, pengarang, penerbit } = req.body

  const sql = `INSERT INTO buku VALUES('', '${kode_buku}', '${judul_buku}', '${pengarang}', '${penerbit}')`
  connection.query(sql, (err, result) => {
    // response(200, result, `INSERT DATA BUKU ${kode_buku} (${judul_buku})`, res)
    res.redirect('/')
  })
})

app.delete('/buku', (req, res) => {
  const { kode_buku } = req.body
  sql = `DELETE FROM buku WHERE kode_buku = '${kode_buku}'`
  connection.query(sql, (err, result) => {
    // response(200, result, `DELETE DATA BUKU ${kode_buku}`, res)
    res.redirect('/')
  })
})

app.post('/edit', (req, res) => {
  sql = `SELECT * FROM buku WHERE kode_buku = '${req.body.kode_buku}'`
  connection.query(sql, (err, result) => {
    if (err) throw err

    res.render('edit_buku', {
      title: 'Halaman Edit Buku',
      layout: 'layouts/main-layout',
      result: result[0],
    })
  })
})

app.put('/buku', (req, res) => {
  const { kode_buku, judul_buku, pengarang, penerbit } = req.body

  sql = `UPDATE buku SET judul_buku = '${judul_buku}', pengarang = '${pengarang}', penerbit = '${penerbit}' WHERE kode_buku = '${kode_buku}'`
  connection.query(sql, (err, result) => {
    // response(200, result, `UDPATE DATA ${kode_buku}`, res)
    res.redirect('/')
  })
})

app.get('/', (req, res) => {
  connection.query('SELECT * from buku', (err, result) => {
    // response(200, result, 'Tampil semua data buku', res)
    res.render('buku', {
      title: 'Halaman Home',
      layout: 'layouts/main-layout',
      results: result,
    })
  })
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
