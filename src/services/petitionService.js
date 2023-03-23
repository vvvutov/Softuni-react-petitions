import { request } from './requester';
import { db } from '../firebase/firebase';
import { addDoc, getDocs, getDoc, collection, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const petitionCollectionRef = collection(db, "petitions");

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

export const create = async (petitionData) => {
    try {
        return await addDoc(petitionCollectionRef, petitionData)
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

export const edit = async (petitionId, petitionData) => {
    try {
        const petitionDoc = doc(petitionCollectionRef, petitionId);
        return await updateDoc(petitionDoc, petitionData);
    } catch (error) {
        console.error(error);
    }
};
