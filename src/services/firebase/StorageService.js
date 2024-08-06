// import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

// class StorageService {
//     uploadFile = async (file, folder = "uploads/") => {
//       const folderRef = ref(FBStorage, folder + file.name);
//       const uploadTask = await uploadBytes(folderRef, file);
//       const downloadUrl = await getDownloadURL(uploadTask.ref);
//       return downloadUrl;
//     };
//     uploadFiles = async (files, folder = "uploads/") => {
//       const downloadUrls = [];
//       for (let file of files) {
//         console.log("file", file)
//         const folderRef = ref(FBStorage, folder + file.name);
//         const uploadTask = await uploadBytes(folderRef, file);
//         const downloadUrl = await getDownloadURL(uploadTask.ref);
//         downloadUrls.push(downloadUrl);
//       }
//       return downloadUrls;
//     };
//   }
//   export const FBStorageService = new StorageService();
  