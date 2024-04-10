const CustomSecondaryButton = (props) => {
    const {buttonName, clickHandler,buttonType } = props;
    return (
      <button
        type={buttonType}
        className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        onClick={clickHandler}
      >
        {buttonName}
      </button>
    );
  };
  
  export default CustomSecondaryButton;