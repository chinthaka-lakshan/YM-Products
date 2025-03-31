import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./LowPurchaseStockTable.css";

const LowPurchaseStockTable = () => {

  const [data, setData] = useState([
    { id: 1, item: "Dry Chilli", weight: 5 },
    { id: 2, item: "Turmeric", weight: 10 },
    { id: 3, item: "Ginger", weight: 3 },
    { id: 4, item: "Pepper", weight: 7 },
    { id: 5, item: "Cinnamon", weight: 6 },
  ]);

  const LowPurchaseStockTableColumns = [
    { field: "item", headerName: "Item", width: 150 },
    { field: "weight", headerName: "Weight (KG)", width: 100 },
  ];

  return (
    <div className="LowPurchaseStockTable">
      <span className="LowPurchaseStockTableTitle">Low Purchase Stock</span>
      <DataGrid
        className="DataGrid"
        rows={data}
        columns={LowPurchaseStockTableColumns}
        pageSize={8}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default LowPurchaseStockTable;