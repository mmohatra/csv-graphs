import React from "react";
import { VegaLite } from "react-vega";

function VegaChart({ data, spec }) {
  return (
    <>
      <VegaLite
        data={{ data_0: data }}
        spec={spec}
        height={480}
        width={800}
        renderer="svg"
      />
    </>
  );
}

export default VegaChart;
