import React from "react";
import "./App.css";
import DataGrid from "./components/DataGrid/DataGrid";
import Dataloader from "./components/DataLoader/Dataloader";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Section from "./components/Section/Section";
import { useDataLoader } from "./hooks/useDataLoader";

function App() {
  const { setData, setLoadingError, tableData, setTableData } = useDataLoader();

  const menuItems = [];
  return (
    <div className="App">
      <Header menuItems={menuItems} />
      <div className="app-sections">
        <Section title={"Load data"} loading={false}>
          <Dataloader setData={setData} setLoadingError={setLoadingError} />
        </Section>
        {tableData != null && (
          <Section title={"Data"} loading={false}>
            <DataGrid tableData={tableData} />
          </Section>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
