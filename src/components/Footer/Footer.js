import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Footer.module.scss";

export default function Footer(props) {
  return (
    <Container fluid style={{ backgroundColor: "var(--dark)" }}>
      <Container className={styles.footer}>
        <Row>
          <Col xs={6} sm={{ span: 5, order: 1 }} lg={{ span: 3, order: 1 }}>
            <p className="Xsmall">
              CSV Graphs for visualizing CSV data.{" "}
              <a href="https://raw.github.com/rawgraphs/rawgraphs-app/master/LICENSE">
                (Apache License 2.0)
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
