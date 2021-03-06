import React, { useState } from "react";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";

// import LoginForm from "./LoginForm"; 曾經的分離表單
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/auth";
// import Reset from "../StoreCheck/components/StoreReset";
import { API_URL } from "../../../../utils/config";
import { ERR_MSG } from "../../../../utils/error";

const StoreLogin = (props) => {
  const { loginSeller, setLoginSeller } = useAuth();

  const swal = Swal.mixin({
    customClass: {
      confirmButton: "btn round-btn-green ms-2 me-2",
    },
    buttonsStyling: false,
  });
  const loginSuccessAlert = () => {
    return (
      <>
        {swal
          .fire({
            text: "登入成功",
            icon: "success",
            confirmButtonText: "管理您的店舖",
            showConfirmButton: true,
            showCloseButton: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              navigate("/storebg");
            }
          })}
      </>
    );
  };
  const loginFailedAlert = () => {
    return (
      <>
        {swal
          .fire({
            icon: "error",
            title: "登入失敗",
            showConfirmButton: true,
            confirmButtonText: "再試一次",
            footer: "不妨檢查看看信箱與密碼是否打錯",
          })
          .then((result) => {
            if (result.isConfirmed) {
              navigate("/storeLogin");
            }
          })}
      </>
    );
  };
  const [loginStore, setLoginStore] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });
  const [eye, setEye] = useState({
    passwordEye: false,
  });
  function passwordShow() {
    setEye(
      eye.passwordEye
        ? { ...eye, passwordEye: false }
        : { ...eye, passwordEye: true }
    );
  }
  // -------- 處理input改變 --------
  const handleChange = (e) => {
    setLoginStore({ ...loginStore, [e.target.name]: e.target.value });
  };

  // -------- 當表單檢查有不合法的訊息時會呼叫 --------
  const handleFormInvalid = (e) => {
    // 阻擋form的預設送出行為(錯誤泡泡訊息)
    e.preventDefault();

    let name = e.target.name;
    //email欄位錯誤
    if (name === "email") {
      const updatedFieldErrors = {
        ...fieldErrors,
        email: "email格式輸入錯誤",
      };
      setFieldErrors(updatedFieldErrors);
    }
    // 密碼欄位錯誤
    else if (name === "password") {
      const updatedFieldErrors = {
        ...fieldErrors,
        password: "密碼至少為6個字元",
      };
      setFieldErrors(updatedFieldErrors);
    }
  };
  // -------- 當整個表單有更動時會觸發 --------
  // 認定使用者輸入某個欄位(更正某個有錯誤的欄位)
  const handleFormChange = (e) => {
    // 清空某個欄位錯誤訊息
    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: "",
    };
    // 設定回錯誤訊息狀態
    setFieldErrors(updatedFieldErrors);
  };
  let navigate = useNavigate();
  // -------- 表單提交 --------
  const handleSubmit = async (e) => {
    e.preventDefault();
    //比對資料庫是否有此會員
    try {
      let response = await axios.post(
        `${API_URL}/storeLogin/storeLogin`,
        loginStore,
        { withCredentials: true }
      );
      console.log("登入成功", response.data);
      // console.log("前端登入成功");
      console.log(response.data.data);
      setLoginSeller(response.data.data);
      // console.log("登入成功", response.data);
      loginSuccessAlert();
      navigate("/");
    } catch (e) {
      // console.error("錯誤:", e.response.data);
      console.error("測試登入", ERR_MSG);
      loginFailedAlert();
    }
  };

  return (
    <>
      <div className="container-fluid store-login-bg m-auto pt-5 pb-5">
        <div className="store-login-content col-lg-5 m-auto pt-4 pb-4">
          <h4 className="text-dark-grey text-center">店家登入</h4>
          {/* -------- 表格開始 -------- */}
          <div className="col-lg-10 m-auto">
            <div className="label-group d-flex flex-column">
              <form
                className="d-flex flex-column needs-validation"
                onSubmit={handleSubmit}
                onChange={handleFormChange}
                onInvalid={handleFormInvalid}
              >
                {/* email */}
                <label
                  for=""
                  className="col-form-label input-label-title text-green p-0 text-start"
                >
                  電子郵件
                </label>
                <div class="form-floating">
                  <input
                    name="email"
                    type="email"
                    className={`form-control custom-input
                        ${fieldErrors.email !== "" && "input-error"}`}
                    id="floatingInput"
                    placeholder="帳號"
                    value={loginStore.email}
                    onChange={handleChange}
                    required
                  />
                  <label
                    for="floatingInput"
                    className="floating-label text-grey "
                  >
                    請填入電子信箱
                  </label>
                </div>
                {fieldErrors.email !== "" && (
                  <div className="error text-end">{fieldErrors.email}</div>
                )}
                {/* password */}
                <label
                  for=""
                  className="col-form-label input-label-title  text-green text-start p-0 mt-2"
                >
                  密碼
                </label>
                <div class="form-floating">
                  <input
                    name="password"
                    type={eye.passwordEye ? "text" : "password"}
                    className="form-control custom-input"
                    id="floatingInput"
                    placeholder="密碼"
                    value={loginStore.password}
                    onChange={handleChange}
                    minLength="3"
                    required
                  />
                  <div onClick={passwordShow}>
                    {eye.passwordEye ? (
                      <FiEye className="eye" />
                    ) : (
                      <FiEyeOff className="eye" />
                    )}
                  </div>
                  <label
                    for="floatingInput"
                    className="floating-label text-grey"
                  >
                    請填入密碼
                  </label>
                </div>
                {fieldErrors.password !== "" && (
                  <div className="error text-end mb-3">
                    {fieldErrors.password}
                  </div>
                )}

                <button type="submit" className="btn submit-btn mt-3 col-lg-12">
                  登入
                </button>
              </form>
              {/* -------- 表格結束 -------- */}
            </div>
            {/* <div className="row align-self-center">
      <Link to="/StoreReset" className="no-link">
        <p className="text-grey no-link m-0 mt-3">忘記密碼？</p>
      </Link>
</div> */}
            <hr className="col-lg-12 mt-3 text-center" />

            <p className="text-grey text-center">
              尚未加入GOODTOGO？
              <Link to="/Joinus" className="no-link">
                <span className="text-yellow  ">立即註冊</span>
              </Link>
            </p>
            {/* <Reset /> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default StoreLogin;
