import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    if (!email || !password ) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch(
        "https://eb23c63d-f941-4654-b10a-f5289655df8c.mock.pstmn.io/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setError(data.error || "Something went wrong");
      } else {
        Swal.fire({
          title: "Registration Successful!",
          text: "Account created successfully, please login.",
          icon: "success",
          confirmButtonText: "Login",
        }).then(() => {
          navigate("/login", { state: { success: "Registration successful!" } })
        })
        ;
      }
    } catch {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="min-h-screen flex bg-backgroundlight">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/3 bg-primary text-white flex items-center justify-center">
        <form onSubmit={handleSubmit} noValidate className="space-y-6 w-3/4">
          <h1 className="text-3xl font-bold text-center">Login Account</h1>

          {error && <p className="text-red-950">{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-highlightAction bg-backgroundlight text-backgrounddark"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-highlightAction bg-backgroundlight text-backgrounddark"
          />

          <button
            type="submit"
            className="bg-highlightAction text-backgrounddark font-semibold w-full py-3 rounded-md hover:bg-accent hover:text-white transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Right Side - Text */}
      <div
        className="w-full md:w-2/3 flex items-center justify-center bg-cover bg-center "
        style={{
          backgroundImage:
            "url('https://media-cdn.grubhub.com/grubhub-marketing/image/upload/f_auto,fl_lossy/v1692270106/grubhubHomePage/sushi_homepage1.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          imageRendering: "auto",
        }}
      >
        <div className="w-3/4 mx-auto">
          <h2 className="font-display text-4xl font-bold text-white mb-6">
            Welcome!
          </h2>
          <p className="font-sans px-2 text-backgrounddark text-xl text-justify font-bold leading-relaxed bg-slate-100 rounded-md bg-opacity-50">
            Welcome back to{" "}
            <span className="text-primary"> Whisk Takers! </span>
            Ready to continue your culinary journey? Log in to access your saved
            recipes, explore new flavors, and connect with a community of
            fearless food lovers. Whether you&apos;re here to revisit a favorite
            dish or try something bold and new, your next delicious adventure
            starts now. Let’s get whisking!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
