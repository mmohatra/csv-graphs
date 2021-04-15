import React from "react";
import { BsClock, BsHash, BsType } from "react-icons/bs";
import "../styles.css";
import "./DataTypeSelector.css";
import { DT_DATE, DT_NOMINAL, DT_QUANTITATIVE } from "./DataViewer";

function DataTypeSelector({ oldColumnType, className }) {
  const dataTypes = [
    {
      type: DT_NOMINAL,
      icon: BsType,
      name: "Nominal",
    },
    {
      type: DT_QUANTITATIVE,
      icon: BsHash,
      name: "Quantitative",
    },
    {
      type: DT_DATE,
      icon: BsClock,
      name: "Date",
    },
  ];
  const getDataType = (colType) => {
    return dataTypes.filter((d) => d.type === colType)[0];
  };

  const oldColType = oldColumnType.type;
  const colName = oldColumnType.column;
  const dt = getDataType(oldColType);

  return (
    <>
      <div className={`dataTypeSelector ${className}`}>
        <span className="typeSelectorTrigger">
          <dt.icon />
        </span>
        <span>{colName}</span>
      </div>
    </>
  );
}

export default DataTypeSelector;
