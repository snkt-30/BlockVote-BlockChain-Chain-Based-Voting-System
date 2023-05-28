import mongoose from "mongoose";


const otpSchema = new mongoose.Schema({
    user: {type: Number, required: true},
    otp: {type: String, required: true},
    createdAt: { type: Date, expires: '5m', default: Date.now}
});

const otp = new mongoose.model("otp", otpSchema);


export default otp;