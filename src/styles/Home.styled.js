import styled from "styled-components";
import banner from "../assets/images/herobanner.jpg";

export const HeroSection = styled.section`
  position: relative;
  height: 85vh;
  min-height: 600px;
  width: 100%;
  background-image: url(${banner});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 80px;
`;

export const HeroCTA = styled.div`
  text-align: center;
  color: white;
  margin-top: 40px;

  p {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 16px;
  }

  button {
    background: white;
    border: none;
    border-radius: 24px;
    padding: 12px 24px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background: #f7f7f7;
    }
  }
`;

export const InspirationSection = styled.div`
  padding: 0 50px;
  margin-bottom: 80px;

  .card {
    border-radius: 12px;
    overflow: hidden;
    border: none;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.02);
    }
  }

  .card-body {
    background: transparent;
    padding: 12px 0;
  }

  img {
    height: 180px;
    width: 100%;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
  }

  .card-title {
    font-weight: 600;
    margin-bottom: 0;
  }

  .card-text {
    color: #717171;
    font-size: 14px;
  }
`;

export const ExperienceSection = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 50px;
  margin-bottom: 60px;

  .card {
    flex: 1;
    border-radius: 12px;
    overflow: hidden;
    border: none;
    height: 400px;
  }

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
    .experience-card-title{
    padding: 30px 60px 20px 30px;
    font-size:46px;
    font-weight:800;
    margin-bottom:24px;
    flex-wrap: wrap;
    
    }
`;

export const DestinationContainer = styled.div`
  padding: 40px 80px;

  .grid {
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    column-gap:30px;
    row-gap:24px;
  }

  .title {
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
  }
    .grid-item {
    display: flex;
    flex-direction: column;
  }

  .sub-title {
    color: #717171;
    font-size: 14px;
  }
`;
// padding: 20px 0;

//   .grid {
//     display: grid;
//     grid-template-rows: repeat(3, auto);
//     grid-auto-flow: column;
//     grid-auto-columns: minmax(180px, 1fr);
//     gap: 16px 24px;
//     overflow-x: auto;
//   }

//   .grid-item {
//     display: flex;
//     flex-direction: column;
//   }

//   .title {
//     font-size: 14px;
//     font-weight: 600;
//     cursor: pointer;
//   }

//   .sub-title {
//     font-size: 13px;
//     color: #717171;
//   }