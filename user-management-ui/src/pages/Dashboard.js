import React, { useCallback, useRef } from "react";
import { getAllUsers } from "../api/UserSerice";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useContext, useEffect, useState } from "react";
import CustomActionButton from "../components/CustomActionButton";
import Dialog from "../components/Dialog";
import { FaRegEdit } from "react-icons/fa";
import { AuthContext, ErrorContext, RolesContext } from "../app/base/Contexts";
import { getActiveRolePermissions } from "../utils/utils";
import { ACCESS_MAP } from "../data/Constant";
import Spinner from "../components/Spinner";

const Dashboard = (props) => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState({});
  const [refesh,setRefresh] = useState(true);
  const [reRender, setReRender] = useState(false);
  const allRoles = useContext(RolesContext);
  const currentUser = useContext(AuthContext);
  const {setError}  = useContext(ErrorContext);
  const [gridApi, setGridApi] = useState(null);
  const [loading, setLoading] = useState(false);
  const gridRef = useRef();
  // const onGrid
  const handleOpenDialog = (data) => {
    setData(data);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const checkPermission = ()=>{
    const permissions = getActiveRolePermissions(allRoles, currentUser.activeRole)
    return ACCESS_MAP.grantRole.filter(p=>permissions.filter(per =>per == p).length).length == 0;
  }

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "firstName" },
    { field: "lastName" },
    { field: "birthDate" },
    { field: "userName" },
    {
      field: "roles",
      valueGetter: (param) => {
        const roles = param?.data?.roles?.map((role) => role.name);
        return roles.join(" | ");
      },
    },
    { headerName: "Action", cellRenderer: CustomActionButton, cellRendererParams:{
        onClick: handleOpenDialog,
        buttonIcon: <FaRegEdit />,
        // primaryDisabled: checkPermission
    }, 
    width: 90,
  }
  ]);

  useEffect(() => {
    setLoading(true);
    getAllUsers()
      .then((response) => {
        if (response.status == 200) {
          setRowData(response.data);
        }
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  }, [refesh]);

  // useEffect(()=> {
  //   // setReRender(prev =>!prev);
  //   console.log(gridRef?.current?.api?.refreshCells());
    
  // },[currentUser])

  return (<>
    {loading && <Spinner/>}
    <div className={`min-w-[800px] w-3/5 mx-auto h-full`}>
      <div  className="ag-theme-quartz h-[800px] w-full mt-2">
        <AgGridReact ref={gridRef} rowData={rowData} columnDefs={colDefs} />
      </div>
      <div className="container mx-auto p-4">
      <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog} data={data} setRefresh={setRefresh} activeRolePremissions={getActiveRolePermissions(allRoles,currentUser.activeRole)}/>
    </div>
    </div>
    </>
  );
};

export default Dashboard;
