// Dialog.js
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import CustomSecondaryButton from "./CustomSecondaryButton";

const CustomDialog = (props) => {
  const {
    isOpen,
    onClose,
    primaryButtonName,
    primaryButtonClick,
    dialogTitle,
    dialogContent,
  } = props;

  return (
    <div className={`fixed inset-0 ${isOpen ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-50">
        <div className="bg-white w-[600px] p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl  font-semibold mb-4">{dialogTitle}</h2>
          {dialogContent}

          <div className="mt-6 flex justify-end">
            <div className="w-24">
              <CustomButton
                clickHandler={primaryButtonClick}
                buttonType="button"
                buttonName={primaryButtonName}
              />
            </div>
            <CustomSecondaryButton
              clickHandler={onClose}
              buttonName="Cancel"
              buttonType="button"
              className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
