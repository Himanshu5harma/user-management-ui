import { useEffect, useState } from "react";
import CustomDialog from "./CustomDialog";
import { createNewRole } from "../api/RolesService";

const AddRoleDialog = ({ isOpen, onClose, permissions, editRole }) => {
  const [role, setRole] = useState(
    editRole ? editRole : { name: "", permissions: [] }
  );
  const [error, setError] = useState("");
  const [checkedPerms, setCheckedPerms] = useState({});

  useEffect(() => {
    permissions.forEach((element) => {
      if (role.permissions.filter((e) => e.id === element.id).length) {
        setCheckedPerms((prev) => ({
          ...prev,
          [element.id]: true,
        }));
      } else {
        setCheckedPerms((prev) => ({
          ...prev,
          [element.id]: false,
        }));
      }
    });
  }, []);
  const handleInputChange = (e) =>
    setRole((perValue) => ({ ...perValue, name: e?.target?.value }));

  const handleClose = () => {
    setError("");
    setRole(null);
    onClose();
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedPerms((prevItems) => ({
      ...prevItems,
      [name]: checked,
    }));
  };
  const createRoleHandler = () => {
    const newPerm = permissions.filter((e) => checkedPerms[e.id]);
    setRole((prev) => ({ ...prev, permissions: newPerm }));
    const updatedRole = { ...role, permissions: newPerm };
    console.log(updatedRole);

    createNewRole(updatedRole)
      .then((response) => {
        if (response.status === 200) {
          handleClose();
          setError("");
        }
      })
      .catch((error) => {
        setError("Error oucered Role not create !");
      });
  };

  const dialogContent = (
    <div className="space-y-4">
      <div className="flex">
        <label htmlFor="role" className="block font-normal w-[30%] mt-2">
          Role Name
        </label>
        <input
          type="text"
          id="role"
          name="role"
          value={role.name}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2"
        />
      </div>
      <div className="flex">
        <label htmlFor="permissions" className="block font-normal w-[20%] mt-2">
          Permissions
        </label>
        <div className="flex">
          {permissions.map((option) => (
            <label
              key={option.name}
              htmlFor="permissions"
              className="block font-normal mt-2 flex px-2"
            >
              <input
                type="checkbox"
                name={option.id}
                checked={checkedPerms[option.id] || false}
                onChange={handleCheckboxChange}
                className="w-full border rounded-md mx-2"
              />
              {option.name}
            </label>
          ))}
        </div>
      </div>
      {/* <div className="text-red-500 text-sm w-full text-right font-thin">
        {error}
      </div> */}
    </div>
  );

  return (
    <CustomDialog
      isOpen={isOpen}
      onClose={handleClose}
      primaryButtonName={editRole ? `Save` : "Create"}
      primaryButtonClick={createRoleHandler}
      dialogTitle={editRole ? `Edit Role` : `Create New Role`}
      dialogContent={dialogContent}
    />
  );
};

export default AddRoleDialog;
