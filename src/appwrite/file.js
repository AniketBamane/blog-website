
import conf from "@/config/envConfig";
import { Client, Storage, ID } from "appwrite";

class FileService{
  client = new Client()
  storage;
  constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProject)
    this.storage = new Storage(this.client)
  }
  async uploadFile({image}){
    try{
      return await this.storage.createFile(conf.appwriteStorage,
        ID.unique(),
        image
      )
    }catch(err){
      throw err
    }
  }

   getFilePreview({fildId}){
    try{
      return this.storage.getFilePreview(conf.appwriteStorage, fildId)
    }catch(err){
      throw err
    }
  }
  async deleteFile({fildId}){
    try{
      return await this.storage.deleteFile(conf.appwriteStorage, fildId)
    }catch(err){
      throw err
    }
  }
}

const fileService = new FileService()

export default fileService