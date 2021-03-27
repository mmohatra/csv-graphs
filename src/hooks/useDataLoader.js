import { useState } from "react";

export function useDataLoader() {
  const [tableData, setTableData] = useState(null);
  const [filteredTableData, setFilteredTableData] = useState(null);

  const setData = (data) => {
    setTableData(data);
  };

  const setFilteredData = (data) => {
    setFilteredTableData(data);
    console.log("Set filtered data");
  };

  return {
    setData,
    tableData,
    filteredTableData,
    setFilteredData,
  };
}
