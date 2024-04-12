import { useContext, useMemo, useState } from "react";
import CustomDialog from "./CustomDialog";
import { createNewPermission } from "../api/PermissionService";
import { ErrorContext } from "../app/base/Contexts";

const PermissionDialog = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const {error, setError} = useContext(ErrorContext);

  const handleInputChange = (e) => setName(e?.target?.value);
  
  const handleClose = () => {
    setError("");
    onClose();
  };

  const createPermissionHandler = () => {
    createNewPermission({ name })
      .then((response) => {
        if (response.status === 200) {
          handleClose();
          setError("");
        }
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
      });
  };

  const dialogContent = (
    <div>
      <div className="flex">
        <label htmlFor="permission" className="block font-normal w-[30%] mt-2">
          Permission Name
        </label>
        <input
          type="text"
          id="permission"
          name="permission"
          value={name}
          onChange={handleInputChange}
          className="w-full border rounded-md p-2"
        />
      </div>
    </div>
  );

  return (
    <CustomDialog
      isOpen={isOpen}
      onClose={handleClose}
      primaryButtonName={"Create"}
      primaryButtonClick={createPermissionHandler}
      dialogTitle={`Create New Permission`}
      dialogContent={dialogContent}
    />
  );
};

export default PermissionDialog;
