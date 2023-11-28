import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import images from "../../test";
import Card from "../Card";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";
import userService from "../../services/userService";
import CartItem from "./CartItem";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
const host = "http://localhost:5577";
function Cart() {
  const socketRef = useRef();
  const [product, setProduct] = useState([]);
  const [sum, setSum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [empty, setEmpty] = useState(true);
  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);

    socketRef.current.on("sendDataServer", (data) => {
      handleAddCart(data.text);
    });

    async function fetch() {
      const res = await userService.handleGetCartService();
      console.log(res);
      if ((res !== undefined) & (res.EC === 0)) {
        console.log("Here");
        setProduct(res.product);
        let price_sum = 0;
        res.product.map((item) => {
          price_sum = price_sum + item.quantity * item.Product.price;
        });
        setSum(price_sum);
        setEmpty(false);
      } else {
      }
    }
    fetch();
    return () => {
      socketRef.current.disconnect();
    };
  }, [loading]);
  const handleAddCart = async (data) => {
    const res = await userService.handleAddCartService(data);
    if ((res !== undefined) & (res.EC === 0 || res.EC === 2)) {
      setLoading(!loading);
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleClear = async () => {
    const res = await userService.handleClearCartService();
    if (res) {
      setLoading(!loading);
    }
  };
  // console.log(product);
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("title")}>
          <div className={cx("stt")}>STT</div>
          <div className={cx("name")}>Tên</div>
          <div className={cx("quantity")}> Số Lượng </div>

          <div className={cx("price")}>Đơn Giá</div>
          <div className={cx("sum_title")}>Thành Tiền</div>
        </div>
        {product.length > 0 &&
          product.map((item, index) => (
            <CartItem data={item} key={Math.random()} index={index} />
          ))}
        {product.length > 0 && (
          <div className={cx("sum")}>
            <span> Tổng Tiền </span>
            {sum} VND
          </div>
        )}
        {empty == false && product.length == 0 && (
          <div  className={cx("empty")}>Không có sản phẩm nào trong giỏ hàng</div>
        )}
        {sum > 0 && (
          <div className={cx("clear")} onClick={handleClear}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

            <div>Thanh Toán</div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
