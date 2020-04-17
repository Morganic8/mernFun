const mongoose = require('mongoose');

const QuoteSchema = mongoose.Schema({
    quote: String,
    dateCreated: Date
});

const Quote = mongoose.model('Quote', QuoteSchema);

module.exports = Quote;