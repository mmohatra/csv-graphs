import classNames from "classnames";
import { csvParse } from "d3";
import React, { useCallback } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import S from "./UploadFile.module.scss";

function UploadFile({ setData, setLoading, setLoadingError }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setLoading(true);
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setLoading(false);
          setData(csvParse(event.target.result));
          setLoadingError(null);
        };
        reader.onerror = (error) => {
          setLoading(false);
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
    accept: "text/csv",
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
          {isDragReject && (
            <small id="passwordHelp" className="text-danger">
              Invalid file type
            </small>
          )}
        </Col>
      </Row>
    </>
  );
}

export default UploadFile;
