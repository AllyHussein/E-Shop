import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import SearchCountResult from "../../Components/Utility/SearchCountResult";
import PaginationCompontent from "../../Components/Utility/Pagination";
import SideFilter from "../../Components/Utility/SideFilter";
import CategoriesHeader from "../../Components/Category/CategoriesHeader";

const ShopProducsPage = () => {
  return (
    <div style={{ minHeight: "670px" }}>
      <CategoriesHeader />
      <Container style={{ minHeight: "660px" }}>
        <div className="">
          <SearchCountResult title="600 Available Products" />
          <Row className="d-flex flex-row">
            <Col sm="2" xs="2" md="2" className="d-flex">
              <SideFilter />
            </Col>
            <Col sm="10" xs="11" md="10">
              <CardProductsContainer title="" btntitle="" />
            </Col>
          </Row>
          <PaginationCompontent />
        </div>
      </Container>
    </div>
  );
};

export default ShopProducsPage;