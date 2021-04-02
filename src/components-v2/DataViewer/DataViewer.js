import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { BsCodeSlash } from "react-icons/bs";
import JSCodeEditor from "../JSCodeEditor/JSCodeEditor";
import DataTypeSelector from "./DataTypeSelector";
import "./DataViewer.css";

export const DT_NOMINAL = "n";
export const DT_DATE = "d";
export const DT_QUANTITATIVE = "q";

// Expects data with size more than 0
function DataViewer(props) {
  const [processedData, setProcessedData] = useState(null);
  const [currentDataKey, setCurrentDataKey] = useState(null);
  const [altColTypes, setAltColTypes] = useState({});
  const [loading, setLoading] = useState(false);
  const [codeEditorActive, setCodeEditorActive] = useState(false);

  const rawData = props.rawData;
  let allData = processedData !== null ? processedData : rawData;
  if (Array.isArray(allData)) {
    allData = { data: allData };
    if (allData.data !== rawData) {
      allData.rawData = rawData;
    }
  }

  const dataKey =
    currentDataKey !== null ? currentDataKey : Object.keys(allData)[0];

  let data = allData[dataKey];

  const columnTypes = getColumnTypes(
    data,
    dataKey in altColTypes ? altColTypes[dataKey] : {}
  );

  data = mapDataToColTypes(data, columnTypes);

  const closeAllActiveModels = () => {
    setCodeEditorActive(false);
  };

  const toggleCodeEditor = () => {
    console.log("Opening code editor");
    setCodeEditorActive(!codeEditorActive);
  };

  const closeCodeEditor = () => {
    setCodeEditorActive(false);
  };

  console.log("Passed alternate column", altColTypes);

  return (
    <Container fluid className={["dataViewer", props.className].join(" ")}>
      <Row>
        <Col>
          <div className="d-flex align-items-center mb-3">
            <h1>View data </h1>
            {loading && (
              <Spinner
                animation="border"
                variant="primary"
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderWidth: "2px",
                  marginLeft: "2rem",
                }}
              />
            )}

            {
              <select
                className="browser-default custom-select"
                style={{ width: "auto", marginLeft: 16 }}
                onChange={(e) => setCurrentDataKey(e.target.value)}
              >
                {Object.keys(allData).map((k) => {
                  return (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  );
                })}
              </select>
            }

            {columnTypes.map((ct, i) => {
              return (
                <DataTypeSelector
                  oldColumnType={ct}
                  className={
                    i === 0
                      ? "dataTypeSelectorMargin"
                      : "dataTypeSelectorSeperator"
                  }
                  onTypeSelected={({ type, dateFormat }) => {
                    console.log(type, dateFormat);
                    const newAltColTypes = { ...altColTypes };
                    const newPerDataColTypes =
                      newAltColTypes[dataKey] !== undefined &&
                      newAltColTypes[dataKey] !== null
                        ? newAltColTypes[dataKey]
                        : {};
                    newAltColTypes[dataKey] = newPerDataColTypes;
                    let oldCt = newPerDataColTypes[ct.column];
                    if (oldCt === undefined || oldCt === null) {
                      oldCt = {};
                      newPerDataColTypes[ct.column] = oldCt;
                    }

                    oldCt.column = ct.column;
                    oldCt.type = type;
                    oldCt.dateFormat = dateFormat;

                    setAltColTypes(newAltColTypes);
                  }}
                />
              );
            })}

            <button
              type="button"
              className="btn btn-secondary ml-auto"
              onClick={toggleCodeEditor}
            >
              <BsCodeSlash />
            </button>
          </div>
          {codeEditorActive && (
            <JSCodeEditor
              style={{ position: "absolute", left: 0, top: 0 }}
              closeEditor={closeCodeEditor}
              onCodeChange={(code) => {
                console.log(code);
              }}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

function getColumnTypes(data, alternateColumnTypes) {
  const row = data[0];
  const keys = Object.keys(data[0]);
  const ct = keys.map((k) => {
    let type = DT_NOMINAL;
    if (row[k] instanceof Date) {
      type = DT_DATE;
    } else if (typeof row[k] === "number") {
      type = DT_QUANTITATIVE;
    } else if (+row[k] === +row[k]) {
      type = DT_QUANTITATIVE;
    }
    return {
      column: k,
      type: k in alternateColumnTypes ? alternateColumnTypes[k].type : type,
      dateFormat:
        k in alternateColumnTypes ? alternateColumnTypes[k].dateFormat : null,
    };
  });
  return ct;
}

function mapDataToColTypes(data, colTypes) {
  return data;
}

export default DataViewer;
