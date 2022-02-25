// -------- login 功能 --------
import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";

//-------- 引用icon --------
import { ImFacebook2 } from "react-icons/im";
import { FiEye, FiEyeOff } from "react-icons/fi";

//-------- 串接API套件 --------
import axios from "axios";
import { API_URL } from "../../../utils/config";
import { ERR_MSG } from "../../../utils/error";

const Login = (props) => {
  //登入後存入會員資料給全域使用
  const { member, setMember } = useAuth();
  // 從App傳來的登入狀態
  //預設個欄位的值為空（開發中所以有先給值）
  const [loginUser, setLoginUser] = useState({
    email: "echo@test.com",
    password: "0000000000",
  });
  //制定錯誤訊息，預設為沒有錯誤訊息
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });
  // 切換看密碼開關
  const [eye, setEye] = useState({
    passwordEye: false,
  });
  // --------切換顯示/隱藏密碼 --------
  function passwordShow() {
    setEye(
      eye.passwordEye
        ? { ...eye, passwordEye: false }
        : { ...eye, passwordEye: true }
    );
  }
  // -------- 處理input改變 --------
  const handleChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
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
      //密碼欄位錯誤
    } else if (name === "password") {
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
      let response = await axios.post(`${API_URL}/auth/login`, loginUser, {
        withCredentials: true,
      });
      console.log("登入成功", response.data);
      setMember(response.data.data);
      //!因為以下setAuth失敗所以console會出現錯誤訊息
      navigate("/");
    } catch (e) {
      // console.error("錯誤:", e.response.data);
      console.error("測試登入", ERR_MSG);
    }
  };

  console.log("member from Login.js", member);

  return (
    <div className="container-fluid login-bg">
      <div className="col-lg-4 col-sm-10 m-0 p-0 m-auto">
        <div className="content text-center m-auto">
          <div className="col-lg-10 col-md-8 col-sm-12 col-12 d-flex pt-5 pb-4 m-auto flex-column justify-content-evenly align-items-center ">
            <>
              <div className="h4 text-dark-grey">會員登入</div>
              {/* -------- 表格開始 -------- */}

              <form
                className="needs-validation col-lg-10 col-md-6 col-sm-12 col-10"
                onSubmit={handleSubmit}
                onInvalid={handleFormInvalid}
                onChange={handleFormChange}
              >
                <div className="label-group d-flex flex-column ">
                  {/* email */}
                  <div className="text-start mt-3 mb-1">
                    <label
                      htmlfor="email"
                      className="input-label-title text-green p-0 text-start"
                    >
                      電子郵件
                    </label>
                    <div class="form-floating">
                      <input
                        name="email"
                        type="email"
                        className={`form-control custom-input ${
                          fieldErrors.email !== "" && "input-error"
                        }`}
                        id="floatingInput"
                        placeholder="帳號"
                        value={loginUser.email}
                        onChange={handleChange}
                        required
                      />
                      <label
                        htmlfor="floatingInput"
                        className="floating-label text-grey "
                      >
                        請填入電子信箱
                      </label>
                      {/* 如果有錯誤訊息，呈現出來 */}
                      {fieldErrors.email !== "" && (
                        <div className="error text-end">
                          {fieldErrors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* password */}
                  <div className=" text-start mt-2 mb-4">
                    <label
                      htmlfor=""
                      className=" input-label-title  text-green text-start p-0"
                    >
                      密碼
                    </label>
                    <div class="form-floating">
                      <input
                        name="password"
                        type={eye.passwordEye ? "text" : "password"}
                        autoComplete="off"
                        className={`form-control custom-input ${
                          fieldErrors.password !== "" && "input-error"
                        }`}
                        id="floatingInput"
                        placeholder="密碼"
                        value={loginUser.password}
                        onChange={handleChange}
                        minLength="6"
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
                        htmlfor="floatingInput"
                        className="floating-label text-grey"
                      >
                        請填入密碼
                      </label>
                      {/* 如果有錯誤訊息，呈現出來 */}
                      {fieldErrors.password !== "" && (
                        <div className="error text-end">
                          {fieldErrors.password}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* {fieldErrors.password !== "" && (
                    <div className="error text-end mb-3">
                      {fieldErrors.password}
                    </div>
                  )} */}
                </div>
                <div className="btn-group d-grid gap-3">
                  <button type="submit" className="btn submit-btn col-lg-12">
                    登入
                  </button>
                  <button className="btn btn-fb-login col-lg-12 d-flex align-items-center text-center justify-content-between">
                    <ImFacebook2 className="fb-icon col-lg-2 " />
                    使用 Facebook 登入
                    <div className="col-lg-2"> </div>
                  </button>
                </div>

                {/* -------- 表格結束 -------- */}
              </form>
              <Link to="/auth/reset" className="no-link">
                <p className="text-grey no-link m-0 mt-3">忘記密碼？</p>
              </Link>

              <hr className="col-lg-10 col-sm-10 mt-lg-3 split" />

              <p className="text-grey m-0">
                尚未加入GOODTOGO？
                <Link to="/auth/register" className="no-link">
                  <span className="text-yellow">立即註冊</span>
                </Link>
              </p>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
