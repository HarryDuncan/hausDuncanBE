//All dashboard routes placed here
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
var bodyParser = require('body-parser');
const cors = require('cors');

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


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/newPiece', (req, res) => {
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



router.post('/newProduct', (req, res) => {
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

module.exports = router