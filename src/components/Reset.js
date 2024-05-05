import React from 'react'
import Image from "next/image";

function Reset() {
  return (
    <div className="formInner">
    <div className="imgInner">
      <Image src="/media/images/reg.jpg" alt="" width={1000} height={1000} />
    </div>
    <div className="form">
      <form action="">
        <header>
          <h1 className="mc">Set New Password</h1>
        </header>
        <div className="inputs">
          <div className="input inputTwo">
            <span>New Password</span>
            <input type="password" />
            <Image
              src="/media/icons/LockSimpleOpen.png"
              alt=""
              width={200}
              height={200}
            />
          </div>
          <div className="input inputTwo">
            <span>Confirm New Password</span>
            <input type="password" />
            <Image
              src="/media/icons/LockSimpleOpen.png"
              alt=""
              width={200}
              height={200}
            />
          </div>
        </div>
        <button type="submit" className="btn w100">
          Update Password
        </button>
      </form>
    </div>
  </div>
  )
}

export default Reset