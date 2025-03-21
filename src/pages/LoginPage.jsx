import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const { formData, error, handleInputChange, handleSubmit } = useLogin();

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
            Login
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
