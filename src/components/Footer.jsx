import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"; // Import Link dari react-router-dom

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Subscribed!",
      text: `You've subscribed with: ${email}`,
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });

    setEmail("");
  };

  return (
    <div>
      <footer className="footer bg-backgrounddark text-white p-10 justify-between">
        <nav>
          <h6 className="footer-title">Wisk Takers</h6>
          <Link to="/about" className="link link-hover">About</Link>
          <Link to="/" className="link link-hover">Recipes</Link>
          
        </nav>
        <nav>
          <h6 className="footer-title">Food & Recipes</h6>
          <Link to="/quick-easy" className="link link-hover">Quick and Easy</Link>
          <Link to="/vegan-recipes" className="link link-hover">Vegan Recipes</Link>
          <Link to="/pasta-recipes" className="link link-hover">Pasta Recipes</Link>
          <Link to="/soup-recipes" className="link link-hover">Soup Recipes</Link>
        </nav>

        <form onSubmit={handleSubmit}>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="email"
                placeholder="username@mail.com"
                className="input input-bordered join-item bg-backgroundlight text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-primary text-backgroundlight font-semibold px-4 py-2 rounded-md hover:bg-secondary hover:text-backgrounddark transition-all duration-300"
              >
                Subscribe
              </button>
            </div>
          </fieldset>
        </form>
      </footer>
    </div>
  );
};

export default Footer;
