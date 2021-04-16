import React from "react";
import { BsClock, BsHash, BsType } from "react-icons/bs";
import "../styles.css";
import "./DataType.css";
import { DT_DATE, DT_NOMINAL, DT_QUANTITATIVE } from "./DataViewer";

export function DataType({ column, className }) {
  const dataTypeIcons = {
    [DT_NOMINAL]: { icon: BsType },
    [DT_QUANTITATIVE]: { icon: BsHash },
    [DT_DATE]: { icon: BsClock },
  };

  const colType = column.type;
  const colName = column.name;
  const icon = dataTypeIcons[colType];
  return (
    <>
      <div className={`dataTypeSelector ${className}`}>
        <span className="typeSelectorTrigger">
          <icon.icon />
        </span>
        <span>{colName}</span>
      </div>
    </>
  );
}
