import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
import { CartIcon, EmailIcon, FacebookIcon, HistoryIcon, HomeIcon, InstaIcon, MapIcon, PhoneIcon, PlusIcon, TiktokIcon, YoutubeIcon } from "../icons";
import TippyCustom from "../Tippy";
import { NavLink } from "react-router-dom";
const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("map")}>
        <div className={cx("map_title")}>
            <span>
                Bản đồ chỉ dẫn
            </span>
            <span className={cx("light")}>
                Trường Đại học Công nghiệp Hà Nội
            </span>
        </div>
        <iframe
        className={cx("map_box")}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.47378845151!2d105.73253187483616!3d21.053730980601877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1702042217608!5m2!1svi!2s"
          
          
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className={cx("infor")}>
            <div className={cx("infor_box")}>
                <div className={cx("title")}>
                    Liên hệ
                </div>
                <div className={cx("content")}>
                    <MapIcon width="20px" height="20px"/>
                    <span>
                        Số 298 đường Cầu Diễn, quận Bắc Từ Liêm, Hà Nội
                    </span>
                </div>
                <div className={cx("content")}>
                    <PhoneIcon width="20px" height="20px"/>
                    <span>
                        +84 12345678
                    </span>
                </div>
                <div className={cx("content")}>
                    <EmailIcon width="20px" height="20px"/>
                    <span>
                       conmeobeo@gmail.com
                    </span>
                </div>
                <div className={cx("title","link")}>
                    Liên kết
                </div>
                <div className={cx("content")}>
                    <a href="https://www.facebook.com/">
                        <FacebookIcon width="28px" height="28px"/>
                    </a>
                    <a href="https://www.instagram.com/">
                        <InstaIcon width="28px" height="28px"/>
                    </a>
                    <a href="https://www.youtube.com/">
                        <YoutubeIcon width="28px" height="28px"/>
                    </a>
                    <a href="https://www.tiktok.com/">
                        <TiktokIcon width="28px" height="28px"/>
                    </a>
                </div>

            </div>
           
           
      </div>
    </div>
  );
}

export default Footer;
