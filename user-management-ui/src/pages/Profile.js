import React, { useContext, useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { AuthContext, ErrorContext } from "../app/base/Contexts";
import { createNewUser, getUserByUserName } from "../api/UserSerice";
import { decodeToken } from "../utils/utils";

const Profile = ({}) => {
  const [editedData, setEditedData] = useState({});
  const currentUser = useContext(AuthContext);
  const {error, setError} = useContext(ErrorContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    getUserByUserName(decodeToken(token)?.sub).then((response) => {
      if (response.status === 200) {
        setEditedData(response.data);
      }
    }).catch((error)=>{
      setError(error?.response?.data?.message);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleEdit = () => {
    // const newRoles = allRoles.filter((role) => checkedRoles[role.id]);
    // const newUser = { ...editedData, roles: newRoles };

      createNewUser(editedData).then(response =>{
        if(response.status === 200){
        //   setRefresh(prev=> !prev);
        }
      }).catch((error)=>{
        setError(error?.response?.data?.message);
      });
      // Handle the edit action (e.g., save to backend, update state, etc.)
    //   onClose();
  };

  return (
    <div className=" w-full flex mx-auto mt-11">
      <div className="bg-white w-[650px] p-6 rounded-lg shadow-lg space-y-4 mx-auto">
        <h2 className="text-2xl  font-semibold mb-4">User Details</h2>
        <div className="flex">
          <label htmlFor="firstName" className="block font-normal w-[30%] mt-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={editedData?.firstName}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
            //disabled={checkUserEdit()}
          />
        </div>

        <div className="flex">
          <label htmlFor="lastName" className="block font-normal w-[30%] mt-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={editedData?.lastName}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
            //disabled={checkUserEdit()}
          />
        </div>

        <div className="flex">
          <label htmlFor="birthDate" className="block font-normal w-[30%] mt-1">
            Birth Date
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={editedData?.birthDate}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
            //disabled={checkUserEdit()}
          />
        </div>

        <div className="flex">
          <label htmlFor="userName" className="block font-normal w-[30%] mt-1">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={editedData?.userName}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* -------------- Profile Buttons ------------- */}
        <div className="mt-6 flex justify-end">
          <div className="w-24">
            <CustomButton
              clickHandler={handleEdit}
              buttonType="button"
              buttonName="Save"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
