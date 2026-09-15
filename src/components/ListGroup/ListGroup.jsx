import React, { useState } from "react";
import {StyledList} from './ListGroup.styled';




function ListGroup({items, heading}) {
    // {items} = props;



  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items found</p>}
      <StyledList className="list-group list-group-horizontal list-group-flush ">
        {items.map((item, index) => (
          <li 
            className={
              selectedIndex === index
                ? "list-group-item selected flex-fill border-0"
                : "list-group-item flex-fill border-0"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              
            }}
          >
            {item}
          </li>
        ))}
      </StyledList>
    </>
  );
}

export default ListGroup;
