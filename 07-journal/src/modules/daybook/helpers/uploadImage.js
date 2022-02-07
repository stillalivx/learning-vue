import axios from "axios";

const uploadImage = async (file) => {
  if (!file) return

  try { 
    const formData = new FormData()

    formData.append('upload_preset', 'df7wl9qt')
    formData.append('file', file)

    const url = 'https://api.cloudinary.com/v1_1/dqztcexf5/image/upload'
    const { data } = await axios.post(url, formData)

    console.log(data);

    return data.secure_url
  } catch(e) {
    console.log('Error al cargar la imagen, revisar logs')
    console.log(e);

    return null
  }
} 

export default uploadImage