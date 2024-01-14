const mongoose = require('mongoose');

const connectDB=()=>{
    const uri="mongodb://localhost:27017/admin"
    mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) .then((data) => {
    console.log("connected...");
  })
  .catch((er) => {
    console.log("Errr, ", er);
  });
}
module.exports = connectDB;