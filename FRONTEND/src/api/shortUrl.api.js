import axiosInstance from '../utils/axiosinstance.js';

export const createShortUrl = async (url, customUrl) => {
  try {
    console.log('API call to /api/create with URL:', url)
    const data = await axiosInstance.post("/api/create", { url, customUrl })
    console.log('API response:', data)
    return data.data.shortUrl
  } catch (error) {
    console.error('API error:', error)
    throw error
  }
}

export const generateQRCode = async (url) => {
  try {
    const response = await axiosInstance.post("/api/qr", { url })
    return response.data.qr
  } catch (error) {
    console.error('QR generation error:', error)
    throw error
  }
}