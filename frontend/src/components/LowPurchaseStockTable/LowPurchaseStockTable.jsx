import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./LowPurchaseStockTable.css";
import { Link } from "react-router-dom";

const LowPurchaseStockTable = () => {
  const [data, setData] = useState([]);

  const LowPurchaseStockTableColumns = [
    { field: "item", headerName: "Item", width: 100 },
    { field: "weight", headerName: "Weight (KG)", width: 60 },
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
    <div className="LowPurchaseStockTable">
      <div className="LowPurchaseStockTableTitle">
        <span>Low Purchase Stock</span>
      </div>
      <DataGrid
        className="dataGrid"
        rows={data}
        columns={LowPurchaseStockTableColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default LowPurchaseStockTable;