import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./LowDistributionStockTable.css";

const LowDistributionStockTable = () => {

  const [data, setData] = useState([
    { id: 1, item: "Chilli Powder 50g", quantity: 10 },
    { id: 1, item: "Turmeric 50g", quantity: 12 },
    { id: 1, item: "Pepper 50g", quantity: 9 },
    { id: 1, item: "Curry Powder 100g", quantity: 11 },
    { id: 1, item: "Chilli Powder 100g", quantity: 3 },
  ]);

  const LowDistributionStockTableColumns = [
    { field: "item", headerName: "Item", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 100 },
  ];

  return (
    <div className="LowDistributionStockTable">
      <span className="LowDistributionStockTableTitle">Low Distribution Stock</span>
      <DataGrid
        className="DataGrid"
        rows={data}
        columns={LowDistributionStockTableColumns}
        pageSize={8}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default LowDistributionStockTable;