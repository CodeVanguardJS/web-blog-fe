import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { AuthContext } from "../contexts/authContext";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };


  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger (Mobile Only) */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="text-orange-800 text-3xl">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-primary text-white p-4 z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:w-1/6 lg:h-screen flex flex-col justify-between`}
      >
        <div className="flex flex-col items-center w-full">
          {/* Profile Section */}
          <div className="mb-5 text-center">
            <img
              className="my-5 w-24 h-24 object-cover rounded-full mx-auto"
              src={user? user.photo_url : "https://via.placeholder.com/150"}
              alt="photo-profile"
            />
            <h2 className="text-white text-lg font-bold">{user? user.name : "jdasflakldjfla"}</h2>
          </div>

          {/* Navigation */}
          <nav className="w-full">
            <ul className="flex flex-col gap-3 w-full text-center">
              {[
                { path: "/profile", label: "Profile" },
                { path: "/dashboard", label: "Dashboard" },
                { path: "/articles/list", label: "Article" },
                { path: "/categories", label: "Categories" },
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="hover:bg-orange-800 w-full py-4 rounded-md"
                >
                  <Link
                    to={item.path}
                    className="text-white hover:text-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Logout */}
        <div className="w-full mt-6">
          <button onClick={handleLogout} className="w-full py-4 text-white hover:text-secondary bg-orange-700 rounded-md">
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default SideBar;
