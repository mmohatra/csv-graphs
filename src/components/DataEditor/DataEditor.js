import alasql from "alasql";
import { format } from "date-fns";
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
import "./DataEditor.css";
import JSEditor from "./JSEditor";
import SQLEditor from "./SQLEditor";

function DataEditor({ tableData, setFilteredData }) {
  const [editorLanguage, setEditorLanguage] = useState("js");
  const [error, setError] = useState(null);

  const editorRef = useRef(null);

  const editorOptions = {
    sql: {
      editor: <SQLEditor ref={editorRef} />,
      message: "ALA SQL Query Editor",
      inputs: [
        {
          name: "data",
          description:
            "Array of objects. Each object in an array represents a table row.",
        },
      ],
      processor: (data, code) => {
        const whatCount = (code.match(/\?/g) || []).length;
        const args = [];
        for (let i = 0; i < whatCount; i++) {
          args.push(data);
        }

        console.log("SQL Editor: ", data);
        console.log("What count:", whatCount);
        return alasql(code, args);
      },
    },

    js: {
      editor: <JSEditor ref={editorRef} />,
      message: "JS Editor",
      inputs: [
        {
          name: "data",
          description:
            "Array of objects. Each object in an array represents a table row.",
        },
        {
          name: "format",
          description: "format() function from date-fns",
        },
        {
          name: "alasql",
          description: "alasql() function from alasql",
        },
      ],
      processor: (data, code) => {
        const proc = new Function("data", "format", "alasql", code);
        console.log(tableData);
        return proc(data, format, alasql);
      },
    },
  };

  const currentEditor = editorOptions[editorLanguage];

  const filterData = (editor) => {
    const code = editor.props.value;
    const processData = currentEditor.processor;

    let filteredData = null;
    try {
      filteredData = processData(tableData, code);

      if (filteredData === null || filteredData === undefined) {
        setError((e) => "Returned data is null");
        setFilteredData(null);
        return;
      }
      if (!Array.isArray(filteredData)) {
        setError((e) => "Returned data is not array");
        setFilteredData(null);
        return;
      }

      if (filteredData.length === 0) {
        setError((e) => "Data is empty");
        setFilteredData(null);
        return;
      }

      setError((e) => null);
      setFilteredData(filteredData);
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };

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
          <Button
            variant="primary"
            block
            onClick={() => filterData(editorRef.current)}
          >
            Filter
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
            <Toast.Body>
              Error compiling script...
              <br />
              {error.toString()}
            </Toast.Body>
          </Toast>
        </>
      )}
    </div>
  );
}

export default DataEditor;
