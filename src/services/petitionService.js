import { db } from '../firebase/firebase';
import { query, where, setDoc, getDocs, getDoc, collection, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { storage } from '../firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { generateRandomId } from './helpers';


const petitionCollectionRef = collection(db, "petitions",);



export const getAll = async () => {
    try {
        const data = await getDocs(petitionCollectionRef)
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            _id: doc.id
        }))
        return filteredData;
    } catch (error) {
        console.error(error);
    }
};


export const getOne = async (petitionId) => {
    try {
        console.log("ID", petitionId);
        const petitionDoc = doc(petitionCollectionRef, petitionId);
        const petitionSnap = await getDoc(petitionDoc);
        const petitionWithId = {
            ...petitionSnap.data(),
            _id: petitionSnap.id
        }
        return petitionWithId
    } catch (error) {
        console.error(error);
    }
};

export const uploadPetitionImage = async (petitionImage) => {
    if (!petitionImage) {
        // Get download URL of default image file
        const defaultImageRef = ref(storage, 'default-petition-photo.jpg');
        const downloadURL = await getDownloadURL(defaultImageRef);
        console.log("download URL:", downloadURL);
        return downloadURL;
    }
    // Check if input is an image file
    if (!petitionImage.type.startsWith('image/')) {
        throw new Error('Selected file is not an image');
    }
    // Upload image file
    const userPetitionImagesRef = ref(storage, `user-petition-images/${generateRandomId(4) + petitionImage.name}`);
    const imageUpload = await uploadBytes(userPetitionImagesRef, petitionImage);
    return await getDownloadURL(imageUpload.ref);
};


export const createPetition = async (petitionData) => {

    console.log(petitionData.petitionImage);
    try {
        //providing my own timestamp, because working with the one generated from Firebase is awkward
        const timestamp = new Date(Date.now());
        const petitionImageUrl = await uploadPetitionImage(petitionData.petitionImage);
        console.log("petitionImageUrl", petitionImageUrl);

        //petitionImage is file object not accepted by firestore, so I use petition data without it,
        // and pass its value later from the resolved firestore url
        const { petitionImage, ...petitionDataWithoutImage } = petitionData;

        await setDoc(doc(db, "petitions", petitionData._id), {
            ...petitionDataWithoutImage,
            image: petitionImageUrl,
            createdAt: timestamp.toString(),
            splittedTitle: petitionData.title.toLowerCase().split(" "),
        });
        //TODO Add default image or await the setDoc response  for the image
        const petition = {
            ...petitionDataWithoutImage,
            image: petitionImageUrl,
            createdAt: timestamp.toString(),
        };
        console.log(petition);

        return petition;
    } catch (error) {
        console.error(error);
    }
};

export const deletePetition = async (petitionId) => {
    try {
        const petitionDoc = doc(petitionCollectionRef, petitionId);
        return await deleteDoc(petitionDoc);
    } catch (error) {
        console.error(error);
    }
};

export const editPetition = async (petitionId, petitionData) => {
    try {
        const petitionDoc = doc(petitionCollectionRef, petitionId);
        return await updateDoc(petitionDoc, petitionData);
    } catch (error) {
        console.error(error);
    }
};


export const searchPetitions = async (searchQuery) => {
    const q = query(
      collection(db, "petitions"),
      where("splittedTitle", "array-contains", searchQuery.toLowerCase()),
   
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

