// model dùng để tạo khung cho Database

const mongoose = require('mongoose');

/*
    1 tác giác có nhiều quyển sách
    1 quyển sách có 1 tác giả
*/
// Author
const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    year:{
        type:Number,
        require: true
    },
    books:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Book",
        }
    ]
})

//book
const bookSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    publishedDate:{
        type:String,
    },
    genres:{
        type:[String]
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Author"
    }
})

let Book = mongoose.model("Book",bookSchema)
let Author = mongoose.model("Author",authorSchema)

module.exports = {Book,Author}