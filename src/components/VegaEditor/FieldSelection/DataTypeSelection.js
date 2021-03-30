import React, { useRef, useState } from "react";
import { Overlay } from "react-bootstrap";
import { BsChevronDoubleRight, BsClock, BsHash, BsType } from "react-icons/bs";
import "./DataTypeSelection.css";

function DataTypeSelection({ selectTypes, onValueChanged }) {
  const dataTypes = [
    {
      type: "N",
      icon: BsType,
      name: "Nominal",
      apiType: "N",
    },
    {
      type: "Q",
      icon: BsHash,
      name: "Quantitative",
      apiType: "Q",
    },
    {
      type: "T",
      icon: BsClock,
      name: "Temporal",
      apiType: "T",
    },
    {
      type: "O",
      icon: BsChevronDoubleRight,
      name: "Ordinal",
      apiType: "O",
    },
  ];

  const getDataType = (type) => {
    return dataTypes.filter((d) => d.type === type)[0];
  };

  const [showPicker, setShowPicker] = useState(false);
  const dataTypeIconDomRef = useRef(null);
  const [currentType, setCurrentType] = useState("N");

  const currentItem = getDataType(currentType);

  const handleTargetClick = React.useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      setShowPicker(!showPicker);
    },
    [showPicker]
  );

  return (
    <>
      <span
        role="button"
        className={"data-type-selector-trigger"}
        ref={dataTypeIconDomRef}
        onClick={handleTargetClick}
      >
        <currentItem.icon />
      </span>
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
          {dataTypes
            .filter((dt) => selectTypes.includes(dt.type))
            .map((dt, index) => {
              return (
                <>
                  {index !== 0 && <hr className="no-margin-hr"></hr>}
                  <div
                    className={
                      dt.type === currentType
                        ? " data-type-selected data-type-select-item"
                        : "data-type-select-item"
                    }
                    onClick={() => {
                      setShowPicker(false);
                      setCurrentType(dt.type);
                      onValueChanged(currentItem.apiType, getDataType(dt.type));
                    }}
                  >
                    <span className="data-type-selector-icon">
                      <dt.icon />
                    </span>
                    {"      " + dt.name}
                  </div>
                </>
              );
            })}
        </div>
      </Overlay>
    </>
  );
}

export default DataTypeSelection;
