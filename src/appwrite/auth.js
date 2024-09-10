import { Account, Client, ID } from "appwrite";
import conf from "../config/envConfig";

class AuthService {
   client = new Client();
   account;
   constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProject)
    this.account = new Account(this.client)
   }

   async getCurrentUser(){
    try{
      return this.account.get()
    }catch(err){
      return err
    }
   }
   async createUser({email,password,name,profileImage,bio}){
    try{
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      )
      if(user){
        return this.loginUser({email:email,password:password})
      }else{
        throw new Error({
          message:"couldn't create user !"
        })
      }
    }catch(err){
      throw err
    }
   }
   async loginUser({email,password}){
    try{
      return await this.account.createEmailPasswordSession(email, password)
    }catch(err){
      console.log(err.message)
      throw err
    }
   }
   
   async verifyEmail(){
    try{
      return await this.account.createVerification('http://localhost:5173/verification')
    }catch(err){
      throw err
    }
   }

   async updateVerification({userId,secret}){
    try{
      return await this.account.updateVerification(userId, secret)
    }catch(err){
      throw err
    }
   }

   async logout(){
    try{
     return  await this.account.deleteSessions()

    }catch(err){
     throw err
   }
  }
}

const authService = new AuthService()

export default authService;