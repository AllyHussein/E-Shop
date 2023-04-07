import React, { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CategoryCard from "./CategoryCard";
import clothe from "../../Images/clothe.png";
import cat2 from "../../Images/cat2.png";
import labtop from "../../Images/labtop.png";
import sale from "../../Images/sale.png";
import pic from "../../Images/pic.png";
const CategoryContainer = () => {
  return (
    <div className="my-3">
      <Container>
        <div className="admin-content-text ">All Categories</div>
        <Row className="my-1 justify-content-between">
          <CategoryCard img={clothe} background="#F4DBA5" />
          <CategoryCard img={cat2} background="#0034FF" />
          <CategoryCard img={labtop} background="#FFD3E8" />
          <CategoryCard img={clothe} background="#55CFDF" />
          <CategoryCard img={sale} background="#FF6262" />
          <CategoryCard img={pic} background="#F4DBA5" />
          <CategoryCard img={cat2} background="#0034FF" />
          <CategoryCard img={labtop} background="#FFD3E8" />
          <CategoryCard img={clothe} background="#55CFDF" />
          <CategoryCard img={sale} background="#FF6262" />
          <CategoryCard img={clothe} background="#F4DBA5" />
          <CategoryCard img={cat2} background="#0034FF" />
        </Row>
      </Container>
    </div>
  );
};

export default CategoryContainer;