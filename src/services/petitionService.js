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

export const getOne = async (petitionId) => {
    try {
        console.log("ID", petitionId);
        const petitionDoc = doc(petitionCollectionRef, petitionId);
        const docSnap = await getDoc(petitionDoc);
        return docSnap.data()
    } catch (error) {
        console.error(error);
    }
};






// const baseUrl = 'http://localhost:3030';

// export const getAll = async () => {
//     return await request(`${baseUrl}/data/petitions`);
// }

// export const getOne = async (petitionID) => {
//     return await request(`${baseUrl}/data/petitions/${petitionID}`, 'GET', petitionID);
// }

// export const create = async (petitionData) => {
//     return await request(`${baseUrl}/data/petitions`, 'POST', petitionData);
// }


// export const edit = async (petitionID, petitionData) => {
//     return await request(`${baseUrl}/data/petitions/${petitionID}`, 'PUT', petitionData);
// }

// export const deletePetition = async (petitionID) => {
//     return await request(`${baseUrl}/data/petitions/${petitionID}`, 'DELETE');
// }

