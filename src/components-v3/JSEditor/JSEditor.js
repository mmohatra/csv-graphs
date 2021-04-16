import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import React, { useState } from "react";
import AceEditor from "react-ace";
import { Button, Col, Modal, Row } from "react-bootstrap";

function JSEditor({ oldCode, onCodeChange, closeEditor, header }) {
  const [code, setCode] = useState(null);
  const currentCode = code !== null ? code : oldCode;

  return (
    <>
      <Modal
        show={true}
        keyboard={false}
        backDrop="static"
        onHide={() => {
          console.log("Handle Close");
          closeEditor();
        }}
      >
        <Modal.Header>
          <Modal.Title>Javascript editor</Modal.Title>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => closeEditor()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>{header}</Col>
          </Row>
          <Row>
            <Col md={12}>
              <AceEditor
                style={{ width: "100%" }}
                value={currentCode}
                mode="javascript"
                theme="github"
                name="js-code-editor"
                onChange={(code) => {
                  setCode(code);
                }}
                setOption={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                }}
                editorProps={{
                  $blockScrolling: false,
                  $enableBlockSelect: true,
                  $enableMultiselect: true,
                }}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              closeEditor();
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onCodeChange(currentCode);
              closeEditor();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default JSEditor;
