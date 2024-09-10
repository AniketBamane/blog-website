import { Account, Client } from "appwrite";
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
      const user =  this.account.create(
        email,
        password,
        name,
        profileImage,
        bio  
      )
      if(user){
        return this.loginUser({email,password})
      }else{
        return {
          message:"couldn't create user !"
        }
      }
    }catch(err){
      return err
    }
   }
   async loginUser({email,password}){
    try{
      return await this.account.createEmailPasswordSession(email, password)
    }catch(err){
      return err
    }
   }
   
   async verifyEmail({email}){
    try{
      return await this.account.createVerification(email)
    }catch(err){
      return err
    }
   }

   async updateVerifyEmail({userId,secret}){
    try{
      return await this.account.updateVerification(userId, secret)
    }catch(err){
      return err
    }
   }

   async logout(){
    try{
      await this.account.deleteSessions()
      return {
        success:true
      }
    }catch(err){
      return {
        message:err.message,
        success:false
      }
   }
  }
}

const authService = new AuthService()

export default authService;