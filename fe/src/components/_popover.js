import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
//引用antd popover
import { Popover } from "antd";
import "antd/dist/antd.css";
//引用icon
import { ReactComponent as UserIcon } from "../images/user-icon.svg";
//alert套件
import Swal from "sweetalert2";
import { IMAGE_URL } from "../utils/config";

import BlankProfile from "../images/headShot.png";

const _popover = () => {
  const { loginMember, setLoginMember } = useAuth();

  const navigate = useNavigate();
  const swal = Swal.mixin({
    customClass: {
      confirmButton: "btn confirmbtn ms-2 me-2",
      cancelButton: "btn cancelbtn ms-2 me-2",
    },
    buttonsStyling: false,
  });
  const click = () => {
    return (
      <>
        {swal
          .fire({
            text: "確定要登出嗎?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "確定登出",
            cancelButtonText: "保持登入",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              setLoginMember(null);
              swal.fire("登出囉！", "我們隨時歡迎您:)", "success");
              navigate("/");
              window.scrollTo(0, 0);
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swal.fire("", "yay繼續一起愛地球", "success");
            }
          })}
      </>
    );
  };
  const notLoggedin = (
    <div className="nav-popover">
      <div className="popover-item text-center">
        <Link to="/auth/login" className="nav-popover-link no-link">
          會員登入
        </Link>
      </div>
      <div className="popover-item text-center">
        <Link to="/storelogin" className="nav-popover-link">
          店家登入
        </Link>
      </div>
    </div>
  );
  const loggedin = (
    <div className="nav-popover">
      <div className="popover-item text-center">
        <Link to="/member/profile" className="nav-popover-link">
          會員中心
        </Link>
      </div>
      <div className="popover-item text-center">
        <Link to="/member/order" className="nav-popover-link">
          我的訂單
        </Link>
      </div>
      {/* <div className="popover-item text-center">
        <Link to="#" className="nav-popover-link">
          優惠券
        </Link>
      </div> */}
      <div className="popover-item text-center">
        {/* <Link to="auth/logout" className="nav-popover-link">
          登出
        </Link> */}
        <div onClick={click} className="nav-popover-link">
          登出
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Popover
        placement="bottom"
        content={loginMember ? loggedin : notLoggedin}
        // trigger="click"
      >
        {loginMember ? (
          <img
            className={
              loginMember.photo !== ""
                ? "navbar-profile-pic"
                : "navbar-profile-pic-empty"
            }
            src={
              loginMember.photo === ""
                ? BlankProfile
                : IMAGE_URL + loginMember.photo
            }
            alt="profile"
          />
        ) : (
          <UserIcon className="nav-icon mt-1" />
        )}
      </Popover>
    </>
  );
};

export default _popover;
