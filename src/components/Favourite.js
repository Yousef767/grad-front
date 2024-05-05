"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Message } from "./message";
import axios from "axios"; // Import Axios

function Favourite() {
  const [posts, setPost] = useState([]);
  const router = useRouter();
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");
  if (token === null) {
    router.push("/login");
  }
  useEffect(() => {
    fetchFavorites();
  }, []);
  
  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/user/${name}/favorites`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }
      const data = await response.json();
      console.log(data.favorites.data);
      setPost(data.favorites.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  async function removeFromFav(el, id) {
    if (token) {
      const button = el.target;
      if (button.classList.contains('fa-heart')) {
        button.parentElement.parentElement.remove();
      } else {
        button.parentElement.remove();
      }
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/posts/${id}/favorite`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Message("Post removed from favorites");
        fetchFavorites();
      } catch (error) {
        Message("Error occurred !");
      }
    } else {
      Message('Login first to remove from favorites');
    }
  }
  return (
    <>
      <div className="box m0a postsInx pb70">
        {posts.length > 0 ? (
          posts.map((e, i) => (
            <div className="postxfd" key={e.id}>
              <img
                src={e.images_urls[0]}
                alt="Image"
              />
              <h2>{e.title}</h2>
              <div className="feats">
                <div className="ft">
                  <Image
                    className="postcfImg"
                    src={"/media/icons/Place-Marker.png"}
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
                    src={"/media/icons/Sleeping in Bed.png"}
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
              <button className="fav added" onClick={(el) => {
                    removeFromFav(el, e.id);
                  }}>
                <i
                  className="fa-solid fa-trash-can"
                ></i>
              </button>
            </div>
          ))
        ) : (
          <div className="noFav">No Favourites Yet</div>
        )}
      </div>
    </>
  );
}

export default Favourite;
