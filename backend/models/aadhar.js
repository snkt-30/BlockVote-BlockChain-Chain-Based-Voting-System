import mongoose from "mongoose";



const aadharSchema = new mongoose.Schema({
    name: {type: String, required: true},
    aadharNo: {type: Number, required: true, unique: true},
    email: {type: String, required: true},
    age: {type: Number, required: true},
    gender: {type: String, required: true}
});

const aadhar = new mongoose.model("aadhar", aadharSchema);


export default aadhar;