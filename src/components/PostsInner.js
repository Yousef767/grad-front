import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Message } from "./message";
import axios from "axios";
import { Router } from "next/router";

function PostsInner() {
  const token = sessionStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [maxprice, setmaxPrice] = useState("");
  const [cat, setCat] = useState("");
  const [postfor, setFor] = useState("");
  const [rooms, setrooms] = useState("");
  const [city, setcity] = useState("");
  const [num, setNum] = useState(0);
  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchallPosts = () => {
    fetch(`http://127.0.0.1:8000/posts`)
      .then((res) => res.json())
      .then((data) => {
        setTotalPages(Math.ceil(data.total / 6));
      });
  };
  useEffect(() => {
    fetchallPosts();
  }, []);

  const fetchPosts = () => {
    fetch(`http://127.0.0.1:8000/posts?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
      });
  };
  const fetchPostsf = () => {
    fetch(
      `http://127.0.0.1:8000/posts?max_price=${maxprice}&city=${city}&num_of_rooms=${rooms}&post_for=${postfor}&post_category=${cat}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setPosts(data.data);
      });
  };
  useEffect(() => {
    if (num < 1) {
      document.getElementById("btnA").style.display = "none";
    } else {
      document.getElementById("btnA").style.display = "flex";
    }
    if (num === 0) {
      fetchPosts();
    }
  }, [num]);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

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
  const handelShow = (e) => {
    if (e.target.checked) {
      setNum((e) => e + 1);
      let elid = e.target.id;
      let all = document.querySelectorAll(".FIns .input");
      let a = all.forEach((e, i) => {
        e.id == elid ? (e.style.display = "flex") : "";
      });
    } else {
      let id = e.target.id;
      if (id === "Max Price") {
        setmaxPrice("");
      } else if (id === "Rooms") {
        setrooms("");
      } else if (id === "City") {
        setcity("");
      } else if (id === "Posts For") {
        setFor("");
      } else if (id === "Category") {
        setCat("");
      }
      setNum((e) => e - 1);
      let elid = e.target.id;
      let all = document.querySelectorAll(".FIns .input");
      let a = all.forEach((e, i) => {
        e.id == elid ? (e.style.display = "none") : "";
      });
      let b = all.forEach((e, i) => {
        e.id == elid ? (e.lastElementChild.value = "") : "";
      });
    }
  };
  return (
    <>
      <div className="box m0a filterNew">
        <div className="filterBy">
          <h2>Filter By :</h2>
          <div className="ins">
            <div className="in">
              <input
                type="checkbox"
                name="g0"
                id="Max Price"
                onChange={handelShow}
              />
              <label htmlFor="Max Price">Price</label>
            </div>
            <div className="in">
              <input
                type="checkbox"
                name="g1"
                id="Rooms"
                onChange={handelShow}
              />
              <label htmlFor="Rooms">Num Of Rooms</label>
            </div>
            <div className="in">
              <input
                type="checkbox"
                name="g2"
                id="City"
                onChange={handelShow}
              />
              <label htmlFor="City">City</label>
            </div>
            <div className="in">
              <input
                type="checkbox"
                name="g3"
                id="Posts For"
                onChange={handelShow}
              />
              <label htmlFor="Posts For">Posts For</label>
            </div>
            <div className="in">
              <input
                type="checkbox"
                name="g4"
                id="Category"
                onChange={handelShow}
              />
              <label htmlFor="Category">Category</label>
            </div>
          </div>
        </div>
        <div className="FIns">
          <div className="input input2" id="Max Price">
            <span>Max Price</span>
            <input
              type="number"
              placeholder="EX:3000"
              onChange={(e) => {
                setmaxPrice(e.target.value);
              }}
            />
          </div>
          <div className="input input2" id="Rooms">
            <span>Num OF Rooms</span>
            <input
              type="number"
              placeholder="EX:4"
              onChange={(e) => {
                setrooms(e.target.value);
              }}
            />
          </div>
          <div className="input input2" id="City">
            <span>City</span>
            <input
              type="text"
              placeholder="EX: El-Mansoura"
              onChange={(e) => {
                setcity(e.target.value);
              }}
            />
          </div>
          <div className="input input2" id="Posts For">
            <span>Posts For</span>
            <select
              name="select"
              onChange={(e) => {
                setFor(e.target.value);
              }}
            >
              <option value="">Choose Posts Type</option>
              <option value="student">Student</option>
              <option value="family">Family</option>
            </select>
          </div>
          <div className="input input2" id="Category">
            <span>Category</span>
            <select
              name="select"
              onChange={(e) => {
                setCat(e.target.value);
              }}
            >
              <option value="">Choose Category</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <button className="btn btn3" id="btnA" onClick={fetchPostsf}>
            apply
          </button>
        </div>
      </div>
      <div className="box m0a postsInx">
        {posts.map((post) => (
          <div className="postxfd" key={post.id}>
            <span className="labelPost">{post.post_category}</span>
            <img src={post.image_paths[0]} alt="Image" />
            <h2>{post.title}</h2>
            <div className="feats">
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
            <div className="pricexx">
              <span>
                EGP {post.price} <span id="postfor">{post.post_for}</span>
              </span>
              <a href={"/posts/" + post.id}>See More</a>
            </div>
            <button
              className="fav"
              onClick={(el) => {
                addToFav(el, post.id);
              }}
            >
              <i className="fa-solid fa-heart"></i>
            </button>
          </div>
        ))}
      </div>
      <div className="box m0a p5020">
        <div className="paginationCont">
          <div className="paginations">
            <ul className="spans">
              <li>
                <button
                  className="page-link"
                  onClick={currentPage > 1 ? handlePrevClick : null}
                  disabled={currentPage === 1}
                >
                  <Image
                    src="/media/icons/arrow-prev.svg"
                    alt=""
                    width={50}
                    height={50}
                  />
                </button>
              </li>

              {/* code for rendering pagination links */}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <li key={pageNumber}>
                    <a
                      href="##"
                      className={`page-link ${
                        pageNumber === currentPage ? "active" : ""
                      }`}
                      onClick={() => handlePaginationClick(pageNumber)}
                    >
                      {pageNumber}
                    </a>
                  </li>
                )
              )}
              <li>
                <button
                  className="page-link"
                  onClick={currentPage > 1 ? handleNextClick : null}
                  disabled={currentPage === totalPages}
                >
                  <Image
                    src="/media/icons/arrow-next.svg"
                    alt=""
                    width={50}
                    height={50}
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostsInner;
