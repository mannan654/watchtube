import { v2 as cloudinary } from "cloudinary";
import  fs from "fs";
import { ApiError } from "./ApiErrors.js"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    console.log("Function called");
    try {
        if(!localFilePath) throw new ApiError({
            statusCode: 400,
            message: "localfile path not found"})

          const response = await cloudinary.uploader.upload(localFilePath,{
              resource_type: "auto"
            })
            //console.log("File uploaded on cloudinary", response);
           fs.unlinkSync(localFilePath)
           return response 
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved temporary file as 
        // the upload operation got failed
        throw new ApiError ({
          statusCode: 500,
          message: "Cloudinary Upload Error"
        })
    }
}

export { uploadOnCloudinary }
