const Navbar = () => {
  return (
    <div className="navbar bg-primary text-white shadow-lg fixed">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-semibold hover:text-black">Food Blog</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className="hover:bg-secondary rounded-lg px-4 py-2 hover:text-black">Home</a>
          </li>
          <li>
            <a
              className="hover:bg-secondary rounded-lg px-4 py-2 hover:text-black"
              href="/about"
            >
              About
            </a>
          </li>
          <li>
            <a
              className="hover:bg-secondary rounded-lg px-4 py-2 hover:text-black"
              href="/login"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
