// All the online store routes will be placed here

const app = require("express")();
const stripe = require("stripe")(process.env.StripeAPIKEY);
const router = express.Router();
const cors = require('cors');
app.use(require("body-parser").text());

router.post("/charge", async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});

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

router.post("/productPurchased"), (req, res) => {
	//Todo
}