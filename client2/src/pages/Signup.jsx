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
    <>
      <section className="bg-[#234795] h-[90vh] flex justify-center items-center">
        <div className="mx-auto lg:w-[30%] md:w-[70%] w-[95%] bg-[#1c140f] backdrop-blur-lg backdrop-filter rounded-2xl p-6 shadow-2xl">
          <h1 className="text-3xl font-semibold text-gray-200 text-center my-7">Signup</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="w-full p-3 rounded-lg my-2"
              onChange={handleChange}
            />
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
            <button className="btn text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 shadow-md my-2 w-full">
              {loading ? "Loading" : "Signup"}
            </button>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg my-2">
                {error ? error.message : "Something went wrong"}
              </div>
            )}
          </form>
          <div className=" ">
            <Link
              to="/signin"
              className=" flex  gap-2 mt-5 items-center text-center text-white"
            >
              <p className=" p-0 m-0">Have an account?</p>
              <span className="p-0 m-0 text-orange-400">Sign in</span>
            </Link>
          </div>
        </div>
      </section>

    </>

  );
}
