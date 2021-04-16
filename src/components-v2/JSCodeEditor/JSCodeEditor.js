import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/themes/prism.css";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import Editor from "react-simple-code-editor";
import "../styles.css";
import "./JSCodeEditor.css";

require("prismjs/components/prism-markup-templating");
require("prismjs/components/prism-clike");
require("prismjs/components/prism-javascript");

const JSCodeEditor = ({
  onCodeChange,
  closeEditor,
  jsMessage,
  previousCode,
}) => {
  const [code, setCode] = useState(null);
  return (
    <>
      <Row className="jsCodeEditor">
        <Col md={12} style={{ paddingBottom: 8 }}>
          <Editor
            value={code !== null ? code : previousCode}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => highlight(code, languages.javascript)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              minHeight: 240,
            }}
          />
          {jsMessage !== null && (
            <Row style={{ marginBottom: 16 }}>
              <Col>{jsMessage}</Col>
            </Row>
          )}
        </Col>
      </Row>

      <button
        onClick={closeEditor}
        type="button"
        class="btn btn-danger btnCircle btnSm mr-auto"
        style={{ position: "absolute", bottom: 8, right: 4 }}
      >
        <BsX />
      </button>
      <button
        type="button"
        class="btn btn-secondary btnCircle btnSm mr-auto"
        style={{ position: "absolute", bottom: 8, right: 38 }}
        onClick={() => onCodeChange(code)}
      >
        <FiCheck />
      </button>
    </>
  );
};

export default JSCodeEditor;
