const path = require('path')
const dotenv = require('dotenv').config({path: path.resolve(__dirname, '../.env')})

const express = require('express')
const fs = require('fs')
const sendEmail = require('./email/sendMail')

const multer = require('multer')

const storage = multer.memoryStorage()

const upload = multer({storage: storage})


const app = express()

app.use(express.static(path.resolve(__dirname, '../views')))
// app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.resolve(__dirname, '../views', "home", 'home.html'))
})


app.get('/services', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views', "services", 'services.html'))
})

app.get('/training', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views', "training", 'training.html'))
})

app.post('/form', async (req, res) => {
    
    try {
        await sendEmail(process.env.SMTP_EMAIL_FROM, `Inquery: ${req.body.subject}`, req.body.name, req.body.email, req.body.contact, req.body.textarea, null)
        res.json({
            success: true,
            data: 'Inquery Send'
        })
    } catch (err) {
        console.log(err.message)
        res.json({
            success: false,
            data: 'Failed to Send Inquery'
        })
    }

})

app.get('/career', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../views", 'career', 'career.html'))
})

app.post('/career', upload.single('file'),async (req, res) => {
    try {
        await sendEmail(process.env.SMTP_EMAIL_FROM, "New Resume",req.body.name, req.body.email, req.body.mobile, null, req.file)
        res.json({
            success: true,
            data: "Applied Successfully!"
        })
    } catch (err) {
        console.log(err.message)
        res.json({
            success: false,
            data: 'Error ocuured: failed to submit Resume.'
        })
    }

})


app.listen(3000, () => console.log('server started'))