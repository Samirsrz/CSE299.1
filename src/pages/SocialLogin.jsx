import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
const SocialLogin = () => {
    const {signInWithGoogle} = useContext(AuthContext);
    const navigate = useNavigate();
    const from = location?.state || '/' ;

    const handleGoogle = async() => {
 
            await signInWithGoogle()
            navigate(from)
          
         
    }


    return (
        <div className='p-4 space-y-3 mb-6'>
        <h2 className="text-center font-bold"> or </h2>
   <button onClick={handleGoogle} className="btn btn-outline w-full"><FaGoogle></FaGoogle> Login with Google </button>
  

    </div>
    );
};

export default SocialLogin;