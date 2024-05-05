'use client';
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios"; // Import Axios library
import {Message} from "./message";
function Mail() {
  const [email, setEmail] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/forgot-password", // URL
        { email }, // Request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.status === 200) {
        Message('Email sent !');
      } else {
        Message('Error occurred !');
      }
    } catch (error) {
      Message('Error occurred !');
    }
  };

  return (
    <div className="formInner">
      <div className="imgInner">
        <Image src="/media/images/reg.jpg" alt="" width={1000} height={1000} />
      </div>
      <div className="form" onSubmit={handleLogin}>
        <form action="">
          <header>
            <h1 className="mc">Forgot Password</h1>
          </header>
          <div className="sed">
            <h2>Mail Address Here</h2>
            <span>
              Enter the email address associated <br /> with your account.
            </span>
          </div>
          <div className="inputs">
            <div className="input inputTwo">
              <span>Email</span>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Image src="/media/icons/mail.png" alt="" width={200} height={200} />
            </div>
          </div>
          <button type="submit" className="btn w100">
            Recover password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Mail;
