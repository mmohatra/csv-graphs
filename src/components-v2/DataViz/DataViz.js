import React, { useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { BsCodeSlash } from "react-icons/bs";
import { VegaLite } from "react-vega";
import { compileVegaLiteAPI } from "../../commons/VegaLiteAPICompiler";
import DataTypeSelector from "../DataViewer/DataTypeSelector";
import { getColumnTypes } from "../DataViewer/DataViewer";
import JSCodeEditor from "../JSCodeEditor/JSCodeEditor";
import "../styles.css";

// Expects data with size more than 0
function DataViz({ loading, className, allData, children }) {
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [currentDataKey, setCurrentDataKey] = useState(null);
  const [vegaSpec, setVegaSpec] = useState("");
  const [jsError, setJsError] = useState(null);

  const onCodeChange = (code) => {
    compileVegaLiteAPI(
      code,
      (e) => setJsError(e.toString()),
      (spec) => {
        setVegaSpec(spec);
        setJsError(null);
        console.log("Spec is: ", spec);
      }
    );
  };

  const dataKey =
    currentDataKey !== null ? currentDataKey : Object.keys(allData)[0];
  const data = allData[dataKey];

  const columnTypes = getColumnTypes(data);

  return (
    <Container fluid className={["section", className].join(" ")}>
      <Row>
        <Col>
          <div className="d-flex align-items-center mb-3">
            <h1>Vizualize data </h1>
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
              onClick={() => {
                setShowCodeEditor(true);
              }}
            >
              <BsCodeSlash />
            </button>
            {children}
          </div>
        </Col>
      </Row>
      <Row>
        {showCodeEditor && (
          <Col md={5}>
            <JSCodeEditor
              jsMessage={
                jsError !== null ? (
                  <Alert variant="danger">{jsError}</Alert>
                ) : null
              }
              onCodeChange={onCodeChange}
              closeEditor={() => setShowCodeEditor(false)}
            />
          </Col>
        )}
        <Col md={showCodeEditor ? 7 : 5}>
          <VegaLite
            data={{ data_0: data }}
            spec={vegaSpec}
            height={480}
            width={800}
            renderer="svg"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default DataViz;
