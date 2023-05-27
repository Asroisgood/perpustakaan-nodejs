const connection = require('../connection')

const selectAllBuku = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM buku', (err, result) => {
      if (result) {
        resolve(result)
      } else {
        reject('Gagal mendapatkan data!')
      }
    })
  })
}

const insertBuku = (data) => {
  const { kode_buku, judul_buku, pengarang, penerbit } = data
  const sql = `INSERT INTO buku VALUES('', '${kode_buku}', '${judul_buku}', '${pengarang}', '${penerbit}')`

  connection.query(sql)
}

const deleteBuku = (kode_buku) => {
  sql = `DELETE FROM buku WHERE kode_buku = '${kode_buku}'`
  connection.query(sql)
}

const loadBuku = (kode_buku) => {
  sql = `SELECT * FROM buku WHERE kode_buku = '${kode_buku}'`
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (!err) resolve(result)
    })
  })
}

const updateBuku = (data) => {
  const { kode_buku, judul_buku, pengarang, penerbit } = data

  sql = `UPDATE buku SET judul_buku = '${judul_buku}', pengarang = '${pengarang}', penerbit = '${penerbit}' WHERE kode_buku = '${kode_buku}'`

  connection.query(sql)
}

module.exports = { selectAllBuku, insertBuku, deleteBuku, loadBuku, updateBuku }
