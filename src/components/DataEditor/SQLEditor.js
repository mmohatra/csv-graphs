import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-sql";
import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Editor from "react-simple-code-editor";

const initialQuery = "SELECT * FROM ? ;";

const SQLEditor = React.forwardRef((props, ref) => {
  const [code, setCode] = useState(initialQuery);

  return (
    <Col md={12}>
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.sql)}
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

export default SQLEditor;
