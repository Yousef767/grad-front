"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Nav() {
  useEffect(() => {
    let links = document.querySelectorAll(".link");
    let path = window.location.pathname;
    let filterdPath = path.split("/");
    if (path === "/") {
      links.forEach((e) => {
        e.innerHTML.toLocaleLowerCase() === "home"
          ? e.classList.add("active")
          : e.classList.remove("active");
      });
    } else if (filterdPath[1] === "about") {
      links.forEach((e) => {
        e.innerHTML.toLocaleLowerCase() === "about"
          ? e.classList.add("active")
          : e.classList.remove("active");
      });
    } else if (filterdPath[1] === "posts") {
      links.forEach((e) => {
        e.innerHTML.toLocaleLowerCase() === "posts"
          ? e.classList.add("active")
          : e.classList.remove("active");
      });
    } else if (filterdPath[1] === "contact") {
      links.forEach((e) => {
        e.innerHTML.toLocaleLowerCase() === "contact"
          ? e.classList.add("active")
          : e.classList.remove("active");
      });
    }
  }, []);

  useEffect(() => {
    let nav = document.querySelector("nav");
    if(nav !== null){
      window.addEventListener("scroll", () => {
        if (window.scrollY >= 100) {
          nav.classList.add("color");
        } else {
          nav.classList.remove("color");
        }
      });
    }
  });
  const menuControl = () => {
    let nav = document.querySelector("nav");
    nav.classList.toggle("activeMenu");
  };

  const token = sessionStorage.getItem("token");
  const userTybe = sessionStorage.getItem("userTybe");
  const router = useRouter();
  const logOut = () => {
    sessionStorage.clear();
    router.refresh();
  };
  return (
    <nav>
      <div className="box f-s">
        <Link href="/" className="logo">
          <Image src="/media/logo.png" alt="" width={200} height={200} />
        </Link>
        <div className="links">
          <div className="ls">
            <ul className="mainLinks">
              <li>
                <Link className="link" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="link" href="/posts">
                  Posts
                </Link>
              </li>
              <li>
                <Link className="link" href="/about">
                  about
                </Link>
              </li>
              <li>
                <Link className="link" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mLinks">
              {token !== null && userTybe === "user" ? (
                <>
                  <Link className="i" href="/favourite" title="Favourite">
                    <i className="fa-solid fa-heart"></i> <span>Favourite</span>
                  </Link>
                  <button
                    className="i out"
                    onClick={() => {
                      logOut();
                    }}
                    title="Log Out"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>{" "}
                    <span>Log Out</span>
                  </button>
                </>
              ) : token !== null && userTybe === "seller" ? (
                <>
                  <Link className="i" href="/addpost" title="Dashboard">
                    <i className="fa-solid fa-grid-horizontal"></i>{" "}
                    <span>Dashboard</span>
                  </Link>
                  <Link className="i" href="/favourite" title="Favourite">
                    <i className="fa-solid fa-heart"></i> <span>Favourite</span>
                  </Link>
                  <button
                    className="i out"
                    onClick={() => {
                      logOut();
                    }}
                    title="Log Out"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>{" "}
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <Link className="a" href="/login" title="Login">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="last">
          <div className="mLinks">
            {token !== null && userTybe === "user" ? (
              <>
                <Link className="i" href="/favourite" title="Favourite">
                  <i className="fa-solid fa-heart"></i> <span>Favourite</span>
                </Link>
                <button
                  className="i out"
                  onClick={() => {
                    logOut();
                  }}
                  title="Log Out"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>{" "}
                  <span>Log Out</span>
                </button>
              </>
            ) : token !== null && userTybe === "seller" ? (
              <>
                <Link className="i" href="/addpost" title="Dashboard">
                  <i className="fa-solid fa-grid-horizontal"></i>{" "}
                  <span>Dashboard</span>
                </Link>
                <Link className="i" href="/favourite" title="Favourite">
                  <i className="fa-solid fa-heart"></i> <span>Favourite</span>
                </Link>
                <button
                  className="i out"
                  onClick={() => {
                    logOut();
                  }}
                  title="Log Out"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>{" "}
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <Link className="a" href="/login" title="Login">
                Login
              </Link>
            )}
          </div>
          <button className="menu" onClick={menuControl}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
