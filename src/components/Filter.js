"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function Filter() {
  const [state, setstate] = useState("");
  const [state2, setstate2] = useState("");
  useEffect(() => {
    let path = window.location.pathname;
    let filterdPath = path.split("/");
    setstate(filterdPath[1]);
    setstate2(filterdPath[2]);
  }, [state]);
  function handelFilter (e){
    let icon = document.getElementById('icon');
    let price = document.getElementById('price');
    let selCity = document.getElementById('selCity');
    let selRooms = document.getElementById('selRooms');
    if(e.target.value === 'price'){
      icon.className = 'fa-regular fa-dollar-sign';
      price.style.display='block';
      selCity.style.display='none';
      selRooms.style.display='none';
    }else if(e.target.value === 'rooms'){
      icon.className = 'fa-regular fa-bed';
      selRooms.style.display='block';
      price.style.display='none';
      selCity.style.display='none';
    }else if(e.target.value === 'city'){
      icon.className = 'fa-regular fa-location-dot';
      selCity.style.display='block';
      selRooms.style.display='none';
      price.style.display='none';
    }
  }
  function showFilter(){
    let filts = document.querySelector('.filts');
    filts.classList.toggle('showFilter');
  }
  return (
    <>
    <div className="box navFilter">
      <div className="path">
        <span>
          <Image src="/media/icons/House.png" alt="" width={50} height={50} />{" "}
          Home
        </span>
        <Image
          className="arr"
          src="/media/icons/CaretRight.png"
          alt=""
          width={50}
          height={50}
        />
        <span>{state}</span>
      </div>
    </div>
      {state === "posts" && state2 === undefined ? (
        <div>
          
        </div>
      ) : (
        ""
      )}
      </>
  );
}

export default Filter;
