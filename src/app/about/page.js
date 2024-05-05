import About from "@/components/About";
import Filter from "@/components/Filter";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import React from "react";

function page() {
  return (
    <>
      <Nav />
      <Filter />
      <About />
      <Footer />
    </>
  );
}

export default page;
