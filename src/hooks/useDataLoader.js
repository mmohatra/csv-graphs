import { csvParse } from "d3";
import { useState } from "react";

export function useDataLoader() {
  const [loadingError, setLoadingError] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [tableColumns, setTableColumns] = useState([]);

  const setData = (data) => {
    const td = csvParse(data);
    const cols = td.columns;
    console.log(cols);
    setTableData(td);
  };

  return { setData, setLoadingError, tableData, setTableData };
}
