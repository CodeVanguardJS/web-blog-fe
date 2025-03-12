import propTypes from "prop-types";

const Button = ({ text, color, onClick }) => (
  <button
    className={`px-4 py-2 text-white rounded-md hover:bg-${color}-700 transition mx-1 bg-${color}-600`}
    onClick={onClick}
  >
    {text}
  </button>
);

Button.propTypes = {
  text: propTypes.string,
  color: propTypes.string,
  onClick: propTypes.func,
};

export default Button;
