import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import DataViewer from "./components-v2/DataViewer/DataViewer";
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
        {tableData !== null && <DataViewer rawData={tableData} />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
