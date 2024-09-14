
import conf from "@/config/envConfig";
import { Client, Databases, ID } from "appwrite";

class UserService {
  client = new Client();
  databases;
  constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProject)
    this.databases = new Databases(this.client)
  }
  async getAllBlogs({queries=[],collectionId}){
    try{
      return await this.databases.listDocuments(
        conf.appwriteDatabase, // databaseId
        collectionId, // collectionId
        queries 
    );
    }catch(err){
      console.log(err)
      throw err
    } 
  }
  // contact us 
  async uploadContact({name,email,message}){
    try{
      return await  this.databases.createDocument(
        conf.appwriteDatabase,
        conf.appwriteQueriesColletion,
        ID.unique(),
        {
          name,
          email,
          message
        }
      )
    }catch(err){
      throw err
    }
  }
  async getSearchedDocuments({queries=[]}){
    try{
      return await this.databases.listDocuments(
        conf.appwriteDatabase,
        conf.appwriteBlogsCollection,
        queries
      )
    }catch(err){
      throw err
    }
  }

  async createBlogDocument({title,content,image,status,author}){
    try{
      const document =  await this.databases.createDocument(
        conf.appwriteDatabase,
        conf.appwriteBlogsCollection,
        ID.unique(),
        {
          title,
          content,
          image,
          status,
          author,
          createdAt: Math.floor(Date.now() / 1000)
        }
      )
      console.log(document , " is created document")
      console.log("1")
      const user =  await this.getProfile(author)
      // console.log("2")
      // const updatedUser = {...user, blogs:[...user.blogs,document.$id]}
      // console.log(user," is current user ")
      // console.log(updatedUser," is updated user ")
      // console.log("3")
      // console.log(user.$id,updatedUser.$id)
      const newUser = await this.updateProfile(user.$id,{
        blogs:[...user.blogs,document.$id]
      })
      console.log(newUser," is new user ")
      console.log("4")
      return document
    }catch(err){
      throw err
    }
  }
  async getBlogDocument({fileid}){
    try{
      return await this.databases.getDocument(
        conf.appwriteDatabase,
        conf.appwriteBlogsCollection,
      fileid
      )

    }catch(err){
      throw err
    }
  }

  async createProfile({name,email,password}){
    try{
      return await  this.databases.createDocument(
        conf.appwriteDatabase,
        conf.appwriteUsersCollection,
        ID.unique(),
        {
          name,
          email,
          password
        }
      )
    }catch(err){
      throw err
    }
  }

  async updateProfile(documentId,data){
    console.log(conf)
    console.log(documentId,data)
    try{
      return await this.databases.updateDocument(
        conf.appwriteDatabase,
        conf.appwriteUsersCollection,
        documentId,
        data
      )
    }catch(err){
      console.log(err)
      throw err
    }
  }
  async getProfile(id){
    try{
      return await this.databases.getDocument(
        conf.appwriteDatabase, // databaseId
        conf.appwriteUsersCollection, // collectionId
        id, // documentId
    );
    }catch(err){
      throw err
    }
  }

  async addToFavourite({userId,documentId}){
    try{
      const currentUser = await this.getProfile(userId)
      console.log(currentUser)
      if(currentUser.favourites.includes(documentId)){
         currentUser.favourites.filter(fav=> fav.$id != documentId)
      }else{
        currentUser.favourites.push(documentId)
      }
      return await this.updateProfile(currentUser.$id,{
        favourites: currentUser.favourites
      })
    }catch(err){
      throw err
    }
  }

}

const userService = new UserService()

export default userService