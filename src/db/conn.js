const mongoose=require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/").then(() => {
    console.log('db connection successfull')
}).catch((err) => {
    console.log(err)
});