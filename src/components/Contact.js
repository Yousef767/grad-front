"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Message } from "./message";
import axios from "axios";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/contact-us", {
        name,
        email,
        message,
      });
      console.log(response.status);
      if (response.status === 200) {
        Message("Email Sent !");
      } else {
        Message("Failed to send !");
      }
    } catch (error) {
      Message("Failed to send !");
    }
  };


  return (
    <div className="contact">
      <div className="box">
        <div className="contactForm">
          <form action="" onSubmit={handleSubmit}>
            <h1>Contact Us</h1>
            <span>
              Feel free to contact us any time. We will get back to you as soon
              as we can!
            </span>
            <div className="cForm">
              <input
                type="text"
                placeholder="Name"
                spellCheck="false"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Email"
                spellCheck="false"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <textarea
                name=""
                id=""
                placeholder="Message"
                spellCheck="false"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></textarea>
              <button className="hoverBtn" type="submit">
                send
              </button>
            </div>
          </form>
        </div>
        <div className="cDatax">
          <div className="dCardr">
            <h1>Info</h1>
            <a href="##" className="rw">
              <Image
                width={50}
                height={50}
                src="/media/icons/mail3.png"
                alt=""
              />
              info@studi-rent.com
            </a>
            <a href="##" className="rw">
              <Image
                width={50}
                height={50}
                src="/media/icons/call3.png"
                alt=""
              />
              +201006776709
            </a>
            <a href="##" className="rw">
              <Image
                width={50}
                height={50}
                src="/media/icons/location3.png"
                alt=""
              />
              street , city , country
            </a>
            <a href="##" className="rw">
              <Image
                width={50}
                height={50}
                src="/media/icons/timer.png"
                alt=""
              />
              24 / 7
            </a>
          </div>
          <div className="longT"></div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
