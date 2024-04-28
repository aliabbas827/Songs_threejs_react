import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinStart, signinFail } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../components/Oauth";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const loading = useSelector((state) => state.user.userloading);
  const error = useSelector((state) => state.user.user.error);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signinStart());
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signinFail(data.message));
      } else {
        navigate("/signin");

        console.log(data);
      }
    } catch (error) {
      dispatch(signinFail(error.message));
      console.log("error", error);
    }
  };
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-4 items-center"
      >
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border w-full bg-slate-100 border-gray-400 p-3 rounded-lg my-2"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="border w-full bg-slate-100 border-gray-400 p-3 rounded-lg my-2"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border w-full bg-slate-100 border-gray-400 p-3 rounded-lg my-2"
          onChange={handleChange}
        />
        <button className="bg-slate-700 w-full text-white p-3 rounded-lg disabled:opacity-80 uppercase hover:opacity-95 my-2">
          {loading ? "Loading" : "Signup"}
        </button>
        <Oauth />

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg my-2">
            {error ? error.message : "Something went wrong"}
          </div>
        )}
      </form>
      <div className=" ">
        <Link
          to="/signin"
          className=" flex  gap-2 mt-5 items-center text-center "
        >
          <p className=" p-0 m-0">Have an account?</p>
          <span className="text-blue-500 p-0 m-0">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
