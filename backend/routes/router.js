import express from "express";
import otp from "../models/otp.js";
import aadhars from "../models/aadhar.js";
import bcrypt from "bcryptjs";
import sendMail from "../controllers/sendMail.js";

const router = express.Router();


router.get("/test", (req, res)=>{
    res.json({msg: "Server is live"})
});

router.post("/sendotp", (req, res)=>{
    const {email, aadhar} = req.body;



    //Handlers

    const genOTP = ()=>{
        let OTP = "";
        OTP += Math.random();
        OTP = OTP.slice(OTP.length - 4, OTP.length);

        bcrypt.hash(OTP, 8, (e, hash)=>{
        if(e){
            return res.status(501).json({msg: "Something went wrong."});
        }
        if(hash){
            otp.create({otp: hash, user: aadhar});
            sendMail(email, OTP);
            return res.status(200).json({msg: "OTP Sent."});
        }
        }); 
    }


    const checkOldOtp = () =>{
        otp.findOne({user: aadhar}).then(doc =>{
            if(doc){
                otp.findOneAndDelete({user: aadhar})
                .then(doc =>{
                    genOTP();
                })
                .catch(err =>{
                    if(err){
                        return res.status(501).json({msg: "Something went wrong."});
                    }
                })
            }else{
                genOTP();
            }
        })



    }

    if(!email || !aadhar){
        res.status(401).json({
            msg: "Send Proper Email and Aadhar Number"
        });
    }else{

        checkOldOtp();

    }

})

router.post("/verifyotp", (req, res)=>{

    const {aadhar, OTP} = req.body;

    const compareOtp = () =>{

        otp.findOne({user: aadhar})
        .then(doc =>{
            if(doc){
                bcrypt.compare(OTP, doc.otp, (e, d)=>{
                    if(!e){
                        if(!d){
                            return res.status(501).json({msg: "Wrong OTP. Verification Failed."});
                        }else{
                            return res.status(200).json({verified: true, msg: "OTP Verified."});
                        }
                    }else{
                        return res.status(501).json({msg: "Invalid Information"});
                    }
                })

            }else{
                return res.status(401).json({
                    msg: "Otp expired."
                })
            }
        })
        .catch(err =>{
            if(err){
                return res.status(501).json({msg: "Something went wrong"})
            }
        })


    }


    if(!aadhar || !OTP){
        res.status(401).json({
            msg: "Send Proper Email and Aadhar Number"
        });
    }else{
        compareOtp()
    }
})

router.post("/aadhar", (req, res)=>{
    const {aadhar} = req.body;

    console.log(aadhar);

    if(!aadhar){
        return res.status(401).json({msg: "Provide AadharNo."});
    }else{
        aadhars.findOne({aadharNo: aadhar})
        .then(doc =>{
            console.log(doc);
            if(doc){
                return res.json(doc);
            }else{
                return res.status(404).json({msg: "Provide Valid Aadhar Number"});
            }
        })
        .catch(err =>{
            if(err){
                return res.status(501).json({msg: "Something Went Wrong"})
            }
        })
    }
})

router.post("/addaadhar", (req, res)=>{
    const {data} = req.body;
    
    aadhars.insertMany(data)
    .then(doc =>{
        return res.json({doc});
    })
    .catch(err =>{
        if(err){
            return res.status(501).json({err});
        }
    });
})

export default router;