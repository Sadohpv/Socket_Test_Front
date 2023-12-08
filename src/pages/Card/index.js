import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import images from "../../test";
import userService from "../../services/userService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { CancelIcon, SaleIcon, SettingIcon } from "../../icons";

const cx = classNames.bind(styles);

function Card({ data, setLoading, loading }) {
  // console.log(data);
  const [quan, setQuan] = useState("");
  const [addTab, setAddTab] = useState(false);
  const [sold, setSold] = useState(0);
  const [tab, setTab] = useState(false);
  const [saleTab, setSaleTab] = useState(false);
  const [sale, setSale] = useState("");
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
      const res = await userService.handleAddQuanService(quan, data.slug);
      if (res && res.EC == 0) {
        setLoading(!loading);
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setQuan("");
    } else {
      alert("Here");
    }
  };
  const handleAddSale = async () => {
    if (sale != "") {
      const res = await userService.handleAddSaleService(sale, data.slug);
      if (res && res.EC == 0) {
        setLoading(!loading);
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setSale("");
    } else {
      alert("Here");
    }
  };
  useEffect(() => {
    async function fetch() {
      const res = await userService.handleSoldCountService(data.id);
      if (res && res.count) {
        setSold(res.count);
      }
    }
    fetch();
  }, []);
  return (
    <div
      className={cx("card", data.quantity <= 0 && "fil")}
      onMouseOver={() => setTab(true)}
      onMouseLeave={() => {
        setTab(false);
        setAddTab(false);
        setSaleTab(false);
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
          <span>Thể loại :</span>
          <span>{data.catelogy}</span>
        </div>
        <div className={cx("each", "long")}>
          <span>Giá :</span>

          <span className={cx(data.sale > 0 && "sale")}> {data.price} VND</span>
          {data.sale > 0 && (
            <span>{(data.price * (100 - data.sale)) / 100} VND</span>
          )}
        </div>
        <div className={cx("each")}>
          <span>Số lượng :</span>
          <span> {data.quantity > 0 ? data.quantity : 0}</span>
        </div>
        <div className={cx("each")}>
          <span>Đã bán :</span>
          <span>{sold}</span>
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
          <div
            className={cx("tab_child")}
            onClick={(e) => {
              setAddTab(!addTab);
              setSaleTab(false);
            }}
          >
            <SettingIcon width="22px" height="22px" />
          </div>
          <div
            className={cx("tab_child")}
            onClick={(e) => {
              setSaleTab(!saleTab);
              setAddTab(false);
            }}
          >
            <SaleIcon width="22px" height="22px" />
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
      {tab && saleTab && (
        <>
          <input
            value={sale}
            onChange={(e) => setSale(e.target.value)}
            type="number"
            min={0}
            max={100}
            placeholder="Giảm giá %"
          />
          <div className={cx("add_quantity")} onClick={handleAddSale}>
            Khuyến mãi
          </div>
        </>
      )}
      {data.sale > 0 && (
        <div className={cx("sale_box")}>
          <span>{data.sale}%</span>
        </div>
      )}
    </div>
  );
}

export default Card;
