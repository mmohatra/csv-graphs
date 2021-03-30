import React, { useRef, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Dropdown,
  OverlayTrigger,
  Row,
  Toast,
  Tooltip,
} from "react-bootstrap";
import "./VegaEditor.css";
import VegaLiteAPIEditor from "./VegaLiteAPIEditor";

const vl = require("vega-lite-api");

function VegaEditor({ data, setSpec }) {
  const [editorLanguage, setEditorLanguage] = useState("vegaLiteApi");
  const [error, setError] = useState(null);
  const editorRef = useRef(null);

  const editorOptions = {
    vegaLiteApi: {
      editor: VegaLiteAPIEditor,
      processor: () => {
        const code = editorRef.current.props.value;
        try {
          const func = new Function("vl", code);
          const specs = func(vl)
            .autosize({ type: "fit", contains: "padding" })
            .config({
              axis: {
                domain: false,
                tickColor: "lightGray",
              },
              style: {
                "guide-label": {
                  fontSize: 15,
                  fill: "#3e3c38",
                },
                "guide-title": {
                  fontSize: 15,
                  fill: "#3e3c38",
                },
              },
            });

          console.log("Specs ", specs.toString());
          if (specs !== null && specs !== undefined) {
            const visSpec = JSON.parse(specs.toString());
            setSpec(visSpec);
          }
        } catch (e) {
          setError(e);
        }
      },
      message: "Vega Lite API editor",
      inputs: [
        {
          name: "vl",
          description: "Vega lite object",
        },
      ],
    },
  };
  const currentEditor = editorOptions[editorLanguage];

  return (
    <div className="h-100 d-flex flex-column">
      <Row className="justify-content-center">
        <Col md={12}>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="dropdownButton"
            >
              {currentEditor.message}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(editorOptions).map((key) => {
                return (
                  <Dropdown.Item
                    key={key}
                    onSelect={(ek, e) => {
                      setEditorLanguage((cl) => key);
                    }}
                  >
                    {editorOptions[key].message}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <p className="float-left">
            {currentEditor.inputs.map((i) => (
              <OverlayTrigger
                key={i.name}
                placement="bottom"
                overlay={<Tooltip id="span-tooltip">{i.description}</Tooltip>}
              >
                {({ ref, ...triggerHandler }) => (
                  <Badge pill variant="info" ref={ref} {...triggerHandler}>
                    {i.name}
                  </Badge>
                )}
              </OverlayTrigger>
            ))}
            {Object.keys(data[0]).map((i) => {
              return (
                <Badge pill variant="danger">
                  {i}
                </Badge>
              );
            })}
          </p>
        </Col>
      </Row>
      <Row className="flex-grow-1">
        {<currentEditor.editor ref={editorRef} />}
      </Row>
      <Row>
        <Col md={12}>
          <Button
            variant="primary"
            block
            onClick={() => {
              currentEditor.processor();
            }}
          >
            Process
          </Button>
        </Col>
      </Row>

      {error != null && (
        <>
          <Toast
            style={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
            onClose={() => setError((err) => null)}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">Error</strong>
              <small>Just now</small>
            </Toast.Header>
            <Toast.Body>{error.toString()}</Toast.Body>
          </Toast>
        </>
      )}
    </div>
  );
}

export default VegaEditor;
