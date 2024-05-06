"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios"; // Import Axios
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Message } from "./message.js";

function HomeContent() {
    const [posts, setPost] = useState([]);
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/posts")
            .then((response) => {
                console.log(response.data.data);
                setPost(response.data.data);
            })
            .catch((error) => {
                Message("Error occurred");
            });
    }, [token]);

    async function getContact(token) {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/admin/contact-us",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            Message("error");
        }
    }
    async function addToFav(el, id) {
        if (token) {
            const button = el.target;
            if (button.classList.contains("fa-heart")) {
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
            <div className="homeCont">
                <div className="box hmdw">
                    <div className="homeT">
                        <h1>Let’s find a home That’s perfect for you</h1>
                        <p>
                            Unlock your perfect student living experience now!
                        </p>
                        <span>
                            At StudiRent , we make finding your dream home a
                            breeze. Whether you are looking to buy, sell, or
                            rent, we have the perfect solution for you. With our
                            extensive listings, intuitive search tools, and
                            dedicated support, your real estate journey starts
                            here.
                        </span>
                        <a href="/posts">Discover Now</a>
                    </div>
                    <Image
                        src="/media/about.png"
                        alt=""
                        width={500}
                        height={600}
                    />
                </div>
            </div>
            <div className="box aboutCo">
                <header>
                    <h1>About Us</h1>
                </header>
                <p>
                    &quot;Our website aims to assist students in finding
                    suitable accommodation that matches their needs in terms of
                    affordability, location, and amenities, ensuring they can
                    focus on their studies without the stress of searching for
                    housing. We provide a comprehensive platform where students
                    can easily browse through a wide range of options, enabling
                    them to discover the perfect living space that fits both
                    their budget and preferences, thus creating an environment
                    conducive to academic success.&quot;
                </p>
                <a href="/about">See More</a>
            </div>
            <div className="box m0a slider">
                <header>
                    <h1>Posts</h1>
                </header>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={3}
                    breakpoints={{
                        300: {
                            slidesPerView: 1,
                        },
                        500: {
                            slidesPerView: 1.3,
                        },
                        600: {
                            slidesPerView: 1.7,
                        },
                        800: {
                            slidesPerView: 2,
                        },
                        925: {
                            slidesPerView: 2.5,
                        },
                        1151: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {posts.map((e, i) => (
                        <SwiperSlide key={e.id}>
                            <div className="postxfd">
                                <span className="labelPost">
                                    {e.post_category}
                                </span>
                                <img src={e.image_paths[0]} alt="Image" />
                                <h2>{e.title}</h2>
                                <div className="feats">
                                    <div className="ft">
                                        <Image
                                            className="postcfImg"
                                            src={
                                                "/media/icons/Place-Marker.png"
                                            }
                                            width={20}
                                            height={20}
                                            alt=""
                                        />
                                        {e.address}
                                    </div>
                                    <div className="ft">
                                        <Image
                                            className="postcfImg"
                                            src={"/media/icons/Open Door.png"}
                                            width={20}
                                            height={20}
                                            alt=""
                                        />
                                        {e.num_of_rooms} Rooms
                                    </div>
                                    <div className="ft">
                                        <Image
                                            className="postcfImg"
                                            src={
                                                "/media/icons/Sleeping in Bed.png"
                                            }
                                            width={20}
                                            height={20}
                                            alt=""
                                        />
                                        {e.num_of_bedrooms} Bedrooms
                                    </div>
                                    <div className="ft">
                                        <Image
                                            className="postcfImg"
                                            src={"/media/icons/Bathtub.png"}
                                            width={20}
                                            height={20}
                                            alt=""
                                        />
                                        {e.num_of_bathrooms} Bathrooms
                                    </div>
                                    <div className="ft">
                                        <Image
                                            className="postcfImg"
                                            src={"/media/icons/Kitchen.png"}
                                            width={20}
                                            height={20}
                                            alt=""
                                        />
                                        {e.num_of_kitchens} Kitchen
                                    </div>
                                </div>
                                <div className="pricexx">
                                    <span>EGP {e.price}</span>
                                    <a href={"/posts/" + e.id}>See More</a>
                                </div>
                                <button
                                    className="fav"
                                    onClick={(el) => {
                                        addToFav(el, e.id);
                                    }}
                                >
                                    <i className="fa-solid fa-heart"></i>
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <a href="/posts" className="btn2 m0a">
                    See All posts
                </a>
            </div>
            <div className="join">
                <div className="box joinCont">
                    <div className="joinText">
                        <h1>
                            Join us and register your <br />
                            property now !
                        </h1>
                        <span>
                            Soluta alias incidunt. Omnis facilis aliquid sed
                            laboriosam voluptatem. <br />
                            Voluptatem similique perspiciatis est.
                        </span>
                    </div>
                    <a href="##" className="btn bacWhite">
                        Subscribe Now
                    </a>
                </div>
            </div>
        </>
    );
}

export default HomeContent;
