"use client";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer>
    <div className="box footer">
      <div className="footerLogo">
        <Image src="/media/logo-w.png" alt="" width={300} height={200}/>
      </div>
      <div className="footerLinkGroup">
        <div className="linkGroup">
          <h2>helpful link</h2>
          <ul>
            <li><a href="/"><Image src="/media/icons/footerLink.png" alt="" width={50} height={50}/> Home Page </a></li>
            <li><a href="/posts"><Image src="/media/icons/footerLink.png" alt="" width={50} height={50}/> posts</a></li>
            <li><a href="/about"><Image src="/media/icons/footerLink.png" alt="" width={50} height={50}/> about us </a></li>
            <li><a href="/contact"><Image src="/media/icons/footerLink.png" alt="" width={50} height={50}/> contact us</a></li>
          </ul>
        </div>
        <div className="linkGroup cont">
          <h2>Contact US</h2>
          <ul>
            <li><a href="##"><Image src="/media/icons/location.png" alt="" width={50} height={50}/>street , city , country</a></li>
            <li><a href="##"><Image src="/media/icons/call.png" alt="" width={50} height={50}/> +201006776709 </a></li>
            <li><a href="##"><Image src="/media/icons/mail2.png" alt="" width={50} height={50}/> info@studi-rent.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer