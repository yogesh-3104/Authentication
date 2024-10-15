import jwt from 'jsonwebtoken'

export const generateToken=(id)=>{
    console.log(process.env.JWT_SECRET);
    const token=jwt.sign(id,process.env.JWT_SECRET,{expiresIn:'1h'});
    return token;
}

