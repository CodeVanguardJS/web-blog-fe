import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="navbar bg-primary text-white shadow-lg fixed top-0 left-0 right-0 z-10">
      <div className="flex-1">
        {/* Logo */}
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-semibold hover:bg-secondary hover:text-backgrounddark"
        >
          Whisk <span className="text-secondary hover:text-primary">Takers.</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-none">
        <ul className="menu menu-horizontal px-2 text-md font-bold">
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
          <li>
            <Link
              to="/login"
              className="hover:bg-secondary rounded-lg px-4 py-2 hover:text-backgrounddark"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>

      {/* Burger Menu Button */}
      <button
        className="md:hidden btn btn-ghost"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary text-white w-full absolute top-full left-0 z-20 shadow-lg">
          <ul className="menu menu-vertical p-4 text-md font-bold space-y-2">
            <li>
              <Link
                to="/"
                className="hover:bg-secondary rounded-lg px-4 py-2 hover:text-backgrounddark"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:bg-secondary rounded-lg px-4 py-2 hover:text-backgrounddark"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:bg-secondary rounded-lg px-4 py-2 hover:text-backgrounddark"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
