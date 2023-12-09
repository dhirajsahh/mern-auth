import cloudinary from "cloudinary";
function isFileTypeSupported(type, supportedformat) {
  return supportedformat.includes(type);
}

export const uploadImage = async (profilePicture) => {
  try {
    const image = req.files.image;
    const supportedformat = ["jpeg", "jpg", "png"];
    const imageformat = image.name.split(".")[1].toLowerCase();
    console.log("image format", imageformat);
    if (!isFileTypeSupported(imageformat, supportedformat)) {
      console.log(imageformat);
      return {
        success: false,
        message: "image is not in supported format",
      };
    }
    const response = await uploadFileToCloudinary(image, "learning documents");

    console.log(response.secure_url);
    return response.secure_url;
  } catch (error) {
    console.log(`error occured in uploading image ${error}`);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
