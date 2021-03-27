import { useState } from "react";

export function useDataLoader() {
  const [tableData, setTableData] = useState(null);
  const [filteredTableData, setFilteredTableData] = useState(null);

  const setData = (data) => {
    setTableData(data);
  };

  const setFilteredData = (data) => {
    setFilteredTableData(data);
  };

  return {
    setData,
    tableData,
    filteredTableData,
    setFilteredData,
  };
}
