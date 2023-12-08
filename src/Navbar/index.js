import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import { CartIcon, HistoryIcon, HomeIcon, PlusIcon } from "../icons";
import TippyCustom from "../Tippy";
import { NavLink } from "react-router-dom";
import images from "../test";
const cx = classNames.bind(styles);

function Navbar() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("logo")}>
        <img src={images.logo} />
        
      </div>
      <TippyCustom content={"Trang Chủ"}>
        <NavLink
          to="/"
          className={(nav) => cx("menu_item", { active: nav.isActive })}
        >
          <div className={cx("item")}>
            <HomeIcon width="28px" height="28px" />
          </div>
        </NavLink>
      </TippyCustom>

      <TippyCustom content={"Giỏ Hàng"}>
        <NavLink
          to="/cart"
          className={(nav) => cx("menu_item", { active: nav.isActive })}
        >
          <div className={cx("item")}>
            <CartIcon width="28px" height="28px" />
          </div>
        </NavLink>
      </TippyCustom>
      <TippyCustom content={"Thêm Sản Phẩm"}>
        <NavLink
          to="/add"
          className={(nav) => cx("menu_item", { active: nav.isActive })}
        >
          <div className={cx("item")}>
            <PlusIcon width="26px" height="26px" />
          </div>
        </NavLink>
      </TippyCustom>
      <TippyCustom content={"Lịch sử bán hàng"}>
        <NavLink
          to="/history"
          className={(nav) => cx("menu_item", { active: nav.isActive })}
        >
          <div className={cx("item")}>
            <HistoryIcon width="26px" height="26px" />
          </div>
        </NavLink>
      </TippyCustom>
    </div>
  );
}

export default Navbar;
