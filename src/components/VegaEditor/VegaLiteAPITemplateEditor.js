import React from "react";
import function VegaLiteAPITemplateEditor({ data }) {
  const cols = Object.keys(data[0]);

  const templates = [
    {
      id: "xyScatter",
      card: "",
      help: "",
      options: [
        {
          dt: "S['qunatative', ]"
        }
      ]
    },
  ];

  return <div></div>;
};



export default TemplateEditor;
