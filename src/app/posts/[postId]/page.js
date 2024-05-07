"use client";
import Filter from "@/components/Filter";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import { Message } from "../../../components/message.js";
import axios from "axios"; // Import Axios
import "swiper/css";

function PostDetails({ params }) {
  const token = sessionStorage.getItem("token");
  const [imgs, setimgs] = useState([
    { url: "/media/images/s1.jpg" },
    { url: "/media/images/s2.jpg" },
  ]);
  const [post, setPost] = useState({});
  useEffect(() => {
    const shareButton = document.getElementById("shareBtn");
    if (navigator.share) {
      shareButton.addEventListener("click", async () => {
        try {
          await navigator.share({
            title: "Post Details",
            text: "Check out this post",
            url: window.location.href,
          });
        } catch (error) {
          console.error("Error sharing:", error);
        }
      });
    } else {
      shareButton.addEventListener("click", () => {
        alert(
          "Your browser does not support sharing. You can copy the link manually."
        );
      });
    }
  });

  
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/posts/${params.postId}`) 
    .then((response) => {
      setPost(response.data);
      setimgs(response.data.image_paths); 
      })
      .catch((error) => {
        Message('Error occurred')
      });
  }, [params.postId]);

  async function addFav(el, id) {
    if (token) {
      const button = el.target;
      if (button.classList.contains("fa-heart")) {
        button.parentElement.classList.add("added");
      } else if (button.id === "addText") {
        button.parentElement.classList.add("added");
      } else {
        button.classList.add("added");
      }
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/posts/${id}/favorite`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Message("Post added to favorites");
      } catch (error) {
        Message("Error occurred !");
      }
    } else {
      Message("Login first to add favorites");
    }
  }
  return (
    <>
      <Nav />
      <Filter />
      <div className="postDet">
        <div className="box pdst">
          <Swiper
            slidesPerView={1}
            modules={[Pagination, Autoplay]}
            pagination={{
              dynamicBullets: true,
            }}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,
            }}
            className="sw2"
          >
            {imgs.map((e, i) => (
              <SwiperSlide key={i}>
                <img src={imgs[i]} alt="Image" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="diP">
            <h2>Description</h2>
            <p>{post.description}</p>
          </div>
          <div className="det">
            <h2>Details</h2>
            <div className="feats">
              <div className="ft">
                <Image
                  className="postcfImg"
                  src={"/media/icons/Place-Marker.png"}
                  width={20}
                  height={20}
                  alt=""
                />
                {post.city}
              </div>
              <div className="ft">
                <Image
                  className="postcfImg"
                  src={"/media/icons/Place-Marker.png"}
                  width={20}
                  height={20}
                  alt=""
                />
                {post.address}
              </div>
              <div className="ft">
                <Image
                  className="postcfImg"
                  src={"/media/icons/Open Door.png"}
                  width={20}
                  height={20}
                  alt=""
                />
                {post.num_of_rooms} Rooms
              </div>
              <div className="ft">
                <Image
                  className="postcfImg"
                  src={"/media/icons/Sleeping in Bed.png"}
                  width={20}
                  height={20}
                  alt=""
                />
                {post.num_of_bedrooms} Bedrooms
              </div>
              <div className="ft">
                <Image
                  className="postcfImg"
                  src={"/media/icons/Bathtub.png"}
                  width={20}
                  height={20}
                  alt=""
                />
                {post.num_of_bathrooms} Bathrooms
              </div>
              <div className="ft">
                <Image
                  className="postcfImg"
                  src={"/media/icons/Kitchen.png"}
                  width={20}
                  height={20}
                  alt=""
                />
                {post.num_of_kitchens} Kitchen
              </div>
            </div>
            <div className="adtBtns">
              <button
                className="btn favBtn"
                onClick={(el) => {
                  addFav(el, post.id);
                }}
              >
                <span id="addText">Add to favorite </span>
                <i className="fa-solid fa-heart"></i>
              </button>
              <button className="btn" id="shareBtn">
                share <i className="fa-solid fa-share"></i>
              </button>
            </div>
            <div className="prx">
              {post.post_for === "student" ? (
                <>
                  Price{" "}
                  <span>
                    EGP {parseInt(post.price / post.num_of_rooms)}/Room
                  </span>
                </>
              ) : (
                <>
                  Price <span>EGP {post.price} <span id="postfor2">{post.post_for}</span></span>
                </>
              )}
            </div>
            <a href={`${"tel:" + post.phone}`} className="contBtn">
              Call: {post.phone}
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostDetails;
