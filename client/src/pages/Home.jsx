import React from "react";
import Banner from "../components/home/Banner";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Testimonial from "../components/home/Testimonial";
import CallToAction from "../components/home/CallToAction";
import Footer from "../components/home/Footer";
const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Hero></Hero>
      <Features></Features>
      <Testimonial />
      <CallToAction></CallToAction>
      <Footer></Footer>
    </>
  );
};

export default Home;
