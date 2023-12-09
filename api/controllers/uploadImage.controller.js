import cloudinary from "cloudinary";
function isFileTypeSupported(type, supportedformat) {
  return supportedformat.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
export const uploadImage = async (req, res) => {
  try {
    const image = req.files.image;
    const supportedformat = ["jpeg", "jpg", "png"];
    const imageformat = image.name.split(".")[1].toLowerCase();
    console.log("image format", imageformat);
    if (!isFileTypeSupported(imageformat, supportedformat)) {
      console.log(imageformat);
      return res.status(400).json({
        success: false,
        message: "image is not in supported format",
      });
    }
    const response = await uploadFileToCloudinary(image, "learning documents");
    console.log(response.secure_url);

    res.json({
      success: true,
      message: "Image uploaded succesfully",
      image: response.secure_url,
    });
  } catch (error) {
    console.log(`error occured in uploading image ${error}`);
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};
