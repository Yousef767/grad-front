"use client";
import React, { useEffect, useReducer } from "react";
import Image from "next/image";
const message1 =
  "Company Ut nulla quia libero officia ut ipsum quas dolores. Labore animi consequatur dolores voluptatem molestiae ut nostrum numquam. Qui dolore non aut dolorem.Animi et omnis similique labore maiores voluptatem mollitia qui et. Et voluptatem laudantium. Accusamus impedit iusto tempora itaque at quia ut laboriosam. Impedit molestias et cupiditate. Consequatur molestias id atque vitae omnis.Voluptas quis voluptatem corrupti autem voluptatem vel id cumque explicabo. Et provident non itaque. Repellendus repellat dolorum tenetur ea labore perspiciatis quis dolorem.";
const message2 =
  "Services Ut nulla quia libero officia ut ipsum quas dolores. Labore animi consequatur dolores voluptatem molestiae ut nostrum numquam. Qui dolore non aut dolorem.Animi et omnis similique labore maiores voluptatem mollitia qui et. Et voluptatem laudantium. Accusamus impedit iusto tempora itaque at quia ut laboriosam. Impedit molestias et cupiditate. Consequatur molestias id atque vitae omnis.Voluptas quis voluptatem corrupti autem voluptatem vel id cumque explicabo. Et provident non itaque. Repellendus repellat dolorum tenetur ea labore perspiciatis quis dolorem.";
const message3 =
  "Our team Ut nulla quia libero officia ut ipsum quas dolores. Labore animi consequatur dolores voluptatem molestiae ut nostrum numquam. Qui dolore non aut dolorem.Animi et omnis similique labore maiores voluptatem mollitia qui et. Et voluptatem laudantium. Accusamus impedit iusto tempora itaque at quia ut laboriosam. Impedit molestias et cupiditate. Consequatur molestias id atque vitae omnis.Voluptas quis voluptatem corrupti autem voluptatem vel id cumque explicabo. Et provident non itaque. Repellendus repellat dolorum tenetur ea labore perspiciatis quis dolorem.";

const reducer = (state, action) => {
  switch (action.type) {
    case "Company":
      return { text: message1 };
    case "Services":
      return { text: message2 };
    case "Our team":
      return { text: message3 };
    default:
      return state;
  }
};

function About() {
  useEffect(() => {
    let btns = document.querySelectorAll(".bts button");
    btns.forEach((e) => {
      e.addEventListener("click", () => {
        btns.forEach((e) => {
          e.classList.remove("active");
        });
        e.classList.add("active");
      });
    });
  }, []);
  const [state, dispatch] = useReducer(reducer, { text: message1 });

  useEffect(() => {
    let faqs = document.querySelectorAll(".faq");
    faqs.forEach((el) => {
      el.addEventListener('click',()=>{
        faqs.forEach((e) => {e.classList.remove("active");})
        el.classList.add("active");
      })
    });
  }, []);

  return (
    <div className="aboutInner">
      <div className="box aboutCont">
        <Image src="/media/about.jpg" alt="" width={500} height={500} />
        <div className="aboutTxt">
          <h4>
            <Image
              src="/media/icons/Icon-Label.svg"
              alt=""
              width={500}
              height={500}
            />
            About us
          </h4>
          <h1>Our Company Overview</h1>
          <p>
            Animi laboriosam adipisci. Fugiat eum est ut. Hic impedit hic cumque
            illum.Illum rerum quod ut exercitationem non dolores nemo.
            Dictamaiores fugit accusantium et est sapiente expedita id dolor. At
            rerum est est fuga. Voluptatibus illum aut repellat nesciunt. Qui
            laudantium fuga aliquam est velit est quia{" "}
          </p>
          <div className="bts">
            <button
              className="active"
              onClick={() => dispatch({ type: "Company" })}
            >
              Company
            </button>
            <button onClick={() => dispatch({ type: "Services" })}>
              Services
            </button>
            <button onClick={() => dispatch({ type: "Our team" })}>
              Our team
            </button>
          </div>
          <p id="text">{state.text}</p>
        </div>
      </div>
      <div className="Features">
        <div className="box fCont">
          <div className="fsText">
            <h4>
              <Image src="/media/icons/box.png" alt="" width={30} height={30} />{" "}
              <span>StudiRent</span> Features
            </h4>
            <h1>The feature of StudiRent that you will benefit from</h1>
            <a href="/posts">Visit posts Page</a>
          </div>
          <div className="fus">
            <div className="fc">
              <i className="fa-solid fa-star-shooting"></i>
              <h3> Finding affordable student housing</h3>
            </div>
            <div className="fc">
              <i className="fa-solid fa-dollar-sign"></i>
              <h3> Find the perfect balance of price</h3>
            </div>
            <div className="fc">
              <i className="fa-solid fa-shield-halved"></i>
              <h3> Discover housing options tailored to their needs</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="box aboutCont p50">
        <Image src="/media/faq.jpg" alt="" width={500} height={500} />
        <div className="aboutTxt">
          <h4>
            <Image src="/media/icons/fqa.svg" alt="" width={500} height={500} />
            FAQ Question
          </h4>
          <h1>Frequently asked questions</h1>
          <div className="faqs">
            <div
              className="faq"
            >
              <div className="q">
                Lorem Ipsum is simply dummy text of the prin....?{" "}
                <i className="fa-solid fa-plus"></i>{" "}
                <i className="fa-solid fa-dash"></i>
              </div>
              <div className="a">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s,
              </div>
            </div>
            <div
              className="faq"
            >
              <div className="q">
                Lorem Ipsum is simply dummy text of the prin....?{" "}
                <i className="fa-solid fa-plus"></i>{" "}
                <i className="fa-solid fa-dash"></i>
              </div>
              <div className="a">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s,
              </div>
            </div>
            <div
              className="faq"
            >
              <div className="q">
                Lorem Ipsum is simply dummy text of the prin....?{" "}
                <i className="fa-solid fa-plus"></i>{" "}
                <i className="fa-solid fa-dash"></i>
              </div>
              <div className="a">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s,
              </div>
            </div>
            <div
              className="faq"
            >
              <div className="q">
                Lorem Ipsum is simply dummy text of the prin....?{" "}
                <i className="fa-solid fa-plus"></i>{" "}
                <i className="fa-solid fa-dash"></i>
              </div>
              <div className="a">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s,
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
