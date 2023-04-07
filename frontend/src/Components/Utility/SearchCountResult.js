import React from "react";
import UnopDropdown from "unop-react-dropdown";
import filter from "../../Images/filter.png";
import sort from "../../Images/sort.png";
const SearchCountResult = ({ title }) => {
  const handler = () => {};
  const handler2 = () => {};
  return (
    <div className="d-flex justify-content-between pt-3 px-2">
      <div className="sub-tile">{title}</div>
      <div className="search-count-text d-flex ">
        <UnopDropdown
          onAppear={handler}
          onDisappearStart={handler}
          trigger={
            <p className="mx-1">
              <img
                width="20px"
                height="20px"
                className="ms-1"
                src={sort}
                alt=""
              />
              Filter By
            </p>
          }
          delay={0}
          align="CENTER"
          hover>
          <div className="card-filter">
            <div className="border-bottom card-filter-item">Best Sellers</div>
            <div className="border-bottom card-filter-item">Top Rated</div>
            <div className="border-bottom card-filter-item">
              From Lowest To Highest
            </div>
            <div className=" card-filter-item">From Highest To Lowest</div>
          </div>
        </UnopDropdown>
      </div>
    </div>
  );
};

export default SearchCountResult;