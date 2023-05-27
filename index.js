const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./connection')
const response = require('./response')

const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts')

// utils
const {
  selectAllBuku,
  insertBuku,
  deleteBuku,
  loadBuku,
  updateBuku,
} = require('./utils/sqlQuery')

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
  insertBuku(req.body)
  res.redirect('/')
})

app.delete('/buku', (req, res) => {
  deleteBuku(req.body.kode_buku)
  res.redirect('/')
})

app.post('/edit', async (req, res) => {
  const result = await loadBuku(req.body.kode_buku)

  res.render('edit_buku', {
    title: 'Halaman Edit Buku',
    layout: 'layouts/main-layout',
    result: result[0],
  })
})

app.put('/buku', (req, res) => {
  updateBuku(req.body)
  res.redirect('/')
})

app.get('/', async (req, res) => {
  const result = await selectAllBuku()

  res.render('buku', {
    title: 'Halaman Home',
    layout: 'layouts/main-layout',
    results: result,
  })
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
