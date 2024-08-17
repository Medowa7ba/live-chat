
import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

// refs & signup outside of exported function
// they don't need to be re-created every time we invoke useSignup
const error = ref(null);

const signup = async (email:string, password:string, displayName: string) => {
  error.value = null
  console.log(projectAuth.createUserWithEmailAndPassword(email, password));

  try {
    const res:any = await projectAuth.createUserWithEmailAndPassword(email, password)
    
    if (!res) {
      throw new Error('Could not complete signup')
    }
    await res.user.updateProfile({ displayName })
    error.value = null
    
    return res
  }
  catch(err:any) {
    console.log(err.message)
    error.value = err.message;
  }
}

const useSignup = () => {
  return { error, signup }
}

export default useSignup
