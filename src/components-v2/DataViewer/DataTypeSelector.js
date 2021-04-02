import React, { useRef, useState } from "react";
import { Overlay } from "react-bootstrap";
import { BsChevronDoubleRight, BsClock, BsHash, BsType } from "react-icons/bs";
import "../styles.css";
import "./DataTypeSelector.css";
import { DT_DATE, DT_NOMINAL, DT_QUANTITATIVE } from "./DataViewer";

function DataTypeSelector({ oldColumnType, className, onTypeSelected }) {
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

  const [showPicker, setShowPicker] = useState(false);
  const dataTypeIconDomRef = useRef(null);
  const [dateFormat, setDateFormat] = useState(null);

  const handleTargetClick = React.useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      setShowPicker(!showPicker);
    },
    [showPicker]
  );

  const oldColType = oldColumnType.type;
  const colName = oldColumnType.column;
  const dt = getDataType(oldColType);

  return (
    <>
      <div className={`dataTypeSelector ${className}`}>
        <span
          className="typeSelectorTrigger"
          ref={dataTypeIconDomRef}
          onClick={handleTargetClick}
        >
          <dt.icon />
        </span>
        <span>{colName}</span>
      </div>
      <Overlay
        target={dataTypeIconDomRef.current}
        show={showPicker}
        placement="bottom-start"
        rootClose={true}
        rootCloseEvent="click"
        onHide={() => {
          setShowPicker(false);
        }}
        container={document.body}
      >
        <div className="data-type-selector-overlay">
          <div
            className={
              DT_NOMINAL === dt.type
                ? " data-type-selected data-type-select-item"
                : "data-type-select-item"
            }
            onClick={() => {
              setShowPicker(false);
              onTypeSelected({ type: DT_NOMINAL, format: dateFormat });
            }}
          >
            <span className="data-type-selector-icon">
              <BsType />
            </span>
            {"      " + "Nominal"}
          </div>
          <hr className="no-margin-hr"></hr>
          <div
            className={
              DT_QUANTITATIVE === dt.type
                ? " data-type-selected data-type-select-item"
                : "data-type-select-item"
            }
            onClick={() => {
              setShowPicker(false);
              onTypeSelected({ type: DT_QUANTITATIVE, format: dateFormat });
            }}
          >
            <span className="data-type-selector-icon">
              <BsHash />
            </span>
            {"      " + "Quantitative"}
          </div>
          <hr className="no-margin-hr"></hr>
          <div className="input-group">
            <span
              className="data-type-selector-icon"
              style={{ marginLeft: 12 }}
            >
              <BsClock />
            </span>
            <input
              type="text"
              class="form-control"
              id="dateFormat"
              placeholder={
                oldColumnType.dateFormat !== null
                  ? oldColumnType.dateFormat
                  : "Date format"
              }
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              style={{ border: "none" }}
            />
            <button
              type="button"
              class="btn  ml-auto"
              onClick={() => {
                setShowPicker(false);
                onTypeSelected({ type: DT_DATE, format: dateFormat });
              }}
            >
              <BsChevronDoubleRight />
            </button>
          </div>
        </div>
      </Overlay>
    </>
  );
}

export default DataTypeSelector;
