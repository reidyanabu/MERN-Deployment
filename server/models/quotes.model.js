const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema(
{
    quote: {
        type: String,
        default: '',
        minlength: [3, "Quote must be at least 3 characters"],
        required: [true, "Quote can not be blank"]
    },
    votes: {
        // votes
        type: Number,
        default: 0
    }
}
);

const AuthorSchema = new mongoose.Schema(
{
    author_name: {
        type: String,
        minlength: [3, "Author name must be at least 3 characters"],
        required: [true, "Author name is required"]
    }, 
    quotes: [QuoteSchema]
}, 
{ timestamps: true },
{ runValidators: true }
);
module.exports.Author = mongoose.model("Author", AuthorSchema);