import React, { useState } from "react";
import { BsChevronDoubleRight, BsClock, BsHash, BsType } from "react-icons/bs";
import { components } from "react-select";
import "./DataTypeSelection.css";

function DataTypeSelection({ selectTypes, onValueChanged }) {
  const { Option } = components;
  const dataTypes = [
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
    {
      type: "N",
      icon: BsType,
      name: "Nominal",
      apiType: "N",
    },
  ];

  const [showPicker, setShowPicker] = useState(false);
  const handleTargetClick = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      setShowPicker(!showPicker);
    },
    [showPicker]
  );

  const [value, setValue] = useState("N");
  return (
    <>
      {/* <select
        className="browser-default custom-select"
        style={{ fontFamily: "FontAwesome" }}
        data-show-content="true"
        onChange={(e) => {
          setValue(e.target.value);
          onValueChanged(e.target.value);
        }}
        value={value}
      >
        {dataTypes.map((dt, i) => {
          console.log("Data type", dt);
          return (
            <option
              key={dt.type}
              value={dt.type}
              data-content="<i class='fa fa-cutlery'></i>"
            ></option>
          );
        })}
      </select> */}

      {/* <Select>
        {dataTypes.map((dt, i) => {
          console.log("Data type", dt);
          return (
            <Option>
              <dt.icon />
            </Option>
          );
        })}
      </Select> */}

      <>
        <span
          role="button"
          className={"data-type-selector-trigger"}
          ref={dataTypeIconDomRef}
          onClick={handleTargetClick}
        >
          <Icon />
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
          {({
            placement,
            scheduleUpdate,
            arrowProps,
            outOfBoundaries,
            show: _show,
            ...props
          }) => (
            <div
              id="data-type-selector"
              className={S["data-type-selector"]}
              onClick={(e) => e.stopPropagation()}
              {...props}
            >
              <div
                data-datatype="number"
                onClick={handleTypeChange}
                className={classNames(S["data-type-selector-item"], {
                  [S.selected]: currentType === "number",
                })}
              >
                <NumberIcon /> Number
              </div>
              <OverlayTrigger
                placement="right-start"
                overlay={
                  <DateFormatSelector
                    currentType={typeDescriptor}
                    onChange={handleTypeChangeDate}
                  />
                }
                trigger="click"
              >
                {({ ref, ...triggerHandler }) => (
                  <div
                    ref={ref}
                    data-datatype="date"
                    {...triggerHandler}
                    className={classNames(
                      S["data-type-selector-item"],
                      S["parent-type-selector"],
                      { [S.selected]: currentType === "date" }
                    )}
                  >
                    <div>
                      <DateIcon />
                      {"Date"}
                      {currentType === "date" && (
                        <span className={S["date-format-preview"]}>
                          {" (" + currentTypeComplete.dateFormat + ")  "}
                        </span>
                      )}
                    </div>
                    <BsFillCaretRightFill
                      style={{ marginRight: 0, fill: "var(--gray-700)" }}
                    />
                  </div>
                )}
              </OverlayTrigger>
              <div
                data-datatype="string"
                onClick={handleTypeChange}
                className={classNames(S["data-type-selector-item"], {
                  [S.selected]: currentType === "string",
                })}
              >
                <StringIcon /> String
              </div>
            </div>
          )}
        </Overlay>
      </>
    </>
  );
}

export default DataTypeSelection;
