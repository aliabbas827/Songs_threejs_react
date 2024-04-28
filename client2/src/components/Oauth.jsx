import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user/userSlice";

export default function Oauth() {
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const handleGoogleSignin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await response.json();
      console.log(data);
      dispatch(signinSuccess(data.user));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      type="button"
      className="bg-red-700 w-full text-white p-3 rounded-lg disabled:opacity-80 uppercase hover:opacity-95 my-2"
      onClick={handleGoogleSignin}
    >
      Signup With Google
    </button>
  );
}
