import { useState } from "react";
import Swal from "sweetalert2";

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
          <a className="link link-hover"
            href="/about"
          >About</a>
          <a className="link link-hover"
            href="/">Recipes</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Food & Recipes</h6>
          <a className="link link-hover">Quick and Easy</a>
          <a className="link link-hover">Vegan Recipes</a>
          <a className="link link-hover">Pasta Recipes</a>
          <a className="link link-hover">Soup Recipes</a>
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
