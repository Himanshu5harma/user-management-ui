const CustomButton = (props) => {
  const {buttonName, clickHandler,buttonType , disabled} = props;
  return (
    <button
      type={buttonType}
      className="group relative disabled:cursor-not-allowed disabled:bg-slate-400 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={clickHandler}
      disabled={disabled}
    >
      {buttonName}
    </button>
  );
};

export default CustomButton;
