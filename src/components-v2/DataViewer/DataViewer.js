import { alasql } from "alasql";
import { format, parse } from "date-fns";
import React, { useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { BsCodeSlash } from "react-icons/bs";
import DataGrid from "../DataGrid/DataGrid";
import DataVizGroup from "../DataViz/DataVizGroup";
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
  const [loading, setLoading] = useState(false);
  const [codeEditorActive, setCodeEditorActive] = useState(false);

  const [jsError, setJsError] = useState(null);

  const handleCodeChange = (code) => {
    console.log(code);
    try {
      const func = new Function("data", "parse", "format", "alasql", code);
      const data = func(props.rawData, parse, format, alasql);
      if (!Array.isArray(data) && !isDict(data)) {
        setJsError("Returned data is not array or dictionary");
        return;
      }
      if (isDict(data)) {
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          if (!Array.isArray(data[k])) {
            setJsError("Dictionary member is not array.");
            return;
          }
        }
      }
      setProcessedData(data);
      setJsError(null);
    } catch (e) {
      console.log(e);
      setJsError(e.toString());
    }
  };

  const rawData = props.rawData;
  let allData = processedData !== null ? processedData : rawData;
  if (Array.isArray(allData)) {
    allData = { data: allData };
  }

  const dataKey =
    currentDataKey !== null ? currentDataKey : Object.keys(allData)[0];

  const data = allData[dataKey];

  const columnTypes = getColumnTypes(data);

  const toggleCodeEditor = () => {
    setCodeEditorActive(!codeEditorActive);
  };

  const closeCodeEditor = () => {
    setCodeEditorActive(false);
  };

  return (
    <>
      <Container fluid className={["section", props.className].join(" ")}>
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
            <Row>
              {codeEditorActive && (
                <Col md={5}>
                  <JSCodeEditor
                    jsMessage={
                      jsError !== null ? (
                        <Alert variant="danger">{jsError}</Alert>
                      ) : null
                    }
                    style={{ position: "absolute", left: "0", top: "0" }}
                    closeEditor={closeCodeEditor}
                    onCodeChange={(code) => {
                      handleCodeChange(code);
                    }}
                  />
                </Col>
              )}
              <Col
                md={codeEditorActive ? 7 : 12}
                style={{ overflow: "scroll" }}
              >
                <DataGrid tableData={data}></DataGrid>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {allData !== null && allData !== undefined && (
        <DataVizGroup allData={allData} loading={false} className={""} />
      )}
    </>
  );
}

export function getColumnTypes(data) {
  const row = data[0];
  const keys = Object.keys(data[0]);
  const ct = keys.map((k) => {
    let type = DT_NOMINAL;
    if (row[k] instanceof Date) {
      type = DT_DATE;
    } else if (typeof row[k] === "number") {
      type = DT_QUANTITATIVE;
    }
    return {
      column: k,
      type: type,
    };
  });
  return ct;
}

export function isDict(v) {
  return (
    typeof v === "object" &&
    v !== null &&
    !(v instanceof Array) &&
    !(v instanceof Date)
  );
}

export default DataViewer;
