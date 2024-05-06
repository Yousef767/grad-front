"use client";
import React, { useEffect, useState } from "react";
import { Message } from "./message.js";
import { useRouter } from "next/navigation";
import axios from "axios";
function AddPost() {
  const router = useRouter();
  const name = sessionStorage.getItem("name");
  const token = sessionStorage.getItem("token");
  const type = sessionStorage.getItem("type");

  if (token === null || type === "user") {
    router.push("/login");
  }

  const [state, setState] = useState("create");
  const [editPost, setEditPost] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [sellerPosts, setSellerPosts] = useState([]);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [post_for, setpost_for] = useState("student");
  const [post_category, setpost_category] = useState("Rent");
  const [city, setcity] = useState("");
  const [address, setaddress] = useState("");
  const [num_of_bedrooms, setnum_of_bedrooms] = useState(0);
  const [num_of_kitchens, setnum_of_kitchens] = useState(0);
  const [num_of_bathrooms, setnum_of_bathrooms] = useState(0);
  const [num_of_rooms, setnum_of_rooms] = useState(0);
  const [price, setprice] = useState(0);
  const [images, setimages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/posts`,
        {
          title,
          post_for,
          description,
          post_category,
          city,
          address,
          num_of_bedrooms,
          num_of_kitchens,
          num_of_bathrooms,
          num_of_rooms,
          price,
          images,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setState("show");
      Message("Post added sucessfully");
    } catch (error) {
      Message("Failed to add post !");
    }
  };
  const handleEdit = async (event,id) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/posts/${id}`,
        {
          title,
          post_for,
          description,
          post_category,
          city,
          address,
          num_of_bedrooms,
          num_of_kitchens,
          num_of_bathrooms,
          num_of_rooms,
          price,
          images,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      Message(response.data.message);
      setShowEdit(false);
      getUserPosts();
      resetStates();
    } catch (error) {
      Message("Failed to edit post !");
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/posts/myposts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setSellerPosts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserPosts();
  }, [state]);

  const removePost = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Message(response.data.message);
    } catch (error) {
      Message("Failed to delete the post");
    }
    getUserPosts();
    router.refresh();
  };
  const getPost = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditPost(response.data);
      setShowEdit(true);
    } catch (error) {
      Message("Failed to get the post");
    }
  };

  const handleFiles = (e) => {
    let files = e.target.files;
    setimages(files);
    let c1 = document.getElementById("c1");
    c1.innerHTML = "";
    for (let i = 0; i < files.length; i++) {
      c1.innerHTML += `
      <div class="imgx" >
                <img src="${URL.createObjectURL(files[i])}" alt="" />
              </div>
      `;
    }
  };

  function resetStates(){
    settitle('');
    setdescription('');
    setpost_for('');
    setaddress('');
    setcity('');
    setimages([]);
    setpost_for('student');
    setpost_category('Rent');
    setnum_of_rooms('');
    setnum_of_bathrooms('');
    setnum_of_bedrooms('');
    setnum_of_kitchens('');
  }
  return (
    <div className="center cc" style={{ flexDirection: "column", gap: "30px" }}>
      <div className="box poSx">
        <div className="btsx">
          <button>
            <a href="/">
              <i className="fa-regular fa-angles-left"></i>
              Back To Site
            </a>
          </button>
        </div>
      </div>
      <div className="box poSx">
        <div className="btsx">
          <button
            onClick={() => {
              setState("create");
            }}
          >
            Create Post
          </button>
          <button
            onClick={() => {
              setState("show");
            }}
          >
            Show my Posts
          </button>
        </div>
        {state === "create" ? (
          <form className="formx" onSubmit={handleSubmit}>
            <div className="input">
              <span>post title :</span>
              <input
                type="text"
                placeholder="Title"
                onChange={(e) => {
                  settitle(e.target.value);
                }}
              />
            </div>
            <div className="input">
              <span>post description :</span>
              <textarea
                placeholder="Description"
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="twoIn">
              <div className="input">
                <span>Address :</span>
                <input
                  type="text"
                  placeholder="Address"
                  onChange={(e) => {
                    setaddress(e.target.value);
                  }}
                />
              </div>
              <div className="input">
                <span>City :</span>
                <input
                  type="text"
                  placeholder="City"
                  onChange={(e) => {
                    setcity(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="fourIn">
              <div className="input">
                <span>Rooms Num :</span>
                <input
                  type="number"
                  placeholder="Rooms Num"
                  onChange={(e) => {
                    setnum_of_rooms(e.target.value);
                  }}
                />
              </div>
              <div className="input">
                <span>Bedrooms Num :</span>
                <input
                  type="number"
                  placeholder="Bedrooms Num"
                  onChange={(e) => {
                    setnum_of_bedrooms(e.target.value);
                  }}
                />
              </div>
              <div className="input">
                <span>Kitchens Num :</span>
                <input
                  type="number"
                  placeholder="Kitchens Num"
                  onChange={(e) => {
                    setnum_of_kitchens(e.target.value);
                  }}
                />
              </div>
              <div className="input">
                <span>Bathrooms Num :</span>
                <input
                  type="number"
                  placeholder="Bathrooms Num"
                  onChange={(e) => {
                    setnum_of_bathrooms(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="twoIn">
              <div className="input">
                <span>Total Price :</span>
                <input
                  type="number"
                  placeholder="Total Price "
                  onChange={(e) => {
                    setprice(e.target.value);
                  }}
                />
              </div>
              <div className="input">
                <span>Post For :</span>
                <select
                  defaultValue={"student"}
                  onChange={(e) => {
                    setpost_for(e.target.value);
                  }}
                >
                  <option value="student">Student</option>
                  <option value="family">Family</option>
                </select>
              </div>
              <div className="input">
                <span>Category :</span>
                <select
                  defaultValue={"student"}
                  onChange={(e) => {
                    setpost_category(e.target.value);
                  }}
                >
                  <option value="rent">Rent</option>
                  <option value="buy">Buy</option>
                </select>
              </div>
            </div>
            <div className="dflex">
              <div className="input">
                <span>Apartment photos :</span>
                <label htmlFor="images">Add Photos</label>
                <input
                  type="file"
                  accept="image/*"
                  id="images"
                  hidden
                  multiple
                  onChange={(e) => {
                    handleFiles(e);
                  }}
                />
              </div>
              <div className="imagesInrz" id="c1"></div>
            </div>
            <div className="btsx">
              <button>add Post</button>
            </div>
          </form>
        ) : (
          <div className="ov">
            {sellerPosts.length > 0 ? (
              <table className="tg">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Img</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Post for</th>
                    <th>Category</th>
                    <th>city</th>
                    <th>address</th>
                    <th>Rooms</th>
                    <th>Bedrooms</th>
                    <th>Bathrooms</th>
                    <th>Kitchens</th>
                    <th>price</th>
                    <th>Control tools</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerPosts.map((e, i) => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>
                        <img src={e.image_paths[0]} alt="" />
                      </td>
                      <td>{e.title}</td>
                      <td>{e.description}</td>
                      <td>{e.post_for}</td>
                      <td>{e.post_category}</td>
                      <td>{e.city}</td>
                      <td>{e.address}</td>
                      <td>{e.num_of_rooms}</td>
                      <td>{e.num_of_bedrooms}</td>
                      <td>{e.num_of_bathrooms}</td>
                      <td>{e.num_of_kitchens}</td>
                      <td>{e.price}</td>
                      <td className="tools">
                        <i
                          className="fa-regular fa-edit"
                          onClick={() => {
                            getPost(e.id);
                          }}
                        ></i>
                        <i
                          className="fa-regular fa-trash-can"
                          onClick={() => {
                            removePost(e.id);
                          }}
                        ></i>
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <span>No Posts Yet.</span>
            )}
          </div>
        )}
      </div>
      {showEdit ? (
        <div className="formPop">
        <form className="formx" onSubmit={(e)=>{handleEdit(e,editPost.id)}}>
          <div className="input">
            <span>post title :</span>
            <input
              type="text"
              placeholder="Title"
              defaultValue={editPost.title}
              onChange={(e) => {
                settitle(e.target.value);
              }}
            />
          </div>
          <div className="input">
            <span>post description :</span>
            <textarea
              placeholder="Description"
              defaultValue={editPost.description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="twoIn">
            <div className="input">
              <span>Address :</span>
              <input
                type="text"
                placeholder="Address"
                defaultValue={editPost.address}
                onChange={(e) => {
                  setaddress(e.target.value);
                }}
              />
            </div>
            <div className="input">
              <span>City :</span>
              <input
                type="text"
                placeholder="City"
                defaultValue={editPost.city}
                onChange={(e) => {
                  setcity(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="fourIn">
            <div className="input">
              <span>Rooms Num :</span>
              <input
                type="number"
                placeholder="Rooms Num"
                defaultValue={editPost.num_of_rooms}
                onChange={(e) => {
                  setnum_of_rooms(e.target.value);
                }}
              />
            </div>
            <div className="input">
              <span>Bedrooms Num :</span>
              <input
                type="number"
                placeholder="Bedrooms Num"
                defaultValue={editPost.num_of_bedrooms}
                onChange={(e) => {
                  setnum_of_bedrooms(e.target.value);
                }}
              />
            </div>
            <div className="input">
              <span>Kitchens Num :</span>
              <input
                type="number"
                placeholder="Kitchens Num"
                defaultValue={editPost.num_of_kitchens}
                onChange={(e) => {
                  setnum_of_kitchens(e.target.value);
                }}
              />
            </div>
            <div className="input">
              <span>Bathrooms Num :</span>
              <input
              defaultValue={editPost.num_of_bedrooms}
                type="number"
                placeholder="Bathrooms Num"
                onChange={(e) => {
                  setnum_of_bathrooms(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="twoIn">
            <div className="input">
              <span>Total Price :</span>
              <input
                type="number"
                defaultValue={editPost.price}
                placeholder="Total Price "
                onChange={(e) => {
                  setprice(e.target.value);
                }}
              />
            </div>
            <div className="input">
              <span>Post For :</span>
              <select
              defaultValue={editPost.post_for}
                onChange={(e) => {
                  setpost_for(e.target.value);
                }}
              >
                <option value="student">Student</option>
                <option value="family">Family</option>
              </select>
            </div>
            <div className="input">
              <span>Category :</span>
              <select
              defaultValue={editPost.post_category}
                onChange={(e) => {
                  setpost_category(e.target.value);
                }}
              >
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>
          </div>
          <div className="dflex">
            <div className="input">
              <span>Apartment photos :</span>
              <label htmlFor="images">Add Photos</label>
              <input
                type="file"
                accept="image/*"
                id="images"
                hidden
                multiple
                onChange={(e) => {
                  handleFiles(e);
                }}
              />
            </div>
            <div className="imagesInrz" id="c1"></div>
          </div>
          <div className="btsx">
            <button>Edit Post</button>
          </div>
        </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddPost;
