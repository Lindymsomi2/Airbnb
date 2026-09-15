import styled from "styled-components";

export const Footerdiv = styled.div`
  .grouplist {
    column-count: 4;
    column-gap: 20px;
    background-color: #F7F7F7;
    

  }
    ul li {
    list-style-type:none;
    color:rgb(73, 78, 84);
    line-height: 28px;
    }

    li:nth-child(1), li:nth-child(8), li:nth-child(15), li:nth-child(22){
    font-weight:bold;
    color:black;
    }
`;

export const FinePrint = styled.div`
display: flex;
justify-content: space-between;
align-content: center;
    align-items: center;
padding: 0 30px;
background-color: #F7F7F7;
color: 222222;


.seperateGroup{
display:flex;
align-items: center;
gap: 10px;
}

`
