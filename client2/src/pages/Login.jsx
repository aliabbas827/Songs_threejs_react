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
    <section className="bg-[#234795] h-[90vh] flex justify-center items-center">
    <div className="mx-auto lg:w-[30%] md:w-[70%] w-[95%] bg-[#1c140f] backdrop-blur-lg backdrop-filter rounded-2xl p-6 shadow-2xl">
      <h1 className=" text-3xl font-semibold text-gray-200 text-center my-7">SignIn</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-4 items-center"
      >
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg my-2"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg my-2"
          onChange={handleChange}
        />
        <button className=" btn text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 shadow-md my-2 w-full">
          {loading ? "Loading" : "Sign In"}
        </button>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg my-2">
            {error.error}
          </div>
        )}
      </form>
      <div className=" ">
        <Link
          to="/signup"
          className=" flex text-white gap-2 mt-5 items-center text-center "
        >
          <p className=" p-0 m-0">Don&apos;t have a an account?</p>
          <span className="p-0 m-0 text-orange-400">Signup</span>
        </Link>
      </div>
    </div>
    </section>
  );
}
