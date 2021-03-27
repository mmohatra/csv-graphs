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

function VegaEditor({ data }) {
  const [editorLanguage, setEditorLanguage] = useState("vegaLiteApi");
  const [error, setError] = useState(null);
  const editorRef = useRef(null);

  const editorOptions = {
    vegaLiteApi: {
      editor: <VegaLiteAPIEditor ref={editorRef} />,
      processor: (editor) => {},
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
          </p>
        </Col>
      </Row>
      <Row className="flex-grow-1">{currentEditor.editor}</Row>
      <Row>
        <Col md={12}>
          <Button variant="primary" block>
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
