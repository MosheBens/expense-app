import { deleteDoc ,  doc } from "firebase/firestore"
import { db } from "../config/firebase-config"

export const useRemoveTransaction = () => {

    const removeTransaction = async ({CurrentUidSpec}) => {
  
        console.log(CurrentUidSpec);
        await deleteDoc(doc(db, "transactions", CurrentUidSpec));        

    };


    return {removeTransaction};
};