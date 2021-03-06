import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/themes/prism.css";
import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Editor from "react-simple-code-editor";
import "./JSEditor.css";

require("prismjs/components/prism-markup-templating");
require("prismjs/components/prism-clike");
require("prismjs/components/prism-javascript");

const JSEditor = React.forwardRef((props, ref) => {
  const [code, setCode] = useState(`return data.map(d=>{
    return d;
}).filter(d=>{
    return true;
});
  `);

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
          borderStyle: "dotted",
        }}
        ref={ref}
        className="jsEditor"
      />
    </Col>
  );
});

export default JSEditor;
