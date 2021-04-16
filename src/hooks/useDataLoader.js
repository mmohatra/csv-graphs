import { useState } from "react";

export function useDataLoader() {
  /* 
  Array of data format.
  Data format contains:
  {
    data: array of data,
    pipeline: pipeline specification.
    vizSpecs: visualization specification.
  }
  */
  const [data, setData] = useState([]);

  return { data, setData };
}
