const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

//All the sql get requests
const connection = mysql.createConnection({
	host: process.env.Host,
	user: process.env.UserName,
	password: process.env.PassWord,
	database: process.env.DataBase,
});

connection.connect(err => {
	if(err) {
		console.log(err)
		return err
	}
});


app.use(cors());

const selectAllPaintings = 'SELECT * FROM paintingtable';
const selectAllBannerImages = 'SELECT * FROM bannerimages';
const selectAllProducts = 'SELECT * FROM products';

app.get('/art', (req, res) =>{
	connection.query(selectAllPaintings, (err, results) => {
		if(err){
			return res.send(err)
		}
		else{
			
			return res.json({
			data: results
			})
		}
	})
});
app.get('/banner', (req, res) =>{
	connection.query(selectAllBannerImages, (err, results) => {
		if(err){
			return res.send(err)
		}
		else{
			
			return res.json({
			data: results
			})
		}
	})
});
app.get('/products', (req, res) =>{
	connection.query(selectAllBannerImages, (err, results) => {
		if(err){
			return res.send(err)
		}
		else{
			
			return res.json({
			data: results
			})
		}
	})
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/login', (req, res) =>{
	var userName = req.body.name;
	var pass = req.body.pass;
	const GetUser = 'SELECT * FROM users where username = ?'
	connection.query(GetUser, userName, (err, results) =>{
		if(err){
			return res.send(err)
		}
		else if(results === []){
			return res.sendStatus(401)
		}else{
			var savedPword = results[0].pWord
			bcrypt.compare(pass, savedPword, (err, isMatch) => {
  				if(isMatch === true){
  					res.sendStatus(200)
  				}else{
  					res.sendStatus(401)
  				}
			});
		}
	})
	
})


app.post('/newPiece', (req, res) => {
	var values = [req.body.Title, req.body.Year, req.body.ImgUrl, req.body.Blurb, req.body.Medium]
	var insertStatment= "INSERT INTO paintingtable (PaintingTitle, PaintingYear, ImageURL, Blurb, Medium)  VALUES ?"
	connection.query(insertStatment, [[values]], (err, results) =>{
		if(err){
			
			res.sendStatus(400)
		}
		else{
			res.sendStatus(200)
		}
	})

})



app.post('/newProduct', (req, res) => {
	var values = [req.body.Name, req.body.Blurb, req.body.Price, req.body.ImgUrl,  req.body.Stock, req.body.ArtID]
	var insertStatment= "INSERT INTO products (ProductName, Blurb, Price, ImageUrl, stock, ArtID)  VALUES ?"
	connection.query(insertStatment, [[values]], (err, results) =>{
		if(err){
			
			res.sendStatus(400)
		}
		else{
			res.sendStatus(200)
		}
	})

})

app.listen(4000, () => {
	console.log('connected to db')
})
