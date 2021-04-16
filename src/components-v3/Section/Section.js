import React from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import styles from "./Section.module.scss";

export default function Section(props) {
  return (
    <Container fluid className={[styles.section, props.className].join(" ")}>
      <Row>
        <Col>
          <div className="d-flex align-items-center mb-3">
            <h1>{props.title}</h1>
            {props.loading && (
              <Spinner
                animation="border"
                variant="primary"
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderWidth: "2px",
                  marginLeft: "2rem",
                }}
              />
            )}
          </div>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
}
