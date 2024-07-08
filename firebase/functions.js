// Import the functions you need from the SDKs you need
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

import { userCollection } from '@/constants/Firebase.constants';

import { auth, db, storage } from './config';

async function createNewUser(email, password) {
  const currentUser = await auth.currentUser;
  const newUser = await createUserWithEmailAndPassword(auth, email, password);
  await auth.updateCurrentUser(currentUser);
  return newUser;
}

async function updateUserDetails(uid, updatedUserDetails) {
  const userDoc = doc(db, userCollection, uid);
  return updateDoc(userDoc, updatedUserDetails);
}

async function uploadImageToStorage(uid, image) {
  if (image == null) return;

  console.log('processing and uploading image');

  const imageRef = ref(storage, `user/${uid}/profilePicture`);
  const imageListRef = ref(storage, `user/${uid}`);

  const uploadedToStorage = await uploadBytes(imageRef, image);

  if (uploadedToStorage) {
    console.log('Successfully uploaded profile picture to storage');
    console.log('Obtaining picture url');

    listAll(imageListRef).then(async (response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then(async (url) => {
          const downloadedUrl = url;
          try {
            const userDoc = doc(db, userCollection, uid);
            updateDoc(userDoc, { profile_picture: downloadedUrl });
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  }
}

export {
  createNewUser,
  updateUserDetails,
  uploadImageToStorage,
};