import React, { useContext, useEffect, useState } from "react";
import { deleteRole, getAllRolesAndPermissions } from "../api/RolesService";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import CustomActionButton from "../components/CustomActionButton";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustomButton from "../components/CustomButton";
import PermissionDialog from "../components/PermissionDialog";
import { deletePermission } from "../api/PermissionService";
import AddRoleDialog from "../components/AddRoleDialog";
import { ADMIN_ROLE, ADMIN_ROUTE_PATH, HOME_ROUTE_PATH, UN_AUTHORIZED_ROUTE_PATH } from "../data/Constant";
import { AuthContext, ErrorContext } from "../app/base/Contexts";
import { useNavigate } from "react-router-dom";

const AdminSection = (props) => {
  const [rolesData, setRolesData] = useState([]);
  const [permData, setPermData] = useState([]);
  const [openPermDialog, setOpenPermDialog] = useState(false);
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [editRole, setEditRole] = useState();
  const currentUser = useContext(AuthContext);
  const {setError} = useContext(ErrorContext);
  
  const navigate = useNavigate();
  useEffect(() => {
    getAllRolesAndPermissions().then((response) => {
      if (response.status == 200) {
        setRolesData(response?.data?.roles);
        setPermData(response?.data?.permissions);
      }
    }).catch((error)=>{
      setError(error?.response?.data?.message);
    });
  }, [openPermDialog, openRoleDialog]);
  if(currentUser?.activeRole != ADMIN_ROLE){
    navigate(UN_AUTHORIZED_ROUTE_PATH);
  }
  const deleteHandler = (data) => {
    deletePermission(data?.id).then((response) => {
      if (response.status == 200) {
        setPermData(response.data);
      }
    }).catch((error)=>{
      setError(error?.response?.data?.message);
    });;
  };

  const deleteRoleHandler = (data) => {
    deleteRole(data?.id).then((response) => {
      if (response.status == 200) {
        setRolesData(response?.data?.roles);
        setPermData(response?.data?.permissions);
      }
    }).catch((error)=>{
      setError(error?.response?.data?.message);
    });
  };

  const [rolesColDefs, setRolesColDefs] = useState([
    { field: "name", headerName: "Role", width: 150 },
    {
      field: "permissions",
      valueGetter: (param) => {
        const permissions = param?.data?.permissions?.map((p) => p.name);
        return permissions.join(" | ");
      },
      width: 250,
    },
    {
      headerName: "Action",
      cellRenderer: CustomActionButton,
      cellRendererParams: {
        onClick: (data) => {
          setEditRole(data);
          setOpenRoleDialog(true);
        },
        buttonIcon: <FaRegEdit />,
        SecondbuttonIcon: <MdDelete />,
        secondOnClick: deleteRoleHandler,
      },
      width: 150,
      tooltip: "Add Permission",
    },
  ]);

  const [perColDefs, setPerColDefs] = useState([
    { field: "name", headerName: "Permission", width: 130 },
    {
      headerName: "Action",
      cellRenderer: CustomActionButton,
      cellRendererParams: {
        onClick: deleteHandler,
        buttonIcon: <MdDelete />,
      },
      width: 80,
      tooltip: "Add Permission",
    },
  ]);

  return (
    <div className="flex space-x-10 justify-center">
      <div>
        <div className="ag-theme-quartz  w-[560px] mt-2 h-80">
          <AgGridReact rowData={rolesData} columnDefs={rolesColDefs} />
          <div className="flex justify-center">
            <div className="w-24 mt-3">
              <CustomButton
                buttonName="Add Role"
                buttonType="button"
                clickHandler={() => setOpenRoleDialog(true)}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="ag-theme-quartz  w-56 mt-2 h-80">
          <AgGridReact rowData={permData} columnDefs={perColDefs} />
          <div className="flex justify-center">
            <div className="w-36 mt-3">
              <CustomButton
                buttonName="Add Permission"
                buttonType="button"
                clickHandler={() => setOpenPermDialog(true)}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        {openPermDialog && (
          <PermissionDialog
            isOpen={openPermDialog}
            onClose={() => setOpenPermDialog(false)}
          />
        )}
        {openRoleDialog && (
          <AddRoleDialog
            isOpen={openRoleDialog}
            onClose={() => {setOpenRoleDialog(false);setEditRole(null);}}
            permissions={permData}
            editRole={editRole}
          />
        )}
      </div>
    </div>
  );
};

export default AdminSection;
