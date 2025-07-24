import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-primary text-white shadow-lg fixed top-0 left-0 right-0 z-30 px-4">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost text-2xl font-semibold hover:bg-secondary hover:text-backgrounddark"
          >
            Whisk
            <span className="text-secondary hover:text-primary">Takers.</span>
          </Link>
        </div>

        {/* Hamburger (mobile only) */}
        <div className="md:hidden z-40">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-ghost text-white"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-none">
          <ul className="menu menu-horizontal px-2 text-md font-bold flex items-center gap-4">
            <li>
              <Link
                to="/"
                className="hover:bg-secondary rounded-lg px-4 py-2 hover:text-backgrounddark"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:bg-secondary rounded-lg px-4 py-2 hover:text-backgrounddark"
              >
                About
              </Link>
            </li>

            {user ? (
              <li className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.photo_url || "https://placehold.co/400x400"}
                    alt="profile"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content mt-3 z-[1] p-2 shadow text-black rounded-box w-52 bg-white"
                >
                  <li>
                    <Link to="/dashboard" className="hover:bg-secondary rounded-lg px-4 py-2">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="hover:bg-secondary rounded-lg px-4 py-2">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="hover:bg-secondary rounded-lg px-4 py-2 w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="hover:bg-secondary rounded-lg px-4 py-2 hover:text-backgrounddark"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Slide Down */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-primary text-white shadow-md transition-transform duration-300 ease-in-out z-20 ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ul className="flex flex-col items-start p-4 gap-2 font-semibold">
          <li>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              </li>
              <li>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            </li>
          )}
        </ul>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
