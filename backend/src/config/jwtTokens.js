import { authUserModel } from "../models/authenticated.user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await authUserModel.findById(userId);
    const aToken = user.generateAccessToken();
    const rToken = user.generateRefreshToken();
    // console.log("token", aToken, rToken);
    

    user.refreshToken = rToken;
    await user.save({ validateBeforeSave: false });
    // console.log(user);
    
    return { aToken, rToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

export default generateAccessAndRefreshToken