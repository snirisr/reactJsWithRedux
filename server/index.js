const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const onlyUsers = require('./onlyUsers');
const onlyAdmins = require('./onlyAdmins')

app.use(express.json());
app.use(cors());

const db= mysql.createConnection({
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
    console.log("connected to my sql")
})

app.use("/api/auth", require("./authRoutes"))

//Get all Unfollowed Vacations:
app.get("/api/vacations", onlyUsers, async (req, res) => {

    let q = `SELECT * FROM vacations`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})

//Add a vacation:
app.post("/api/vacations",onlyAdmins , async (req,res)=>{
    const { destination, description, img_url, from_date, until_date, price } = req.body;
    console.log(req.body);
    let q = `INSERT INTO vacations (destination, description, img_url, from_date, until_date, price)
    VALUES ('${destination}','${description}','${img_url}', '${from_date}', '${until_date}', ${price})`
    try{
        const results = await Query(q)
        res.json(results)    
    }
    catch(err){
        console.log(err)
    }
} )

//Edit a Vacation:
app.put("/api/vacations", onlyAdmins,  async (req,res)=>{
    const { id, destination, description, img_url, from_date, until_date, price } = req.body
    console.log(req.body);
    let q= `UPDATE vacations
    SET destination = '${destination}',
    description =  '${description}',
    img_url = '${img_url}',
    from_date = '${from_date}',
    Until_date = '${until_date}',
    price = ${price}
    WHERE id = ${id}`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})

//Delete a Vacation:
app.delete("/api/followers", onlyUsers, async (req, res) => {
    const { u_id, v_id } = req.body;
    let q = `DELETE FROM followers WHERE v_id = ${v_id} AND u_id = ${u_id}`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})

//Add a Follower:
app.post("/api/followers",onlyUsers, async (req,res)=>{
    const { u_id, v_id } = req.body;
    console.log(req.body);
    let q = `INSERT INTO followers (u_id, v_id)
    VALUES (${u_id}, ${v_id})`
    try{
        const results = await Query(q)
        res.json(results)    
    }
    catch(err){
        console.log(err)
    }
})

//get Followers:
app.get("/api/followers/:id",onlyUsers, async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    let q =`SELECT vacations.id, vacations.destination,
     vacations.description, vacations.img_url, 
     vacations.from_date, vacations.until_date,
     vacations.price, followers.u_id AS status FROM vacations
     LEFT JOIN followers ON vacations.id=followers.v_id 
     WHERE followers.u_id= ${id} ORDER BY vacations.id`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})

//Get All Followed Vacations for the Reports:
app.get("/api/all-followed",onlyAdmins, async (req, res)=>{
    let q =`SELECT vacations.destination, 
    COUNT(V_ID) as amount
     From followers
     INNER JOIN vacations ON vacations.id=followers.v_id
     GROUP BY v_id 
     HAVING COUNT(v_id) >= 1`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})

//Delete a Follower:
app.delete("/api/delete-followers", onlyUsers, async (req, res) => {
    const { u_id, v_id } = req.body;
    let q = `DELETE FROM followers WHERE v_id = ${v_id} AND u_id = ${u_id}`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})

//Get Search result
app.get("/api/searchedvacations/:result", onlyUsers, async (req, res) => {
    const { result } = req.params
    let q = `SELECT DISTINCT vacations.id, vacations.destination,
    vacations.description, vacations.img_url, vacations.from_date,
    vacations.until_date, vacations.price
    FROM vacations LEFT JOIN followers ON vacations.id = followers.v_id
    WHERE destination  LIKE '%${result}%' OR description LIKE '%${result}%' 
    OR from_date LIKE '%${result}%' OR until_date LIKE '%${result}%'`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
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


app.listen(3001, console.log("Listening on http://localhost:3001"));

module.exports = {Query};
