import React from 'react'
import { FiBell } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
const TopNav = () => {
  return (
    <div>
      {/* -------- 上方導覽列開始 -------- */}
      <nav className="background-admin-data-right-nav">
        <div className="background-admin-data-right-nav-title">店家申請</div>
        <div class="background-admin-data-right-nav-content">
          <form action="">
            <div className="d-flex">
              <div>
                <a href="" className="me-3 icon">
                  <FiSearch />
                </a>
              </div>
              <input type="text rounded-3" />
            </div>
          </form>

          <div className="px-3 ">
            <a href="#" className="icon icon-border">
              <FiBell />
            </a>
          </div>
          <div className="username">管理員 : admin01</div>
          <div className="user-photo">
            <img src={require(`../imges/4.1.jpg`)} alt="" />
          </div>
          <button type="button" class="btn btn-warning mx-3">
            登出
          </button>
        </div>
      </nav>
      {/* -------- 上方導覽列結束 -------- */}
    </div>
  );
}

export default TopNav