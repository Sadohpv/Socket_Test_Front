import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import images from "../../test";
const cx = classNames.bind(styles);

function Card({ data }) {
  return (
    <div className={cx("card")}>
      <div className={cx("pic")}>
        <img src={data.img} atl="pic_alright" />
      </div>
      <div className={cx("infor")}>
        <div className={cx("name")}>
          <span>{data.name}</span>
        </div>
        <div className={cx("each", "long")}>
          Thể loại : <span>{data.catelogy}</span>
        </div>
        <div className={cx("each", "long")}>
          Giá : <span> {data.price} VND</span>
        </div>
        <div className={cx("each")}>
          Số lượng : <span> {data.quantity}</span>
        </div>
        <div className={cx("button")}>
          <span>Thêm Vào Giỏ</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
