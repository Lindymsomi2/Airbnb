import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar/SearchBar";
import Footer from "../components/Footer/Footer";
import ListGroup from "../components/ListGroup/ListGroup";
import Button from "../components/Button";

import tokyo from "../assets/images/tokyo.jpeg";
import paris from "../assets/images/paris.jpg";
import newYork from "../assets/images/new-york.jpeg";
import capeTown from "../assets/images/cape-town.jpeg";
import phuket from "../assets/images/phuket.webp";
import trip from "../assets/images/IceCaving.jpg";
import cooking from "../assets/images/cooking.jpeg";
import giftcards from "../assets/images/giftcard.jpg";
import question from "../assets/images/question1.jpg";

import {
  HeroSection,
  HeroCTA,
  InspirationSection,
  ExperienceSection,
  DestinationContainer,
} from "../styles/Home.styled";


const locationCards = [
  { name: "Paris", country: "France", slug: "paris", image: paris },
  { name: "New York", country: "USA", slug: "new-york", image: newYork },
  { name: "Tokyo", country: "Japan", slug: "tokyo", image: tokyo },
  {
    name: "Cape Town",
    country: "South Africa",
    slug: "cape-town",
    image: capeTown,
  },
  { name: "Phuket", country: "Thailand", slug: "thailand", image: phuket },
];

const tabItems = [
  "Destinations for arts and culture",
  "Destinations for outdoor adventure",
  "Mountain cabins",
  "Beach destinations",
  "Popular destinations",
  "Unique stays",
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <>

    <Navbar />
    <div className="d-flex justify-content-center py-3 bg-black">
<SearchBar variant="hero" />
    </div>

  
<HeroSection>
  

  <HeroCTA>
    <p>Not sure where to go? Perfect.</p>
    <button onClick={() => navigate("/locations/all")}>
      I&apos;m flexible
    </button>
  </HeroCTA>
</HeroSection>

      

      <div className="container-fluid px-5 py-5">
        <h2 className="fw-bold mb-4">Inspiration for your next trip</h2>
        <InspirationSection>
          <div className="row row-cols-2 row-cols-md-5 g-4">
            {locationCards.map((loc) => (
              <div className="col" key={loc.slug}>
                <div
                  className="card"
                  onClick={() => navigate(`/locations/${loc.slug}`)}
                >
                  <img
                    src={loc.image}
                    className="card-img-top"
                    alt={loc.name}
                  />
                  <div className="card-body bg-danger ">
                    <h5 className="card-title text-white ps-2">{loc.name}</h5>
                    <p className="card-text text-white ps-2">{loc.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InspirationSection>

        <h2 className="fw-bold mb-4">Discover Airbnb Experiences</h2>
        <ExperienceSection>
          <div className="card text-bg-dark">
            <img src={trip} className="card-img" alt="Adventures" />
            <div className="card-img-overlay">
              <h2 className="experience-card-title">Things to do on your trip</h2>
              <Button color="light" className="ms-4">Experiences</Button>
            </div>
          </div>
          <div className="card text-bg-dark">
            <img src={cooking} className="card-img" alt="Cooking" />
            <div className="card-img-overlay">
              <h2 className="experience-card-title">Things to do from home</h2>
              <Button color="light" className="ms-4">Online Experiences</Button>
            </div>
          </div>
        </ExperienceSection>

        <div className="row align-items-center mb-5 py-4">
          <div className="col-md-6">
            <h3 className="fw-bold">Shop Airbnb gift cards</h3>
            <Button color="dark" type="button">
              Learn more
            </Button>
          </div>
          <div className="col-md-6">
            <img
              src={giftcards}
              className="img-fluid rounded"
              alt="Gift Cards"
            />
          </div>
        </div>

        <div className="card text-bg-dark mb-5 rounded-3 overflow-hidden h-50">
          <img
            src={question}
            className="card-img h-100 object-fit-cover"
            alt="Questions"
          />
        </div>

        <ListGroup items={tabItems} heading="Inspiration for future getaways" />

        <DestinationContainer>
          <div className="grid">
            <div className="grid-item">
              <div className="title">Eiffel Tower</div>
              <div className="sub-title">Paris, France</div>
            </div>
         

          
            <div className="grid-item">
              <div className="title">Eiffel Tower</div>
              <div className="sub-title">Paris, France</div>
            </div>
          

          
            <div className="grid-item">
              <div className="title">Eiffel Tower</div>
              <div className="sub-title">Paris, France</div>
            </div>
          

          
            <div className="grid-item">
              <div className="title">Eiffel Tower</div>
              <div className="sub-title">Paris, France</div>
            </div>
          

          
            <div className="grid-item">
              <div className="title">Eiffel Tower</div>
              <div className="sub-title">Paris, France</div>
            </div>
         

          
            <div className="grid-item">
              <div className="title">Eiffel Tower</div>
              <div className="sub-title">Paris, France</div>
            </div>
          

          
            <div className="grid-item">
              <div className="title">Eiffel Tower</div>
              <div className="sub-title">Paris, France</div>
            </div>
          

          
            <div className="grid-item">
              <div className="title">Eiffel Tower</div>
              <div className="sub-title">Paris, France</div>
            </div>
         

         
            <div className="grid-item">
              <div className="title">Eiffel Tower</div>
              <div className="sub-title">Paris, France</div>
            </div>
          

          
            <div className="grid-item">
              <div className="title">Eiffel Tower</div>
              <div className="sub-title">Paris, France</div>
            </div>
         

          
            <div className="grid-item">
              <div className="title">Eiffel Tower</div>
              <div className="sub-title">Paris, France</div>
            </div>
          

          
            <div className="grid-item">
              <div className="title">Eiffel Tower</div>
              <div className="sub-title">Paris, France</div>
            </div>
             </div>
          
        </DestinationContainer>
      </div>

      <Footer />
    </>
  );
};

export default Home;
