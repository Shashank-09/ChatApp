import User from '../models/user.model.js'
import bcrypt from "bcryptjs"
import  createTokenAndSaveCookie from '../jwt/generate.token.js'
import cloudinary from '../lib/cloudinaryConfig.js'


export const SignUp = async (req , res) => {
  try {
    const {name , email , password , role ,profilePicture } = req.body
    const user = await User.findOne({email})
    if(user){
     return res.status(400).json({message : "Email already exisit"})
    }
    
    const hashPassword = await bcrypt.hash(password, 10);

    let imageUrl = ''

    if(profilePicture){
      const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
        folder : 'user-profile-pictures',
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
      })
      imageUrl = uploadResponse.secure_url
    }



    const newUser = await new User({
     name,
     email,
     password : hashPassword,
     role,
     profilePicture : imageUrl
    })

    await newUser.save();
    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          profilePicture: newUser.profilePicture
        },
      });
    }
  } catch (error) {
    res.status(400).json({
        message: 'Error adding User',
        error: error.message,
      });
  }
}

export const login = async (req , res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid user credential" });
    }
    createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }

}


export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
  }
};
