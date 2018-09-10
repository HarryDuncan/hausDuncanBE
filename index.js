const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const selectAllPaintings = 'SELECT * FROM paintingtable';
const selectAllBannerImages = 'SELECT * FROM bannerimages';


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

//All the sql get requests
const connection = mysql.createConnection({
	host: process.env.Host,
	user: process.env.UserName,
	password: process.env.PassWord,
	database: process.env.DataBase
});

connection.connect(err => {
	if(err) {
		console.log(err)
		return err
	}
});


app.use(cors());


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


app.listen(4000, () => {
	console.log('connected to db')
})
