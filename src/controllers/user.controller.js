const db = require("../models");

const { user : User } = db;


exports.signin = async (req, res) => {
    const { id, password } = req.body

    await User.findOne({ id })
        .then(result =>{
            if(!result){
                return res.json({message : "InvaildID"})
            }
            if(result.password !== password){
                return res.json({message : "InvaildPassword"})
            }
            return res.status(200).json(result)     
        })
        .catch((err)=>{
            res.json(err)
        })
}

