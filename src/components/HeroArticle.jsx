import PropTypes from "prop-types";

const HeroArticle = ({ title, photo_url, description }) => {

  return (
    <div className="bg-secondary py-10 px-6 flex justify-center">
      <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto w-full justify-between">
        
        <div className="flex flex-col gap-4 items-start md:items-center">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden">
            <img src={photo_url} className="w-full h-full object-cover" alt={title} />
          </div>

          <div className="mt-3 text-sm text-backgrounddark text-center">
            <p className="uppercase tracking-wide font-semibold text-center">Jump to The Recipe:</p>
            <button className="smky-btn3 relative hover:text-secondary py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-primary after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-gray-600">{title}</button>
          </div>
        </div>

        <div className="md:ml-8 mt-6 md:mt-0 flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary">{title}</h1>
          <p className="text-backgrounddark mt-3 max-w-lg">{description}</p>
        </div>

      </div>
    </div>
  );
};

HeroArticle.propTypes = {
  title: PropTypes.string.isRequired,
  photo_url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default HeroArticle;
