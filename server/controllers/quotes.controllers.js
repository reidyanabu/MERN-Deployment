const { json } = require('express');
const { models } = require('mongoose');
const { Author } = require('../models/quotes.model');

module.exports = {
    // Create (post)
    createAuthor: (request, response) => {
        const author_name = request.body.author_name;
        console.log(`createAuthor: author_name = ${author_name}`);
        Author.create({
            author_name: author_name
        })
        .then( author => response.json(author))
        .catch(e => response.status(400).json(e));
    }, 

    // Create a new Quote for an Author
    createQuote: (request, response) => {

        Author.findByIdAndUpdate(
            request.params.id,
            { $push: { quotes: request.body } },
            { new:true, runValidators: true }
            )
            .then(author=>response.json(author))
            .catch(e => response.status(400).json(e));
    }, 

    // Read (get)
    // Show all Authors
    showAllAuthors: (request, response) => {
        Author.find({})
            .then(authors => response.json(authors))
            .catch(e => response.status(400).json(e))
    },
    // Get Author and his quotes
    showAuthor: (request,response) => {
        Author.findById( { _id: request.params.id })
        .then(author=>response.json(author))
        .catch(e=>response.status(400).json(e));
    },

    // Update
    // ONLY UPDATE AUTHOR NAME ..
    updateAuthor: (request, response) => {
        Author.findOneAndUpdate(
            {_id: request.params.author_id},
            {author_name: request.body.author_name},
            { new:true, runValidators: true }
        )
        .then(author=>response.json(author))
        .catch(e=>response.status(400).json(e));
    },
    // UPDATE A QUOTE WITHIN AN AUTHOR 
    updateQuote: (request,response) => {
        
        Author.findOneAndUpdate(
            { _id: request.params.author_id, "quotes._id": request.body.quote_id },
            { $set: { "quotes.$.votes": request.body.votes } },
            { new:true, runValidators: true }
        )
        .then(author=>response.json(author))
        .catch(e=>response.status(400).json(e));
    },


    // Delete
    deleteAuthor: (request, response) => {
        
        Author.deleteOne({_id: request.params.id})
            .then(deleteConfirmation=>response.json(deleteConfirmation))
            .catch( e => response.status(400).json(e));
    },

    deleteQuote: (request, response) => {
        Author.findByIdAndUpdate(
            {_id: request.params.author_id },
            { $pull: { quotes: request.body } }, 
            { new:true, runValidators: true }
            )
            .then(author=>response.json(author))
            .catch(e => response.status(400).json(e));
    }

}
