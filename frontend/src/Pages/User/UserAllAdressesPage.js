import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserAllAddresses from "../../Components/User/UserAllAdresses";
import UserSideBar from "../../Components/User/UserSideBar";

const UserAllAddressesPage = () => {
  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <UserSideBar />
        </Col>
        <Col sm="9" xs="10" md="10">
          <UserAllAddresses />
        </Col>
      </Row>
    </Container>
  );
};
export default UserAllAddressesPage;