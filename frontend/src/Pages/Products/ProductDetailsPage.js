import React from "react";
import { Container } from "react-bootstrap";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import ProductDetails from "../../Components/Products/ProductDetails";
import RateContainer from "../../Components/Rate/RateContainer";
import CategoriesHeader from "../../Components/Category/CategoriesHeader";

const ProductDetalisPage = () => {
  return (
    <div>
      <CategoriesHeader />
      <Container>
        <ProductDetails />
        <RateContainer />
        <CardProductsContainer title="Products You May Like" btntitle="" />
      </Container>
    </div>
  );
};

export default ProductDetalisPage;