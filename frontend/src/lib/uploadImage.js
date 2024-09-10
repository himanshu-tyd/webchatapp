const cloud_name = import.meta.env.VITE_CLOUD_NAME;
const cloud_preset_name = import.meta.env.VITE_UPLOAD_PRESET_NAME;


//FUNCTION THAT TAKE FILE NAME AND UPLOAD IT TO CLOUDINARY
const uploadImage = async (file) => {

  try {
    const uploadData = new FormData();

    uploadData.append("file", file);
    uploadData.append("cloud_name", cloud_name);
    uploadData.append("upload_preset", cloud_preset_name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload `,
      {
        method: "POST",
        body: uploadData,
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  } 
};

export default uploadImage;
