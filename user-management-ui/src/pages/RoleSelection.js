import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { AuthContext } from "../app/base/Contexts";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE_PATH } from "../data/Constant";

const roles = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
  { value: "manager", label: "Manager" },
  // Add more roles as needed
];

const RoleSelection = ({updatedAcitveRole}) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const currentUser = useContext(AuthContext);
  const nevigate = useNavigate();

  useEffect(() => {
    if(currentUser?.roles){
    setRoles(currentUser?.roles?.map((role) => ({ value: role, label: role.split('_')[1] })));
    }
  }, [currentUser]);

  const handleRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption);
    updatedAcitveRole(selectedOption.value);
    nevigate(HOME_ROUTE_PATH);
    
  };

  return (
    <div className="flex content-center w-full h-full p-10">
      <div className="flex max-w-lg mx-auto mt-64 space-x-4">
      <div>
        <label
          htmlFor="role"
          className="w-full whitespace-nowrap block text-md text-xl font-normal text-gray-700 mx-auto py-2"
        >
          Please select a role
        </label>
      </div>
      <Select
        id="role"
        options={roles}
        value={selectedRole}
        onChange={handleRoleChange}
        className="mt-1 uppercase w-full"
        placeholder="Select a role..."
      />
      </div>
    </div>
  );
};

export default RoleSelection;
