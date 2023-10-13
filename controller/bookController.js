const { Author, Book } = require('../model/model')

const bookController = {
    //ADD A BOOK
    addBook: async (req, res) => {
        try {
            const newBook = new Book(req.body);
            const saveBook = await newBook.save();
            if (req.body.author) {
                const author = Author.findById(req.body.author);
                await author.updateOne({ $push: { books: saveBook._id } })
            }
            res.status(200).json(saveBook);
        } catch (err) {
            res.status(500).json(err); //HTTP REQUEST CODE
        }
    },
    //GET ALL BOOK
    getAllBook: async (req, res) => {
        try {
            const allbooks = await Book.find()
            res.status(200).json(allbooks)
        } catch (error) {
            res.status(500).json(error); //HTTP REQUEST CODE
        }
    },
    //GET A BOOK
    getABook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id).populate("author");
            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //UPDATE A Book
    updateABook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id)
            await book.updateOne({ $set: req.body })
            res.status(200).json("updated successfully")
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //DELETE A BOOK
    deleteABook: async (req, res) => {
        try {
            await Author.updateMany(
                { books: req.params.id },
                { $pull: { books: req.params.id } }
            )
            await Book.findByIdAndDelete(req.params.id)
            res.status(200).json("Delete successfully")
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = bookController