import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/themes/prism.css";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BsPower } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import Editor from "react-simple-code-editor";
import "../styles.css";
import "./JSCodeEditor.css";

require("prismjs/components/prism-markup-templating");
require("prismjs/components/prism-clike");
require("prismjs/components/prism-javascript");

const JSCodeEditor = ({ onCodeChange, closeEditor }) => {
  const [code, setCode] = useState("return data;");

  return (
    <>
      <Row>
        <Col md={5}>
          <Row>
            <Col md={12}>
              <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) => highlight(code, languages.javascript)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                  minHeight: 240,
                }}
                className="jsCodeEditor"
              />
            </Col>
          </Row>
          <button
            onClick={closeEditor}
            type="button"
            class="btn btn-danger btnCircle btnSm mr-auto"
            style={{ position: "absolute", right: -30, top: 0 }}
          >
            <BsPower />
          </button>
          <button
            type="button"
            class="btn btn-secondary btnCircle btnSm mr-auto"
            style={{ position: "absolute", right: -30, top: 38 }}
            onClick={() => onCodeChange(code)}
          >
            <FiCheck />
          </button>
        </Col>
      </Row>
    </>
  );
};

export default JSCodeEditor;
