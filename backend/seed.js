import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { getDevEnviromentVariables } from "./enviroments/env.js";
import User from "./models/User.js";
import Accommodation from "./models/Accommodation.js";

const seedData = async () => {
  await mongoose.connect(getDevEnviromentVariables().db_uri);
  console.log("Connected for seeding...");

  await User.deleteMany({});
  await Accommodation.deleteMany({});

  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("password123", 10);

  const admin = await User.create({
    username: "Admin User",
    email: "admin@airbnb.com",
    password: adminPassword,
    role: "admin",
  });

  await User.create({
    username: "Kelly Smith",
    email: "kelly@gmail.com",
    password: userPassword,
    role: "user",
  });

  const listings = [
    {
      title: "Modern Apartment in New York",
      location: "New York",
      locationSlug: "new-york",
      type: "Entire apartment",
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      amenities: ["wifi", "kitchen", "free parking"],
      rating: 4.5,
      reviews: 320,
      price: 320,
      host: "Johann",
      hostId: admin._id,
      images: [
        "https://www.civitatis.com/f/estados-unidos/nueva-york/galeria/carteles-publicitarios-times-square.jpg",
        "https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_3840,g_auto/f_auto/q_auto/v1/new-york-city-central-park?_a=BAVT+OE80",
        "https://cdn.sanity.io/images/nxpteyfv/goguides/3891a75f142b6e94613f464c4f68a607559122df-1600x1066.jpg",
        "https://dynamic-media.tacdn.com/media/photo-o/2e/b8/84/0b/caption.jpg?w=1400&h=1000&s=1",
        "https://media.cntraveler.com/photos/6658c1042e8a4769c212dc59/1:1/w_1600,c_limit/staten%20island%20ferry_GettyImages-517211760.jpg",
      ],
      weeklyDiscount: 0,
      cleaningFee: 50,
      serviceFee: 50,
      occupancyTaxes: 30,
      enhancedCleaning: true,
      selfCheckIn: true,
      description:
        "Stay in the heart of New York City in this modern apartment. Close to popular attractions, restaurants, and public transport. Enjoy a spacious layout with all the amenities you need for a comfortable stay.",
      bedroomImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmvxVK21NYMcUCwM5969EwjZWbwbLcsvdqU1UZsCnVrQ&s=10",
      userReviews: [
        {
          name: "Alice",
          date: "March 2023",
          comment: "Amazing place, very clean and well-located.",
          avatar: "",
        },
        {
          name: "Dave",
          date: "December 2022",
          comment: "Fantastic stay! The location is perfect.",
          avatar: "",
        },
        {
          name: "Bob",
          date: "February 2023",
          comment:
            "Great communication with the host and easy check-in process.",
          avatar: "",
        },
        {
          name: "Eve",
          date: "November 2022",
          comment: "Very clean and spacious. Would definitely come back.",
          avatar: "",
        },
        {
          name: "Carol",
          date: "January 2023",
          comment: "The apartment was exactly as described. Highly recommend.",
          avatar: "",
        },
        {
          name: "Frank",
          date: "October 2022",
          comment: "Excellent value for the price. Loved the neighborhood.",
          avatar: "",
        },
      ],
    },
    {
      title: "Charming Home in Paris",
      location: "Paris",
      locationSlug: "paris",
      type: "Entire home",
      guests: 6,
      bedrooms: 3,
      bathrooms: 3,
      amenities: ["wifi", "kitchen", "free parking"],
      rating: 4.5,
      reviews: 120,
      price: 400,
      host: "Marie",
      hostId: admin._id,
      images: [
        "https://media-cdn.tripadvisor.com/media/photo-c/1280x250/17/15/6d/d6/paris.jpg",
        "https://media.istockphoto.com/id/2211711751/photo/eiffel-tower-and-streets-of-paris-in-spring-france.jpg?s=612x612&w=0&k=20&c=Li-RQ9Kz_2fme6HNODVE8x29vAbcEC2i182xHz6cFjU=",
        "https://www.royalcaribbean.com/media-assets/pmc/content/dam/shore-x/paris-le-havre-leh/lh17-paris-sightseeing-without-lunch/stock-photo-skyline-of-paris-with-eiffel-tower-at-sunset-in-paris-france-eiffel-tower-is-one-of-the-most-752725282.jpg?w=1024",
        "https://media.istockphoto.com/id/1952253409/photo/skyline-paris.jpg?s=612x612&w=0&k=20&c=9SYdOHagICkGRj9n_MAKnlNEAxb8ONEhqkXqrOdGav4=",
        "https://media.istockphoto.com/id/1097395338/photo/montmartre-in-paris-france.jpg?s=612x612&w=0&k=20&c=IxB_ueE_FcnPzHBMMhiNKrXTE5vySVBX5ualnWDdh60=",
      ],
      weeklyDiscount: 0,
      cleaningFee: 50,
      serviceFee: 50,
      occupancyTaxes: 30,
      enhancedCleaning: true,
      selfCheckIn: false,
      description:
        "Experience the charm of Paris in this beautiful home near the Eiffel Tower. Perfect for families or groups exploring the City of Light.",
      bedroomImage:
        "https://media.istockphoto.com/id/2182177323/photo/breakfast-in-bed-in-paris.jpg?s=612x612&w=0&k=20&c=5NNYhHRudkdqsMLmez3SHc5lTAvfeDNemDdywZnVXH4=",
      userReviews: [
        {
          name: "Sophie",
          date: "April 2023",
          comment: "Beautiful home in a great location.",
          avatar: "",
        },
        {
          name: "Pierre",
          date: "January 2023",
          comment: "Loved every minute of our stay.",
          avatar: "",
        },
      ],
    },
    {
      title: "Cozy Room in Tokyo",
      location: "Tokyo",
      locationSlug: "tokyo",
      type: "Private room",
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["wifi", "kitchen"],
      rating: 4.5,
      reviews: 85,
      price: 150,
      host: "Yuki",
      hostId: admin._id,
      images: [
        "https://media.cntraveller.com/photos/6343df288d5d266e2e66f082/16:9/w_2240,c_limit/tokyoGettyImages-1031467664.jpeg",
        "https://media.digitalnomads.world/wp-content/uploads/2021/02/20120635/tokyo-for-digital-nomads.jpg",
        "https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2024/04/16202707/Tokyo-Itinerary.jpg?tr=w-1366,f-jpg,pr-true",
        "https://travelrebels.com/wp-content/uploads/2025/11/dit-zijn-de-mooiste-plekken-van-tokyo.jpg",
        "https://images.goway.com/production/styles/article_featured_image_2xl/s3/featured_images/japan_tokyo_akihabara_AdobeStock_295310062_Editorial_Use_Only.jpg.webp?VersionId=QsALmYD2qaEJEwTHHBOtnO3bgPlu56hp&h=43fc81ba&itok=ZRsG7bGh",
      ],
      weeklyDiscount: 0,
      cleaningFee: 30,
      serviceFee: 30,
      occupancyTaxes: 20,
      enhancedCleaning: true,
      selfCheckIn: true,
      description:
        "A cozy private room in the heart of Tokyo. Experience authentic Japanese living with easy access to trains and local cuisine.",
      bedroomImage:
        "https://www.annees-de-pelerinage.com/wp-content/uploads/2017/11/bedroom-aman-tokyo-1024x683.jpg",
      userReviews: [
        {
          name: "Ken",
          date: "May 2023",
          comment: "Great location and friendly host.",
          avatar: "",
        },
      ],
    },
    {
      title: "Beachfront Apartment in Cape Town",
      location: "Cape Town",
      locationSlug: "cape-town",
      type: "Entire apartment",
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      amenities: ["wifi", "kitchen", "free parking", "pool"],
      rating: 4.7,
      reviews: 95,
      price: 280,
      host: "Thabo",
      hostId: admin._id,
      images: [
        "https://www.snoezelsontheroad.com/wp-content/uploads/2025/08/zuid-afrika-scaled.jpg",
        "https://www.southafrica-spirit.com/images/destinations/cape-town/hero-960.webp",
        "https://www.capetown.travel/wp-content/uploads/table-mountain-1.jpg",
        "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/12/4e/7e/75.jpg",
        "https://www.tripsavvy.com/thmb/2q3gz_w8ITNKlDUIb_Ht0BjU5Ho=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/colorful-houses-in--bo-kaap-malay-quarter--cape-town-1139829010-904f6d70a7924d19a454296d3db7c884.jpg",
      ],
      weeklyDiscount: 50,
      cleaningFee: 50,
      serviceFee: 50,
      occupancyTaxes: 30,
      enhancedCleaning: true,
      selfCheckIn: true,
      description:
        "Wake up to stunning ocean views in this beachfront apartment in Cape Town. Table Mountain and the V&A Waterfront are nearby.",
      bedroomImage:
        "https://images.trvl-media.com/lodging/2000000/1910000/1909900/1909894/4530a2f4.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      userReviews: [
        {
          name: "Sarah",
          date: "June 2023",
          comment: "Incredible views and perfect location.",
          avatar: "",
        },
      ],
    },
    {
      title: "Tropical Villa in Thailand",
      location: "Thailand",
      locationSlug: "thailand",
      type: "Entire villa",
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      amenities: ["wifi", "kitchen", "pool", "free parking"],
      rating: 4.8,
      reviews: 200,
      price: 350,
      host: "Somchai",
      hostId: admin._id,
      images: [
        "https://cdn.kimkim.com/files/a/images/d66eeb7e3f5dfaca3ec8bfa983ed02431c7bc226/original-6a5fba9f828b8ba68278060586640cb8.jpg",
        "https://passportandstamps.com/wp-content/uploads/2023/10/Entrance-of-Chiang-Rai-Blue-Temple-1024x769.jpg",
        "https://i.natgeofe.com/n/f12e6dc0-3515-45cd-9657-7c0d1a87a512/street-bangkok-thailand.jpg?w=2560&h=1706",
        "https://media.connections.be/image/upload/c_fill,g_auto,q_80,w_750,f_auto//v1754649470/Blog/Asia/Thailand/Paragraph_15_Thailand.jpg",
        "https://www.emperortraveline.com/wp-content/uploads/2021/12/Thailand.jpg",
      ],
      weeklyDiscount: 100,
      cleaningFee: 75,
      serviceFee: 60,
      occupancyTaxes: 40,
      enhancedCleaning: true,
      selfCheckIn: true,
      description:
        "Escape to paradise in this tropical villa surrounded by lush gardens and a private pool. Perfect for a relaxing getaway in Thailand.",
      bedroomImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfQvBPQlIWoTunETmeg9YWuu3HlHyAtrs_XuQxHSZSLndkvhDTFMD2IjM&s=10",
      userReviews: [
        {
          name: "Lisa",
          date: "July 2023",
          comment: "Paradise on earth! Will come back.",
          avatar: "",
        },
      ],
    },
  ];

  await Accommodation.insertMany(listings);
  console.log("Seed complete! Admin login: admin@airbnb.com / admin123");
  console.log("User login: kelly@gmail.com / password123");
  process.exit(0);
};

seedData().catch((err) => {
  console.error(err);
  process.exit(1);
});
