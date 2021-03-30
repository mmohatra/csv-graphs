import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Badge, Col, Row } from "react-bootstrap";
import "./App.css";
import DataEditor from "./components/DataEditor/DataEditor";
import DataGrid from "./components/DataGrid/DataGrid";
import Dataloader from "./components/DataLoader/Dataloader";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Section from "./components/Section/Section";
import VegaViz from "./components/VegaViz/VegaViz";
import { useDataLoader } from "./hooks/useDataLoader";

const editorSize = 4;
const viewerSize = 8;

function App() {
  const {
    setData,
    tableData,
    filteredTableData,
    setFilteredData,
  } = useDataLoader();

  const menuItems = [];
  return (
    <div className="App">
      <Header menuItems={menuItems} />
      <div className="app-sections">
        <Section title={"Load data"} loading={false}>
          <Dataloader setData={setData} />
        </Section>
        {tableData != null && (
          <Section title={"Data"} loading={false}>
            <Row>
              <Col md={editorSize}>
                <DataEditor
                  tableData={tableData}
                  setFilteredData={setFilteredData}
                />
              </Col>

              <Col md={viewerSize}>
                <Row className="datagridContainer">
                  <Col md={12}>
                    <DataGrid tableData={tableData} />
                    <h2 style={{ position: "absolute", right: 0, top: 0 }}>
                      <Badge variant="danger">Raw</Badge>
                    </h2>
                  </Col>
                </Row>

                {filteredTableData !== null && filteredTableData !== tableData && (
                  <>
                    <Row
                      style={{ marginTop: 4, marginBottom: 4, height: 10 }}
                    ></Row>

                    <Row className="datagridContainer">
                      <Col md={12}>
                        <DataGrid tableData={filteredTableData} />
                        <h2 style={{ position: "absolute", right: 0, top: 0 }}>
                          <button
                            type="button"
                            class="close"
                            aria-label="Close"
                            onClick={() => setFilteredData(null)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </h2>
                      </Col>
                    </Row>
                  </>
                )}
              </Col>
            </Row>
          </Section>
        )}

        {tableData !== null && (
          <Section title={"Visualization"} loading={false}>
            <VegaViz
              data={
                filteredTableData != null && filteredTableData.length > 0
                  ? filteredTableData
                  : tableData
              }
            />
          </Section>
        )}
      </div>

      {/* <DataTypeSelection
        selectTypes={["Q", "N"]}
        onValueChanged={(oldValue, newValue) => console.log(oldValue, newValue)}
      ></DataTypeSelection> */}
      <Footer />
    </div>
  );
}

export default App;
