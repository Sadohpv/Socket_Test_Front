import styles from "./Add.module.scss";
import classNames from "classnames/bind";
import images from "../../test";
import Card from "../Card";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";
import userService from "../../services/userService";

import { toast } from "react-toastify";

const cx = classNames.bind(styles);
const host = "http://localhost:5577";
function Add() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cate, setCate] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  const socketRef = useRef();

  // console.log(id);
  const handleOnclick = async () => {
    if (id && name && cate && price && quantity) {
      const res = await userService.handleAddProductService(
        id,
        name,
        cate,
        price,
        quantity,
        image
      );
      if (res && res.EC == 0) {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setId("");
        setName("");
        setPrice("");
        setCate("");
        setPrice("");
        setQuantity("");
        setImage("");
        document.getElementById("uploadCaptureInputFile").value = "";
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.error("Thiếu dữ liệu ! Kiểm tra lại", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleInputImg = (event) => {
    // console.log(event);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onloadend = () => {
        setImage(reader.result);
        
      };
    }
  };
  useEffect(()=>{
    socketRef.current = socketIOClient.connect(host);

    socketRef.current.on("sendDataServer", (data) => {
      setId(data.text);
      // setLoading(!loading);

    });
    return () => {
      socketRef.current.disconnect();
    };
  },[])
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("title")}>
              Thêm Sản Phẩm
        </div>
        <div className={cx("box_input")}>
          <input
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            placeholder="Nhập mã sản phẩm"
          />
          <div>Mã Sản Phẩm</div>
        </div>
        <div className={cx("box_input")}>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Nhập tên sản phẩm"
          />
          <div>Tên Sản Phẩm</div>
        </div>
        <div className={cx("box_input")}>
          <input
            value={cate}
            onChange={(e) => {
              setCate(e.target.value);
            }}
            placeholder="Nhập loại sản phẩm"
          />
          <div>Loại Sản Phẩm</div>
        </div>
        <div className={cx("box_input")}>
          <input
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            type="number"
            min="0"
            placeholder="Nhập đơn giá của sản phẩm"
          />
          <div>Đơn Giá</div>
        </div>
        <div className={cx("box_input")}>
          <input
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            type="number"
            min="0"
            placeholder="Nhập số lượng"
          />
          <div>Số Lượng</div>
        </div>
        <div className={cx("box_input")}>
          <input
            id="uploadCaptureInputFile"
            accept="image/*"
            type="file"
            title=" "
            onChange={(e) => handleInputImg(e)}
            // onError={(e) => handleErrorImg()}
          />
          <div>Ảnh</div>
        </div>

        <div className={cx("clear")} onClick={handleOnclick}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>

          <div>Nhập hàng</div>
        </div>
      </div>
    </>
  );
}

export default Add;
