import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const { formData, error, handleInputChange, handleSubmit } = useLogin();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-backgroundlight">
      {/* Left Side - Form */}
      <div className="w-full min-h-screen md:min-h-0 md:h-auto md:w-1/2 lg:w-1/3 bg-primary text-white flex items-center justify-center py-10 px-6">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 w-full max-w-md"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            Login Account
          </h1>

          {error && <p className="text-red-950 text-sm">{error}</p>}

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

          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-highlightAction">
              Register
            </Link>
          </p>

          <button
            type="submit"
            className="bg-highlightAction text-backgrounddark font-semibold w-full py-3 rounded-md hover:bg-accent hover:text-white transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>

      {/* Right Side - Text */}
      {/* <div
        className="w-full md:w-1/2 lg:w-2/3 hidden md:flex items-center justify-center bg-cover bg-center px-6 py-10"
        style={{
          backgroundImage:
            "url('https://media-cdn.grubhub.com/grubhub-marketing/image/upload/f_auto,fl_lossy/v1692270106/grubhubHomePage/sushi_homepage1.png')",
        }}
      >
        <div className="w-full max-w-2xl bg-white bg-opacity-70 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
            Welcome!
          </h2>
          <p className="text-base sm:text-lg text-backgrounddark font-medium leading-relaxed text-justify">
            Welcome back to{" "}
            <span className="text-highlightAction font-semibold">Whisk Takers!</span>{" "}
            Ready to continue your culinary journey? Log in to access your saved
            recipes, explore new flavors, and connect with a community of fearless
            food lovers. Whether you&apos;re here to revisit a favorite dish or try
            something bold and new, your next delicious adventure starts now.
            Let’s get whisking!
          </p>
        </div>
      </div> */}

      {/* Right Side - Text */}
      <div
        className="hidden md:flex w-full md:w-1/2 lg:w-2/3 items-center justify-center bg-cover bg-center px-6 py-10"
        style={{
          backgroundImage:
            "url('https://media-cdn.grubhub.com/grubhub-marketing/image/upload/f_auto,fl_lossy/v1692270106/grubhubHomePage/sushi_homepage1.png')",
        }}
      >
        <div className="w-full max-w-2xl bg-white bg-opacity-70 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
            Welcome!
          </h2>
          <p className="text-base sm:text-lg text-backgrounddark font-medium leading-relaxed text-justify">
            Welcome back to{" "}
            <span className="text-highlightAction font-semibold">
              Whisk Takers!
            </span>{" "}
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
