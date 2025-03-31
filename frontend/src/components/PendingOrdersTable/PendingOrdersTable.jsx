import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./PendingOrdersTable.css";
import { Link } from "react-router-dom";

const PendingOrdersTable = () => {

  const [data, setData] = useState([
    { id: 1, date: "2025 Jan 13", shop: "Lakshan Stores" },
    { id: 2, date: "2025 Feb 13", shop: "Hasitha Stores" },
    { id: 3, date: "2025 Mar 13", shop: "YM Stores" },
    { id: 4, date: "2025 Apr 13", shop: "Wijaya Stores" },
    { id: 5, date: "2025 May 13", shop: "CJ Stores" },
  ]);

  const PendingOrdersTableColumns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "shop", headerName: "Shop", width: 150 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={""}>
              <button className="viewButton">View</button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="PendingOrdersTable">
      <span className="PendingOrdersTableTitle">Pending Orders</span>
      <DataGrid
        className="dataGrid"
        rows={data}
        columns={PendingOrdersTableColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default PendingOrdersTable;