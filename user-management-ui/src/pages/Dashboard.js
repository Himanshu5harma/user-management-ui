import { getAllUsers } from "../api/UserSerice";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useEffect, useState } from "react";
import CustomActionButton from "../components/CustomActionButton";
import Dialog from "../components/Dialog";
import { FaRegEdit } from "react-icons/fa";

const Dashboard = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState({});
  const [refesh,setRefresh] = useState(true);

  const handleOpenDialog = (data) => {
    setData(data);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

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
        buttonIcon: <FaRegEdit />
    }, width: 90 },
  ]);

  useEffect(() => {
    getAllUsers().then((response) => {
      if (response.status == 200) {
        setRowData(response.data);
      }
    });
  }, [refesh]);


  
  return (
    <div className={`min-w-[800px] w-3/5 mx-auto h-full`}>
      <div
        className="ag-theme-quartz h-[800px] w-full mt-2" // applying the grid theme
      >
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
      <div className="container mx-auto p-4">
      {/* Display your main content here */}
      {/* <button
        onClick={handleOpenDialog}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Open Dialog
      </button> */}
      <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog} data={data} setRefresh={setRefresh}/>
    </div>
    </div>
  );
};

export default Dashboard;
