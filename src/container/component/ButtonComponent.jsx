import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ButtonComponent({
  textButton,
  handleClick,
  icon,
  style,
  type,
  iconStyles,
  typeButton,
}) {
  const isFunction = typeof handleClick === "function";
  return (
    <button
      type={type || "button"}
      onClick={isFunction ? handleClick : () => {}}
      className={` font-medium rounded-md text-sm  px-5 py-2 ${
        style ||
        `${
          typeButton === 1
            ? "bg-yellow-700 hover:bg-yellow-800  focus:ring-yellow-300"
            : typeButton === 2
            ? "bg-red-700 hover:bg-red-800  focus:ring-red-300"
            : "bg-blue-700 hover:bg-blue-800  focus:ring-blue-300"
        }  focus:ring-4 mx-1 mr-1 text-white `
      }`}
    >
      <FontAwesomeIcon icon={icon} className={iconStyles} />
      {textButton}
    </button>
  );
}

export default ButtonComponent;
