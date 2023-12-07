import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import images from "../../test";
import userService from "../../services/userService";
import { toast } from "react-toastify";
import { useState } from "react";
import { CancelIcon, SettingIcon } from "../../icons";

const cx = classNames.bind(styles);

function Card({ data,setLoading,loading }) {
  // console.log(data);
  const [quan, setQuan] = useState("");
  const [addTab, setAddTab] = useState(false);

  const [tab, setTab] = useState(false);
  const handleAddToCart = async () => {
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
  };
  const handleAddQuan = async () => {
    if (quan != "") {
      const res = await userService.handleAddQuanService(quan,data.slug);
      if(res && res.EC==0){
        setLoading(!loading);
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setQuan("");
    } else {
      alert("Here");
    }
  };
  // console.log(quan);
  return (
    <div
      className={cx("card", data.quantity <= 0 && "fil")}
      onMouseOver={() => setTab(true)}
      onMouseLeave={() => {
        setTab(false);
        setAddTab(false);
      }}
    >
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
          Số lượng : <span> {data.quantity > 0 ? data.quantity : 0}</span>
        </div>
        <div className={cx("button")} onClick={handleAddToCart}>
          <span>Thêm Vào Giỏ</span>
        </div>
      </div>
      {data.quantity <= 0 && (
        <div className={cx("sold_out")}>
          <img src={images.soldout} alt="soldout" />
        </div>
      )}
      {tab && (
        <div className={cx("tab")}>
          <div className={cx("tab_child")} onClick={(e) => setAddTab(!addTab)}>
            <SettingIcon width="22px" height="22px" />
          </div>
          <div className={cx("tab_child")}>
            <CancelIcon width="22px" height="22px" />
          </div>
        </div>
      )}
      {tab && addTab && (
        <>
          <input
            value={quan}
            onChange={(e) => setQuan(e.target.value)}
            type="number"
            min={0}
            placeholder="Số Lượng"
          />
          <div className={cx("add_quantity")} onClick={handleAddQuan}>
            Tăng số lượng
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
