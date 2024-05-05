import React, { useEffect, useState } from "react";
import Image from "next/image";
import {Message} from "./message";
import axios from "axios";

function PostsInner() {
  const token = sessionStorage.getItem('token');
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Initially assuming there is 1 page

  useEffect(() => {
    fetchPosts();
  }, [currentPage]); // Fetch posts whenever currentPage changes
  
  const fetchallPosts = () => {
    fetch(`http://127.0.0.1:8000/posts`)
    .then((res) => res.json())
    .then((data) => {
      setTotalPages(Math.ceil(data.total / 6));
    });
  };
  useEffect(() => {
    fetchallPosts();
  }, []); // Fetch posts whenever currentPage changes

  const fetchPosts = () => {
    fetch(`http://127.0.0.1:8000/posts?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
      });
  };

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
    console.log(el);
    console.log(id);
    if (token) {
      const button = el.target;
      if (button.classList.contains('fa-heart')) {
        button.parentElement.classList.add('added');
      } else {
        button.classList.add('added');
      }
      try {
        const response = await axios.post(`http://127.0.0.1:8000/posts/${id}/favorite`,null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Message("Post added to favorites");
      } catch (error) {
        Message("Error occurred !");
      }
    } else {
      Message('Login first to add favorites');
    }
  }

  return (
    <>
      <div className="box m0a postsInx">
        {/* Render posts */}
        {posts.map((post) => (
          <div className="postxfd" key={post.id}>
            <img src={"http://127.0.0.1:8000" + post.image_paths[0]} alt="Image" />
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
              <span>EGP {post.price}</span>
              <a href={"/posts/" + post.id}>See More</a>
            </div>
            <button className="fav" onClick={(el) => {
                      addToFav(el,post.id);
                    }}>
                  <i
                    className="fa-solid fa-heart"
                  ></i>
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
                onClick={currentPage > 1 ? handlePrevClick :null}
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
            {Array.from({ length: totalPages }, (_,index) => index + 1).map(
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
                onClick={ currentPage > 1 ? handleNextClick : null }
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
