import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const HeroArticle = ({ id, title, photo_url, description }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/articles/${id}`);
  };

  return (
    <div className="bg-secondary py-10 px-6 flex justify-center">
      <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto w-full gap-8">
        {/* Kiri: Foto + Tombol */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden">
            <img
              src={photo_url}
              className="w-full h-full object-cover"
              alt={title}
            />
          </div>

          <div className="mt-3 text-sm text-backgrounddark text-center md:text-left">
            <p className="uppercase tracking-wide font-semibold">
              Jump to The Recipe:
            </p>
            <button
              onClick={handleReadMore}
              className="smky-btn3 relative hover:text-secondary py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 overflow-hidden z-20 after:z-[-20] after:bg-primary after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-backgrounddark font-bold"
            >
              {title}
            </button>
          </div>
        </div>

        {/* Kanan: Judul + Deskripsi */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left w-full">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight w-full">
            <span className="block w-full break-words">{title}</span>
          </h1>
          <p className="text-backgrounddark mt-3 max-w-xl">{description}</p>
        </div>
      </div>
    </div>
  );
};

HeroArticle.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  photo_url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default HeroArticle;
