const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel.js')

// auth Middleware
const userAuth = (req, res, next)=>{
    const hasAuthorization = req.headers.authorization;
    if(!hasAuthorization) {
        res.status(403).json({
            message: 'No Authorization Found'
        });
    } else {
        const token = hasAuthorization.split(' ')[1];
        try {
            console.log(req.headers)
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = JSON.stringify(decodedToken);
            req.userId = decodedToken.userId;
            req.userEmail = decodedToken.email;
            req.username = decodedToken.username;
            next()
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
};

const authenticator = async(req,res,next)=>{
    const newUser = await userModel.findById(req.params.id);
    const token = newUser.token;
    await jwt.verify(token. process.env.JWT_TOKEN, (error,paylode)=>{
        if(error){
            res.status(403).json({
                message:"Invalid Token"
            })
        }else{
            req.newUser = paylode;
            next()
        }
    })
}

const isAdmin = async (req, res, next) => {
    authenticator(req, res, async ()=>{
        const {id} = req.params;
        const existingUser = await userModel.findById(id)
        if(existingUser.isAdmin == false){
            res.status(403).json({
                message:'You do not have permission to access this resource'
            })
        }else{
            next()
        }
    })
  };
  
  const isSuperAdmin = async (req, res, next) => {
    authenticator(req, res, async ()=>{
        const {id} = req.params;
        const existingUser = await userModel.findById(id)
        if(existingUser.isSuperAdmin == false){
            res.status(403).json({
                message:'You do not have permission to access this resource'
            })
        }else{
            next()
        }
    })
  };



module.exports = {
    userAuth,
    isAdmin,
    isSuperAdmin
}