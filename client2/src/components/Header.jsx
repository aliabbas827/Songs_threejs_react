import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.user.user.user);
  console.log(user);
  return (
    <div className="bg-[#234795] text-white shadow-2xl">
      <div className="flex justify-between items-center h-[10vh] p-3">
        <h1 className=" font-bold">Auth App</h1>
        <ul className="flex gap-4">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            {user ? (
              <Link to={"/profile"}>
                <img
                  src={user.profilePicture}
                  className=" h-7 w-7 object-cover rounded-full"
                  alt=""
                />
              </Link>
            ) : (
              <Link to={"/signin"}>Sign In</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
