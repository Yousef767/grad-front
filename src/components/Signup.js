"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios"; // Import Axios
import {Message} from "./message";
import { useRouter } from "next/navigation";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [user_type, setType] = useState("user");
  const [password, setPassword] = useState("");
  const [password_confirmation, confirmPassword] = useState("");
  const router = useRouter();

  const handleSign = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/register", {
        name,
        username,
        email,
        password,
        password_confirmation,
        phone,
        user_type,
      });
      if (response.status === 201) {
        Message(response.data.message);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userTybe", response.data.user.user_type);
        sessionStorage.setItem("name", response.data.user.username);
        router.push("/");
      } else {
        Message("Registering failed !");
      }
    } catch (error) {
      Message("Registering failed !");
    }
  };

  return (
    <div className="formInner" style={{ height: "auto", overflow: "visible" }}>
      <div className="imgInner h130vh">
        <Image src="/media/images/reg.jpg" alt="" width={1000} height={1500} />
      </div>
      <div className="form" style={{ height: "auto" }}>
        <form action="" style={{ height: "auto" }} onSubmit={handleSign}>
          <header>
            <h1>Signup</h1>
            <span>Fill your personal details and get started!</span>
          </header>
          <div className="inputs p0">
            <div className="inputs">
              <div className="input">
                <input
                  type="text"
                  placeholder="Name"
                  spellCheck="false"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Image
                  src="/media/icons/name.png"
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Username"
                  spellCheck="false"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <Image
                  src="/media/icons/User.png"
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Email address"
                  spellCheck="false"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Image
                  src="/media/icons/mail.png"
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
              <div className="input">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  spellCheck="false"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <Image
                  src="/media/icons/phone.png"
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
              <div className="input">
                <div className="select">
                  <select
                    name=""
                    id=""
                    defaultValue={user_type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  >
                    <option value="user">Type : User</option>
                    <option value="seller">Type : Seller</option>
                  </select>
                </div>
                <Image
                  src="/media/icons/User.png"
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
              <div className="input">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <Image
                  src="/media/icons/LockSimpleOpen.png"
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
              <div className="input">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    confirmPassword(e.target.value);
                  }}
                />
                <Image
                  src="/media/icons/CheckSquare.png"
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn w100"
            style={{ padding: "20px 0" }}
          >
            Register Now
          </button>
          <div className="dont">
            Dont have an account? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
