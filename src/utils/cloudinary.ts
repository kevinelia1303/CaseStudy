import { v2 as cloudinary, UploadApiResponse } from "cloudinary"
import * as streamifier from "streamifier"

import { CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET } from "../config"
import { error } from "console"
import { resolve } from "path"
import { rejects } from "assert"

cloudinary.config({
  api_key: CLOUDINARY_KEY || "",
  api_secret: CLOUDINARY_SECRET || "",
  cloud_name: CLOUDINARY_NAME || "",
})

function extractPublicIdFromUrl(url: string) {
  try {
    const urlParts = url.split("/")
    const publicIdWithExtensions = urlParts[urlParts.length - 1]
    const publicId = publicIdWithExtensions.split(".")[0]

    return publicId
  } catch (error) {
    throw error
  }
}

export async function cloudinaryRemove(secure_url: string) {
  try {
    const publicId = extractPublicIdFromUrl(secure_url)
    return await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    throw error
  }
}

export async function cloudinaryUpload(
  file: Express.Multer.File
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      (err, res: UploadApiResponse) => {
        if (err) return reject(err)

        resolve(res)
      }
    )
    streamifier.createReadStream(file.buffer).pipe(uploadStream)
  })
}
