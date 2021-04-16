import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import Dataloader from "./components-v3/DataLoader/Dataloader";
import Footer from "./components-v3/Footer/Footer";
import Header from "./components-v3/Header/Header";
import Section from "./components-v3/Section/Section";
import { useDataLoader } from "./hooks/useDataLoader";

function App() {
  const { data, setData } = useDataLoader();
  const [loading, setLoading] = React.useState(false);
  const [code, setCode] = React.useState("return data;");

  const menuItems = [];
  return (
    <div className="App">
      <Header menuItems={menuItems} />
      <div className="app-sections">
        <Section title={"Load data"} loading={loading}>
          <Dataloader setData={setData} setLoading={setLoading} />
        </Section>
      </div>
      <Footer />
    </div>
  );
}

export default App;
