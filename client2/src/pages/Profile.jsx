import { useSelector } from "react-redux";
export default function Profile() {
  const user = useSelector((state) => state.user.user.user);
  console.log(user);
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7">Profile</h1>
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
          className=" bg-slate-100 rounded-lg p-3 "
          value={user.username}
          placeholder="Username"
        />
        <input
          type="email"
          id="email"
          name="email"
          className=" bg-slate-100 rounded-lg p-3 "
          value={user.email}
          placeholder="Username"
        />
        <input
          type="password"
          id="password"
          name="password"
          className=" bg-slate-100 rounded-lg p-3 "
          placeholder="Password"
        />

        <button className=" bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>

      <div className=" flex justify-between mt-5">
        <span className=" text-red-500 cursor-pointer">Delete Account</span>
        <span className=" text-red-500 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
