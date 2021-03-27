import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/themes/prism.css";
import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Editor from "react-simple-code-editor";

require("prismjs/components/prism-markup-templating");
require("prismjs/components/prism-clike");
require("prismjs/components/prism-javascript");

const JSEditor = React.forwardRef((props, ref) => {
  const [code, setCode] = useState("return data;");

  return (
    <Col md={12}>
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.javascript)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
        ref={ref}
      />
    </Col>
  );
});

export default JSEditor;
