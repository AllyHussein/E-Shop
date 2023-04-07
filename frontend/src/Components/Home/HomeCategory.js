import React, { useEffect  } from "react";
// import { Col } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import clothe from "../../Images/clothe.png";
import cat2 from "../../Images/cat2.png";
import labtop from "../../Images/labtop.png";
import sale from "../../Images/sale.png";
import pic from "../../Images/pic.png";
import CategoryCard from "../Category/CategoryCard";
import SubTitle from "../Utility/SubTitle";
import {useDispatch , useSelector} from "react-redux"
import {getAllCategory} from "../../redux/actions/categoryAction"

const HomeCategory = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategory())
    console.log(category)
  },[])
  const category = useSelector(state => state.allCategory.category)
  const loading = useSelector(state => state.allCategory.loading)
  return (
    <Container>
      <SubTitle title="Categories" btntitle="View More" pathText="allcategories" />
      <Row className="my-2 d-flex  justify-content-between">
        {
          loading === false ? (category ? (
            category.slice(0,5).map((item) => (
              <CategoryCard key={item._id} img={item.image} background="#F4DBA5" title={item.name} />
            ))
          ) : (<h4>No Categories Found</h4>)) : (<h4>Loading</h4>)
        }
      </Row>
    </Container>
  );
};

export default HomeCategory;