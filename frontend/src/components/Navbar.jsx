import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("newuser"));
    if (userData) {
      setUser(userData.name);
    }
  }, []);
  const handleLogout = () => {
    setloading(true);
    localStorage.removeItem("newuser");
    setUser(null);
    setTimeout(() => {
      window.location.href = "/login";
      setloading(false);
    }, 2000);
  };

  console.log(user);
  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          <div className="navbar bg-green-100">
            <div className="flex-1">
              <Link to="/" className="btn btn-ghost text-xl">
                <i className="fa-solid fa-hotel" style={{ color: "red" }}></i>
                HOTEL <span className="font-bold text-blue-700">DELIGHT</span>
              </Link>
            </div>
            <div>
              <nav className="md:ml-auto flex flex-wrap items-center text-blue-700 font-semibold justify-center">
                <Link to={"/"} className="mr-5 hover:text-gray-900">
                  Home
                </Link>
                {/* <Link to={"/booking"} className="mr-5 hover:text-gray-900">
                  Bookings
                </Link> */}
                <Link to={"/aboutus"} className="mr-5 hover:text-gray-900">
                  About Us
                </Link>
                <Link to={"/contacts"} className="mr-5 hover:text-gray-900">
                  Contacts
                </Link>
                <Link to={"/showrooms"} className="mr-5 hover:text-gray-900">
                  ShowRooms
                </Link>
              </nav>
            </div>

            {/* user loGGED IN */}
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to={"/profile"} className="justify-between">{user}</Link>
                  </li>
                  <li>
                    <Link>Settings</Link>
                  </li>
                  <li>
                    <Link onClick={handleLogout}>Logout</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex-none gap-2">
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-24 md:w-auto"
                  />
                </div>
                <div>
                  <button
                    className="btn btn-primary text-white text-lg"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
