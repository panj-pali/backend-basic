import {asyncHandler} from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import  uploadOnCloudinary from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const register =asyncHandler(async(req, res)=>{

  //get user detaile from frontend
  //Validation
  //check if user already exist:username email
  //files hai ki nahi avart hai ki nahi 
  //uplode cloudniary,avtar hai ki nahi
  //create object user
  //remove password and refresh token filed
  //check for user creation
  //return respond
    console.log("1. Register controller started");
      // 1. Get user details from frontend
    const { username, email, fullname, password } = req.body;
     
    console.log("2. BODY:", req.body);
    console.log("3. FILES:", req.files);

      //2.Validation

  if (
    [username, email, fullname, password].some((field) => {
        return field?.trim() === "";
    })
) {
    throw new ApiError(400, "All fields are required");
}


 //check if user already exist:username email
const existedUser = await User.findOne({
    $or: [{ username }, { email }]
});

if (existedUser) {
    throw new ApiError(409, "User already exists");
}

//files hai ki nahi avart hai ki nahi 

const avatarLocalPath = req.files?.avatar?.[0]?.path;
const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

if(! avatarLocalPath ){
  throw new ApiError(400,"Avatar file is requird")
}


// files ko Cloudinary par upload karo
 const avatar = await uploadOnCloudinary(avatarLocalPath);
   const coverImage = coverImageLocalPath
        ? await uploadOnCloudinary(coverImageLocalPath)
        : null;

// Avatar upload fail
if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
}


//create object user
const user = await User.create({
    username,
    email,
    fullname,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || ""
});

const createdUser = await User.findById(user._id)
    .select("-password -refreshToken");

 //check for user creation
 if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
}

return res.status(201).json(
    new ApiResponse(
        201,
        "User registered successfully",
        createdUser
    )
);


})


export { register };