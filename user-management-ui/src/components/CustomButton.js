const CustomButton = (props) => {
  const {buttonName, clickHandler,buttonType } = props;
  return (
    <button
      type={buttonType}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={clickHandler}
    >
      {buttonName}
    </button>
  );
};

export default CustomButton;
