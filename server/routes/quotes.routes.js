const QuotesController = require('../controllers/quotes.controllers');

module.exports = function (app) {
    // Create (post)
    app.put('/api/quotes/author/new_quote/:id',QuotesController.createQuote); // WORKS .. adds a new quote
    app.post('/api/quotes/author/new', QuotesController.createAuthor); // WORKS
    // READ (get) 
    app.get('/api/quotes/author', QuotesController.showAllAuthors); // WORKS
    app.get('/api/quotes/author/:id', QuotesController.showAuthor); // WORKS

    // Update (put/patch)
    app.put('/api/quotes/author/edit/:author_id', QuotesController.updateAuthor);
    app.put('/api/quotes/:author_id', QuotesController.updateQuote); // ???????????????

    // Delete (delete)
    app.delete('/api/quotes/author/:id', QuotesController.deleteAuthor); // WORKS
    app.put('/api/quotes/author/remove_quote/:author_id', QuotesController.deleteQuote); /// WORKS .. REMOVES AN EXISTING QUOTE
}