import path from 'path'
import fs from 'fs'
import { v4 as uuid } from 'uuid'

class fileService {
  saveFile(file) {
    try {
      const fileName = uuid() + '.jpg'
      const filePath = path.resolve('images', fileName)
      file.mv(filePath)
      return fileName
    } catch (error) {
      console.log(error)
    }
  }
  changeFile(file, fileToDelete) {
    try {
      if (fileToDelete) {
        const file = path.resolve('images', fileToDelete)
        fs.unlink(file, (e) => console.log('errors: ', e))
      }
      const fileName = uuid() + '.jpg'
      const filePath = path.resolve('images', fileName)
      file.mv(filePath)
      return fileName
    } catch (error) {
      console.log(error)
    }
  }
  deleteFile(fileName) {
    try {
      const file = path.resolve('images', fileName)
      fs.unlink(file, (e) => console.log('errors: ', e))
    } catch (error) {
      console.log(error)
    }
  }
}

export default new fileService()
