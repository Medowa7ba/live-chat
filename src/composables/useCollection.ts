import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

// declare the connection & refs inside the function
// because the collection state is not global (like a user)
// different collections may be used at once this way

const useCollection = (collection:string) => {

  const error = ref<any|null>(null)

  const addDoc = async (doc:[]) => {
    error.value = null

    try {
      await projectFirestore.collection(collection).add(doc)
    }
    catch(err:any) {
      console.log(err.message)
      error.value = 'could not send the message'
    }
  }

  return { error, addDoc }

}

export default useCollection