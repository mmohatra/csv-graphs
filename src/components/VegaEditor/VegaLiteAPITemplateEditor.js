import React from "react";

function VegaLiteAPITemplateEditor({ data }) {
  const cols = Object.keys(data[0]);

  const templates = [
    {
      id: "X-Y Scatter Plot",
      tooltip: "",
      help: "",
      input: [
        {
          inputType: "fieldMap",
          channel: "x",
          dataType: ["Q"],
        },
      ],
    },
  ];

  return <div></div>;
}

export default TemplateEditor;
