const express = require('express')
const router = express.Router()

const db = require('../db/birds')

router.get('/', (req, res) => {
  db.getBirds()
    .then((allBirds) => {
      res.status(200).json(allBirds)
      return null
    })
    .catch(err => {
      res.status(500).send('DB ERROR ' + err)
    })
})

router.get('/bird/:id', (req, res) => {
  const id = req.params.id
  db.getBirdsById(id)
    .then((bird) => {
      const info = {

      }
      res.status(200).json(info)
      return null
    })
    .catch(err => {
      res.status(500).send('DB ERROR ' + err)
    })
})

router.get('/', (req, res) => {
  db.getBirds()
    .then((allBirds) => {
      res.status(200).json(allBirds)
      return null
    })
    .catch(err => {
      res.status(500).send('DB ERROR ' + err)
    })
})

router.get('/', (req, res) => {
  db.getBirds()
    .then((allBirds) => {
      res.status(200).json(allBirds)
      return null
    })
    .catch(err => {
      res.status(500).send('DB ERROR ' + err)
    })
})
module.exports = router