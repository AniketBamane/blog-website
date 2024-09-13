const conf = {
  appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
  appwriteDatabase:String(import.meta.env.VITE_APPWRITE_DATABASEID),
  appwriteProject:String(import.meta.env.VITE_APPWRITE_PROJECTID),
  appwriteStorage:String(import.meta.env.VITE_APPWRITE_STORAGEID),
  appwriteBlogsCollection:String(import.meta.env.VITE_APPWRITE_BLOGS_COLLECTIONID),
  appwriteUsersCollection:String(import.meta.env.VITE_APPWRITE_USERS_COLLECTIONID),
  appwriteQueriesColletion:String(import.meta.env.VITE_APPWRITE_QUERYIES_COLLECTIONID)
}

export default conf;