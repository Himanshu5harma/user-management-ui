// Dialog.js
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import CustomSecondaryButton from "./CustomSecondaryButton";
import { getAllRoles } from "../api/RolesService";
import { createNewUser } from "../api/UserSerice";

const Dialog = ({ isOpen, onClose, data, setRefresh}) => {
  const [editedData, setEditedData] = useState(data);
  const [allRoles, setAllRoles] = useState([]);
  const [checkedRoles, setCheckedRoles] = useState({});
  
  // Fetch All Roles;
  useEffect(()=>{
    getAllRoles().then(response=>{
      if(response.status === 200){
        setAllRoles(response?.data);
      }
    })
  },[]);

  useEffect(() => setEditedData(data), [data]);

  useEffect(()=>{
    if(allRoles.length>0 && editedData?.roles){
      const {roles} = editedData;
      // Make roles checked which user holding 
      allRoles.forEach((role)=>{
        setCheckedRoles((prev)=>({...prev, [role.id]: roles.filter(r=>r.id == role.id).length ? true: false}))
      })
    }
  },[allRoles, editedData]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedRoles((prevItems) => ({
      ...prevItems,
      [name]: checked,
    }));
  };

  const handleClose = () => {
    // setError("");
    setEditedData({});
    onClose();
  }; 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleEdit = () => {
    const newRoles = allRoles.filter(role=> checkedRoles[role.id]);
    const newUser = {...editedData, roles: newRoles};

    createNewUser(newUser).then(response =>{
      if(response.status === 200){
        handleClose();
        setRefresh(prev=> !prev);
      }
    })
    // Handle the edit action (e.g., save to backend, update state, etc.)
    console.log("Edited data:", editedData);
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${isOpen ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-50">
        <div className="bg-white w-[600px] p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl  font-semibold mb-4">User Details</h2>
          <div className="flex">
            <label
              htmlFor="firstName"
              className="block font-normal w-[30%] mt-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={editedData.firstName}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div className="flex">
            <label
              htmlFor="lastName"
              className="block font-normal w-[30%] mt-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={editedData.lastName}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div className="flex">
            <label
              htmlFor="birthDate"
              className="block font-normal w-[30%] mt-1"
            >
              Birth Date
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={editedData.birthDate}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div className="flex">
            <label
              htmlFor="userName"
              className="block font-normal w-[30%] mt-1"
            >
              User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={editedData.userName}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div className="flex">
            <label htmlFor="roles" className="block font-normal w-[30%] mt-1">
              Roles
            </label>
            <div className="flex space-x-4 flex-wrap">
          {allRoles.map((option) => (
            <label
              key={option.name}
              htmlFor="roles"
              className="font-normal pt-1 flex px-2 h-8 whitespace-nowrap"
            >
              <input
                type="checkbox"
                name={option.id}
                checked={checkedRoles[option.id] || false}
                onChange={handleCheckboxChange}
                className="w-full border rounded-md mx-2"
              />
              {option.name}
            </label>
          ))}
        </div>
          </div>

          {/* -------------- Dailog Buttons ------------- */}
          <div className="mt-6 flex justify-end">
            <div className="w-24">
              <CustomButton
                clickHandler={handleEdit}
                buttonType="button"
                buttonName="Save"
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

export default Dialog;
