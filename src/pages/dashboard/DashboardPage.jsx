import { motion } from "framer-motion";
const DashboardPage = () => {
	return (
    <div className="min-h-screen bg-orange-50 p-6">

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {["Total Article", "Total Liked", "Total Bookmark"].map(
          (item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <p className="text-lg font-semibold text-orange-600">{item}</p>
              <p className="text-2xl font-bold text-gray-700">0</p>
            </motion.div>
          )
        )}
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* All Recipes */}
        <div>
          <h2 className="text-2xl font-bold text-orange-700 mb-4">
            All Recipes
          </h2>
          <div className="space-y-6">
            {[1, 2].map((item) => (
              <motion.div
                key={item}
                className="flex bg-white p-4 rounded-lg shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: item * 0.2 }}
              >
                <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    Chicken Katsu
                  </h3>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur. Adipiscing quis
                    fusce a vel congue scelerisque.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bookmark */}
        <div>
          <h2 className="text-2xl font-bold text-orange-700 mb-4">Bookmark</h2>
          <div className="space-y-6">
            {[1, 2].map((item) => (
              <motion.div
                key={item}
                className="flex bg-white p-4 rounded-lg shadow-md"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: item * 0.2 }}
              >
                <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    Chicken Katsu
                  </h3>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur. Adipiscing quis
                    fusce a vel congue scelerisque.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage