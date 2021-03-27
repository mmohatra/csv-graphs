import React, { useState } from "react";
import { useDebouncer } from "../../hooks/useDebouncer";

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onFilterChanged = useDebouncer((value) => setFilter(value), 1000);

  React.useEffect(() => {
    console.log("Here goes value", value);
    onFilterChanged(value);
  }, [onFilterChanged, value]);

  return (
    <div className="input-group">
      <div className="form-outline">
        <input
          value={value}
          type="search"
          className="form-control"
          onChange={(e) => {
            console.log("Value changed in filter", e);
            e.persist();
            setValue((v) => e.target.value);
          }}
          placeholder="Filter"
        />
      </div>
    </div>
  );
};
