import React from "react";
import { Col, Row } from "react-bootstrap";
import "./App.css";
import DataEditor from "./components/DataEditor/DataEditor";
import DataGrid from "./components/DataGrid/DataGrid";
import Dataloader from "./components/DataLoader/Dataloader";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Section from "./components/Section/Section";
import { useDataLoader } from "./hooks/useDataLoader";

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
          <Section title={"Data Pipeline"} loading={false}>
            <Row>
              <Col md={3}>
                <DataEditor
                  tableData={tableData}
                  setFilteredData={setFilteredData}
                />
              </Col>
              <Col md={9}>
                <DataGrid tableData={tableData} />
              </Col>
            </Row>
          </Section>
        )}

        {filteredTableData !== null && filteredTableData !== tableData && (
          <Section title={"Processed Data"} loading={false}>
            <DataGrid tableData={filteredTableData} />
          </Section>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
