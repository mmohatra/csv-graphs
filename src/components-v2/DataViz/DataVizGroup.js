import React from "react";
import { BsPlus, BsX } from "react-icons/bs";
import "../styles.css";
import DataViz from "./DataViz";

function DataVizGroup({ loading, className, allData }) {
  const [group, setGroup] = React.useState([{ id: 0 }]);
  const [lastId, setLastId] = React.useState(0);

  console.log("From data viz group");
  return (
    <>
      {group.map((k, i) => {
        return (
          <>
            <DataViz
              loading={loading}
              className={className}
              allData={allData}
              key={k.id}
            >
              {i === 0 ? (
                <button
                  type="button"
                  class="btn btn-success btnCircle btnSm"
                  style={{ position: "absolute", bottom: 0, right: 0 }}
                  onClick={() => {
                    const newId = lastId + 1;
                    setLastId(newId);

                    const newGroup = [...group];
                    newGroup.push({ id: newId });
                    setGroup(newGroup);
                  }}
                >
                  <BsPlus />
                </button>
              ) : (
                <button
                  type="button"
                  class="btn btn-danger btnCircle btnSm"
                  style={{ position: "absolute", bottom: 0, right: 0 }}
                  onClick={() => {
                    const newGroup = [...group].filter((g) => g.id !== k.id);
                    setGroup(newGroup);
                  }}
                >
                  <BsX />
                </button>
              )}
            </DataViz>
          </>
        );
      })}
    </>
  );
}

export default DataVizGroup;
