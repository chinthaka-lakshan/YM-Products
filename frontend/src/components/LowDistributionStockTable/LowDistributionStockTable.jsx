import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./LowDistributionStockTable.css";
import { Link } from "react-router-dom";

const LowDistributionStockTable = () => {
  // Mock data for low purchase stock items
  const [data, setData] = useState([
    { id: 1, item: "Spice A", weight: 5 },
    { id: 2, item: "Spice B", weight: 10 },
    { id: 3, item: "Spice C", weight: 3 },
    { id: 4, item: "Spice D", weight: 7 },
    { id: 5, item: "Spice E", weight: 6 },
    { id: 6, item: "Spice F", weight: 4 },
    { id: 7, item: "Spice G", weight: 8 },
    { id: 8, item: "Spice H", weight: 9 },
  ]);

  const LowPurchaseStockTableColumns = [
    { field: "item", headerName: "Item", width: 150 },
    { field: "weight", headerName: "Weight (KG)", width: 150 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
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

export default LowDistributionStockTable;