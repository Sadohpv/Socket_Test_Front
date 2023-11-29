import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import images from "../../test";
import userService from "../../services/userService";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function Card({ data }) {
  console.log(data);
  const handleAddToCart = async()=>{
    const res = await userService.handleAddCartService(data.slug);
    if ((res !== undefined) & (res.EC === 0 || res.EC === 2)) {
      
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  return (
    <div className={cx("card",data.quantity<=0 && "fil")}>
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
          Số lượng : <span> {data.quantity>0?data.quantity : 0}</span>
        </div>
        <div className={cx("button")} onClick={handleAddToCart}>
          <span>Thêm Vào Giỏ</span>
        </div>
      </div>
      {
        data.quantity<=0&&
        <div className={cx("sold_out")}>
          <img src={images.soldout} alt="soldout"/>
        </div>
      }
    </div>
  );
}

export default Card;
