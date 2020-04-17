const router = require('express').Router();
const Quote = require('../models/Quotes');
const seedData = require("../../seedData");

/**
 * URL: localhost:5001/api/quotes
 * Response: Array of all Quote Documents
 */
router.get('/', (req, res, next) => {
    Quote.find({}, (err, quotes) => {
        if(err) next(err);
        else res.json(quotes);
    });
});



/**
 * URL localhost:5001/api/quotes/seed
 */
router.post('/seed', (req,res,next) => {
    for(let i = 0; i<5; i++){
        
        let randomQuote = Math.floor(Math.random() * 10);
        console.log(seedData.arr[randomQuote]);
        //TODO: Remove Duplicate quotes
    const newQuote = new Quote({
        quote: seedData.arr[randomQuote],
        dateCreated: new Date()
    });
    newQuote.save(err => {
        if(err) console.log(err);
        else console.log("quote saved")
    })
    }
    res.send("Run GET after this to see if the quotes got seeded successfully");
})


/**
 * URL: localhost:5001/api/quotes/create
 */
router.post('/create', (req, res, next) => {
    const { quote } = req.body;
    const newQuote = new Quote({
        quote,
        dateCreated: new Date(),
    });
    newQuote.save(err => {
        if(err) next(err);
        else res.json({ newQuote, msg: 'quote sucessfully saved!' })
    })
})

/**
 * URL: localhost:5001/api/quotes/
 * Description: Deletes all Quotes from DB
 */

 router.delete('/', (req,res,next) => {
     Quote.deleteMany({}, err => {
         if(err) next(err);
         else res.send('Sucessfully deleted all quotes!');
     });
 });

 module.exports = router;