import React from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { executeDataPipeline } from "../../commons/DataPipelineExecutor";
import DataGrid from "../../components-v2/DataGrid/DataGrid";
import { DataType } from "./DataType";
import "./DataViewer.css";

export const DT_NOMINAL = "n";
export const DT_DATE = "d";
export const DT_QUANTITATIVE = "q";

export function DataViewer({
  arrayData,
  dataPipeline,
  defaultVizSpec,
  className,
  loading,
}) {
  const [filteredData, setFilteredData] = useState(null);
  const [pipelineError, setPipelineError] = useState(null);

  useEffect(() => {
    executeDataPipeline(
      arrayData,
      dataPipeline,
      (d) => {
        setFilteredData(d);
        setPipelineError(null);
      },
      (e) => {
        setPipelineError("Unable to execute pipeline:\n" + e.toString());
        setFilteredData(null);
      }
    );
  }, [arrayData, dataPipeline]);

  const data = filteredData !== null ? filteredData : arrayData;
  console.log(data);
  const colTypes = getColumnTypes(data);
  return (
    <Container fluid className={["section", className].join(" ")}>
      <Row>
        <Col>
          <div className="d-flex align-items-center mb-3">
            <h1>View data</h1>
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
            {!loading &&
              colTypes.map((ct, i) => {
                return (
                  <DataType
                    column={ct}
                    className={
                      i === 0
                        ? "dataTypeSelectorMargin"
                        : "dataTypeSelectorSeperator"
                    }
                  />
                );
              })}
          </div>
          <Row>
            {/* Main data viewer */}
            <Col md={12}>
              <DataGrid tableData={data} />
            </Col>
          </Row>
          {pipelineError !== null && (
            <Row>
              <Col md={12}>
                <Alert variant={"danger"} dismissible>
                  {pipelineError}
                </Alert>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
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
      name: k,
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
