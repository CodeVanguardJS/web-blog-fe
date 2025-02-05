const AboutPage = () => {
  return (
    <div className="container mx-auto p-6 bg-backgroundlight text-backgrounddark">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: "url('/foodpic.jpg')" }}
      >
        <div className="absolute inset-0 bg-backgrounddark opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-center max-w-2xl">
            Welcome to <strong className="text-secondary">Whisk Takers</strong>{" "}
            – where cooking meets passion and creativity.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-4xl mx-auto text-center mt-12">
        <p className="text-lg mb-6">
          We&apos;re dedicated to sharing delicious recipes, creative ideas, and
          culinary inspiration to elevate your cooking experience. Whether
          you&apos;re a home cook or a foodie adventurer, our blog is here for
          you!
        </p>
        <img
          src="/mainfoodpic.jpg"
          alt="Delicious Food"
          className="w-full rounded-lg shadow-lg mb-8"
        />
      </div>

      {/* Highlights Section */}
      <div className="text-center mt-12">
        <h2 className="text-3xl font-semibold mb-8">
          What You&apos;ll Love About Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg">
          <div>
            <h3 className="text-xl font-bold mb-2">Diverse Recipes</h3>
            <p>
              From appetizers to desserts, explore a wide range of recipes that
              fit every occasion and taste.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Fresh Ingredients</h3>
            <p>
              Learn how to use fresh, seasonal ingredients to make every meal
              extraordinary.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Easy Instructions</h3>
            <p>
              Follow step-by-step guides that make even the most complex recipes
              achievable.
            </p>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-semibold mb-8">Meet Our Team</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
          {/* Team Member 1 */}
          <div className="text-center">
            <img
              src="/team1.jpg"
              alt="Team Member 1"
              className="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg"
            />
            <h3 className="text-xl font-bold">Muhammad Luthfi Zuhair</h3>
            <p className="text-gray-600">Frontend Developer</p>
            <p className="mt-2 text-sm text-gray-700">
              Luthfi is a passionate chef who loves experimenting with new
              ingredients and techniques to create unique recipes.
            </p>
          </div>
          {/* Team Member 2 */}
          <div className="text-center">
            <img
              src="/team2.jpg"
              alt="Team Member 2"
              className="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg"
            />
            <h3 className="text-xl font-bold">Muhammad Syaifullah Al-Arief</h3>
            <p className="text-gray-600">Backend developer</p>
            <p className="mt-2 text-sm text-gray-700">
              Arief captures the beauty of food through her lens, bringing every
              dish to life with stunning visuals.
            </p>
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="text-center mt-16">
        <p className="text-lg text-white mb-6 bg-backgrounddark">
          Join us on a flavorful journey as we create, taste, and share
          unforgettable dishes.
        </p>
        <p className="text-2xl font-semibold">
          Let&apos;s make something delicious together!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
