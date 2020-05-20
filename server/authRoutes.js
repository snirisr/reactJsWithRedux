const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mysql = require('mysql');


const db = mysql.createConnection({

    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'Travely'
})

db.connect((err) => {
    if (err) {
        throw err
    }
})


router.post('/register', async (req, res) => {
    const { f_name, l_name, u_name, password } = req.body
    if (f_name && l_name && u_name && password) {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        let q = `INSERT INTO users (f_name, l_name, u_name, password)
        VALUES('${f_name}','${l_name}','${u_name}','${hash}')`
        console.log(f_name, l_name, u_name, password)
        try{
            const results = await Query(q)
            res.json(results) 
        }
        catch(err){
            console.log(err)
        }
    }
    else {
        res.status(400).send("missing some info")
    }
})


router.post('/login', async (req, res) => {
    const { u_name, password } = req.body
    if (u_name && password) {
        const q = `SELECT * FROM users WHERE u_name = '${u_name}'`
        console.log(q)
        try {
            const user = await Query(q)
            console.log(user[0].password)
            if (user) {
                if (bcrypt.compareSync(password, user[0].password)) {
                    jwt.sign({ u_name, isAdmin: user[0].isAdmin }, "travel_with_us", { expiresIn: "10m" },
                        (err, token) => {
                            if (err) {
                                res.sendStatus(500)
                                throw err
                            }
                            res.json({ token, user })
                        })
                }
                else {
                    res.status(400).send("wrong password")
                }
            }
            else {
                res.status(400).send("user not found")
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    else {
        res.status(400).send("missing some info")
    }
})

const Query = (q, ...par) => {
    return new Promise((resolve, reject) => {
        db.query(q, par, (err, results) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(results)
            }
        })
    })
}


module.exports = router