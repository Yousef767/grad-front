"use client";
import React, { useEffect } from "react";
import Nav from "./Nav";
import HomeContent from "./HomeContent";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <Nav />
      <HomeContent />
      <Footer/>
    </>
  );
}

export default Home;
