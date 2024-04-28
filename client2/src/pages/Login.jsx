import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  signinStart,
  signinSuccess,
  signinFail,
} from "../redux/user/userSlice";

import { useDispatch } from "react-redux";
import Oauth from "../components/Oauth";
export default function Signup() {
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.user.loading);
  const error = useSelector((state) => state.user.user.error);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(signinStart());
    console.log(formData);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(
          signinFail({
            error: data.message,
          })
        );
      } else {
        navigate("/");
        console.log(data);
        dispatch(
          signinSuccess(
            {
              user: data.user,
            },
            signinSuccess
          )
        );
      }
    } catch (error) {
      console.log("error", error);
      dispatch(
        signinFail({
          error: error.message,
        })
      );
    }
  };
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignIn</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-4 items-center"
      >
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
          {loading ? "Loading" : "Sign In"}
        </button>
        <Oauth />

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg my-2">
            {error.error}
          </div>
        )}
      </form>
      <div className=" ">
        <Link
          to="/signup"
          className=" flex  gap-2 mt-5 items-center text-center "
        >
          <p className=" p-0 m-0">Don&apos;t have a an account?</p>
          <span className="text-blue-500 p-0 m-0">Signup</span>
        </Link>
      </div>
    </div>
  );
}
