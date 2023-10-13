const { Author, Book } = require('../model/model')

const authorController = {
    //ADD ATHOUR
    addAuthor: async (req, res) => {
        try {
            const newAuthor = new Author(req.body);
            const savedAuthor = await newAuthor.save();
            res.status(200).json(savedAuthor);
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },
    //GET ALL AUTHOR
    getAllAuthor: async (req, res) => {
        try {
            const authors = await Author.find();
            res.status(200).json(authors);
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },
    //GET AN AUTHOR
    getAnAuthor: async (req, res) => {
        try {
            const author = await Author.findById(req.params.id).populate("books");
            res.status(200).json(author);
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },
    // UPDATE AN Author
    updateAnAuthor: async (req, res) => {
        try {
            const author = await Author.findById(req.params.id)
            await author.updateOne({ $set: req.body })
            res.status(200).json("updated successfully")
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },
    // DELETE AN AUTHOR
    deleteAnAuthor: async (req, res) => {
        try {
            await Book.updateMany(
                { author: req.params.id },
                { author: null }
            )
            await Author.findByIdAndDelete(req.params.id)
            res.status(200).json("Delete successfully")
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    }
}

module.exports = authorController