import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";

const CategoriesHeader = () => {
  return (
    <div className="cat-header">
      <Container>
        <Row>
          <Col className="d-flex justify-content-start py-2 flex-wrap">
            <div className="cat-text-header ">All</div>
            <div className="cat-text-header">Electronics</div>
            <div className="cat-text-header">Clothes</div>
            <div className="cat-text-header">Video Games</div>
            <div className="cat-text-header">Sale</div>
            <div className="cat-text-header">More</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoriesHeader;