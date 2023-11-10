import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import images from "../../test";
import Card from "../Card";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";
// const host = "http://localhost:5577";
import userService from "../../services/userService";
const cx = classNames.bind(styles);
function CartItem({ data, index }) {
  const [product, setProduct] = useState(data.Product);
  const price_sum = data.Product.price * data.quantity;
  //   console.log(price_sum);
  //   useEffect(() => {
  //     setSum(sum + product.price * data.quantity);
  //   }, [sum]);
  // const setPriceSum = ()=>{
  //     setSum(sum + price_sum);
  // }
  // setPriceSum();
  return (
    <div className={cx("item", index % 2 == 1 && "odd")}>
      {/* <div className={cx("pic")}>
        <img src={product.img} alt="product_item_pic" />
      </div> */}
      <div className={cx("stt")}> {index + 1}</div>
      
        <div className={cx("name")}>{product.name}</div>
        <div className={cx("quantity")}> {data.quantity}</div>
        <div className={cx("price")}> {product.price} VND</div>
        <div className={cx("sum_title")}> {price_sum} VND</div>
      
    </div>
  );
}

export default CartItem;
