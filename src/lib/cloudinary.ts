type CloudinaryUploadResponse = {
  secure_url?: string
  error?: {
    message?: string
  }
}

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
const uploadFolder = import.meta.env.VITE_CLOUDINARY_FOLDER

export const uploadProfileAvatar = async (file: File, userId: string) => {
  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary env belum lengkap. Isi VITE_CLOUDINARY_CLOUD_NAME dan VITE_CLOUDINARY_UPLOAD_PRESET.')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  formData.append('context', `user_id=${userId}`)

  if (uploadFolder) {
    formData.append('folder', uploadFolder)
  }

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  const data = (await response.json()) as CloudinaryUploadResponse

  if (!response.ok || !data.secure_url) {
    const message = data.error?.message ?? 'Upload foto ke Cloudinary gagal.'

    if (message.toLowerCase().includes('upload preset not found')) {
      throw new Error(
        `Upload preset Cloudinary "${uploadPreset}" tidak ditemukan atau belum unsigned di cloud "${cloudName}".`,
      )
    }

    throw new Error(message)
  }

  return data.secure_url
}
