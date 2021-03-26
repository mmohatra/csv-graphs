import classNames from "classnames";
import React, { useCallback } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import S from "./UploadFile.module.scss";

function UploadFile({ setData, setLoadingError }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          // parseData(event.target.result);
          setData(event.target.result);
        };
        reader.onerror = (error) => {
          console.log(error);
          setLoadingError(error);
        };
        reader.readAsText(file);
      });
    },
    [setData, setLoadingError]
  );

  const {
    getRootProps,
    getInputProps,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept:
      "text/csv,text/plain,application/json,text/tsv,text/tab-separated-values",
    maxFiles: 1,
  });

  return (
    <>
      <div
        className={classNames(S.dropzone, {
          [S.reject]: isDragReject,
          [S.accept]: isDragAccept,
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span>Drag a file here or </span>
        <Button className={S["browse-button"]} color="primary">
          Browse
        </Button>
        <span>a file from your computer</span>
      </div>
      <Row>
        <Col md="12">
          {/* {isDragAccept && <Alert variant={"success"}>Valid file type</Alert>} */}
          {isDragReject && <Alert variant={"danger"}>Invalid file type!</Alert>}
        </Col>
      </Row>
    </>
  );
}

export default UploadFile;
