"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Message } from "./message";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const router = useRouter();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        email,
        password,
        remember,
      });
      if (response.status === 200) {
        Message(response.data.message);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userTybe", response.data.user.user_type);
        sessionStorage.setItem("name", response.data.user.username);
        router.push("/");
      } else {
        Message("Login failed !");
      }
    } catch (error) {
      Message("Login failed !");
    }
  };

  return (
    <div className="formInner">
      <div className="imgInner">
        <Image src="/media/images/reg.jpg" alt="" width={1000} height={1000} />
      </div>
      <div className="form">
        <form action="" onSubmit={handleLogin}>
          <header>
            <h1>Login</h1>
            <span>Welcom back to sitname , Let’s get startred!</span>
          </header>
          <div className="inputs">
            <div className="input">
              <input
                type="text"
                placeholder="Email"
                spellCheck="false"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Image
                src={"/media/icons/User.png"}
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
            <div className="rem">
              <div className="chk">
                <input
                  type="checkbox"
                  id="check"
                  defaultChecked={remember}
                  onChange={(e) => {
                    setRemember(e.target.checked);
                  }}
                />{" "}
                <label htmlFor="check">Remember me</label>
              </div>
              <a href="mail">Forget Password?</a>
            </div>
          </div>
          <button type="submit" className="btn w100">
            Login
          </button>
          <div className="dont">
            Dont have an account? <a href="/signup">Register now</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
