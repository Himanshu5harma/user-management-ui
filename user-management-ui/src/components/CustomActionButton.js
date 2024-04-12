import React from "react";

export default (params) => {
  const {
    buttonIcon,
    onClick,
    SecondbuttonIcon,
    secondOnClick,
    secondoryDisabled,
  } = params;
  return (
    <div className={`w-full pl-1`}>
      <button
        className="ml-4 disabled:text-gray-400"
        onClick={() => onClick(params.data)}
        disabled={false}
      >
        {buttonIcon}
      </button>

      {SecondbuttonIcon && (
        <button
          className="ml-4"
          onClick={() => secondOnClick(params.data)}
          disabled={secondoryDisabled}
        >
          {SecondbuttonIcon}
        </button>
      )}
    </div>
  );
};
