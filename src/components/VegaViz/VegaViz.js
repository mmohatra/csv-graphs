import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import VegaEditor from "../VegaEditor/VegaEditor";
import VegaChart from "./VegaChart";
import "./VegaViz.css";

function VegaViz({ data }) {
  const [vegaSpecs, setVegaSpecs] = useState([null]);

  const setVegaSpecsObject = (spec, position) => {
    const newList = [...vegaSpecs];
    newList[position] = spec;
    setVegaSpecs(newList);
  };

  return (
    <>
      {vegaSpecs.map((spec, i) => {
        console.log("Spec is: ", spec);
        return (
          <>
            <Row style={{ marginBottom: 16 }} key={i}>
              <Col md={4}>
                <VegaEditor
                  data={data}
                  setSpec={(spec) => {
                    setVegaSpecsObject(spec, i);
                  }}
                ></VegaEditor>
              </Col>
              <Col md={8} className="chartContainer">
                {spec !== null && (
                  <VegaChart
                    data={data}
                    spec={spec}
                    style={{ overflow: "scroll" }}
                  ></VegaChart>
                )}
                {i === 0 ? (
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    style={{ position: "absolute", right: 0, top: 0 }}
                    onClick={() => {
                      const newList = [...vegaSpecs];
                      newList.push(spec);
                      setVegaSpecs(newList);
                    }}
                  >
                    <span aria-hidden="true">{"+"}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    style={{ position: "absolute", right: 0, top: 0 }}
                    onClick={() => {
                      const newList = [...vegaSpecs];
                      newList.splice(i, 1);
                      setVegaSpecs(newList);
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                )}
              </Col>
            </Row>
            <hr />
          </>
        );
      })}
    </>
  );
}

export default VegaViz;
