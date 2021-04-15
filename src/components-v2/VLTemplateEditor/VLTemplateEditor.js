import { default as React, useState } from "react";
import { Badge, Col, Form } from "react-bootstrap";
import DataTypeSelector from "../DataViewer/DataTypeSelector";

export const TT_ARRAY_FIELD_SELECTOR = 0;
export const TT_SINGLE_FIELD_SELECTOR = 1;

function VLTemplateEditor({ template }) {
  return <div></div>;
}

export default VLTemplateEditor;

// -----------------------------------------------------------------------------

function ArrayFieldSelector({
  availableFields,
  onFieldsSelected,
  shouldAccept,
  md,
}) {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    onFieldsSelected(fields);
  }, [fields]);

  return (
    <Col md={md}>
      {fields.map((f, index) => {
        <Badge pill variant="primary" key={f.columnName}>
          <DataTypeSelector oldColumnType={f} />
          {f.columnName}
          <button
            type="button"
            class="close"
            aria-label="Close"
            onClick={() => {
              let newArray = [...fields];
              newArray = newArray.splice(index, 1);
              setFields(newArray);
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Badge>;
      })}
      <Form.Control as="select">
        <option>Default select</option>
      </Form.Control>
    </Col>
  );
}

export default ArrayFieldSelector;
