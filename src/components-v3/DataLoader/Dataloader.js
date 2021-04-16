import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { BsUpload } from "react-icons/bs";
import styles from "./DataLoader.module.scss";
import UploadFile from "./UploadFile/UploadFile";

function Dataloader({ setData, setLoading }) {
  const [optionIndex, setOptionIndex] = useState(0);
  const [loadingError, setLoadingError] = useState(null);

  const options = [
    {
      id: "upload",
      name: "Upload your file",
      message: "Load CSV, TSV or DSV file",
      icon: BsUpload,
      loader: (
        <UploadFile
          setData={(data) => {
            setData(data);
            console.log(data);
          }}
          setLoadingError={setLoadingError}
          setLoading={setLoading}
        />
      ),
    },
  ];

  return (
    <>
      <Row>
        <Col md={2}>
          {options.map((dl, i) => {
            const classnames = [
              "w-100",
              "d-flex",
              "align-items-center",
              "user-select-none",
              "cursor-pointer",
              styles["loading-option"],
              i === optionIndex ? styles["active"] : null,
            ]
              .filter((c) => c !== null)
              .join(" ");

            return (
              <div
                key={dl.id}
                className={classnames}
                onClick={() => setOptionIndex(i)}
              >
                <dl.icon className="w-25" />
                <h4 className="m-0 d-inline-block">{dl.name}</h4>
              </div>
            );
          })}
        </Col>
        <Col md={10}>{options[optionIndex].loader}</Col>
      </Row>
      {loadingError !== null && (
        <small className="text-danger">{loadingError}</small>
      )}
    </>
  );
}

export default Dataloader;
