import { Request } from "express"
import multer from "multer"
import path from "path"

export function Multer(
  type: "memoryStorage" | "diskStorage" = "memoryStorage",
  filePrefix?: string,
  folderName?: string
) {
  const defaultDir = path.join(__dirname, "../../public")
  const storage =
    type === "memoryStorage"
      ? multer.memoryStorage()
      : multer.diskStorage({
          destination: (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error | null, destination: string) => void
          ) => {
            const destination = folderName
              ? path.join(defaultDir, folderName)
              : defaultDir
            cb(null, destination)
          },
          filename: (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error | null, destination: string) => void
          ) => {
            const prefix = filePrefix || "file-"
            const originalNameParts = file.originalname.split(".")
            const fileExtension =
              originalNameParts[originalNameParts.length - 1]
            cb(
              null,
              prefix + originalNameParts[0] + Date.now() + "." + fileExtension
            )
          },
        })
  return multer({
    storage,
    limits: {
      fileSize: 1024 * 1024,
    },
  })
}
