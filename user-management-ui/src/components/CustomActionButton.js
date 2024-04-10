import React from "react";

export default (params) => {
  const {buttonIcon, onClick, SecondbuttonIcon, secondOnClick} = params;
  return (
    <div className={`w-full pl-1`}>
      <button className="ml-4" onClick={()=>onClick(params.data)}>
        {buttonIcon}
      </button>

      {SecondbuttonIcon && <button className="ml-4" onClick={()=>secondOnClick(params.data)}>
        {SecondbuttonIcon}
      </button>}
    </div>
  );
};
