import { useSelector, useDispatch } from "react-redux";
import { signout } from "../redux/user/userSlice";
export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.user);
  console.log(user);

  const handleLogout = () => {
    dispatch(signout());
    localStorage.removeItem("token");
  };
  return (
    <section className="bg-[#234795] h-[90vh] flex justify-center items-center">
      <div className="mx-auto lg:w-[30%] md:w-[70%] w-[95%] bg-[#1c140f] backdrop-blur-lg backdrop-filter rounded-2xl p-6 shadow-2xl">
        <h1 className=" text-3xl font-semibold text-gray-200 text-center my-7">
          Profile
        </h1>
        <form className="flex flex-col gap-4">
          <img
            src={user.profilePicture}
            className=" h-24 w-24 rounded-full self-center cursor-pointer object-cover"
            alt=""
          />

          <input
            type="text"
            id="username"
            name="username"
            className="rounded-lg p-3"
            value={user.username}
            placeholder="Username"
          />
          <input
            type="email"
            id="email"
            name="email"
            className="  rounded-lg p-3 "
            value={user.email}
            placeholder="Email"
          />
          <input
            type="password"
            id="password"
            name="password"
            className="rounded-lg p-3 "
            placeholder="Password"
          />

          <button className=" btn text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 shadow-md">
            Update
          </button>
        </form>

        <div className=" flex justify-between mt-5">
          <span className=" text-red-500 cursor-pointer">Delete Account</span>
          <span onClick={handleLogout} className=" text-red-500 cursor-pointer">
            Sign out
          </span>
        </div>
      </div>
    </section>
  );
}
