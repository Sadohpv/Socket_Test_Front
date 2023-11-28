import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import images from "../../test";
import Card from "../Card";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";
import userService from "../../services/userService";
import useDebounce from "./useDebounce";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
const host = "http://localhost:5577";
function Home() {
  const socketRef = useRef();
  const [product, setProduct] = useState([]);
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);

    socketRef.current.on("sendDataServer", (data) => {
      setLoading(!loading);
      console.log(data);
      setKey(data.text);
    });

    async function fetch() {
      const res = await userService.handleGetDataService();
      // console.log(res);
      // console.log("Loading Data");
      if ((res !== undefined) & (res.EC === 0)) {
        // console.log("Here");
        setProduct(res.product);
      }
    }
    fetch();
    return () => {
      socketRef.current.disconnect();
    };
  }, [loading]);
  const debounced = useDebounce(key, 500);
  useEffect(() => {
    const fetchApi = async () => {
      const results = await userService.handleSearchService(debounced);
      if (results.product.length > 0) {
        setProduct(results.product);
      } else {
        toast.error(
          "Không tìm thấy sản phẩm nào chứa kí tự hoặc mã bạn vừa nhập!",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
    };
    fetchApi();

    // encodeURIComponent : mã hóa tránh trùng với kí tự quy ước của url
  }, [debounced]);
  const handleSearch = async (e) => {
    const searchValueCurrent = e.target.value;

    if (!searchValueCurrent.startsWith(" ")) {
      setKey(searchValueCurrent);
    }
  };
  const handleBackSpace = async (e) => {
    // const num = key.length;
    // console.log(num);

    if ((key.trim().length == 1) & (e.keyCode === 8)) {
      setLoading(!loading);
    }
  };
  return (
    <>
      <video
        className={cx("video")}
        src={images.back2}
        autoPlay
        muted
        loop
        disablePictureInPicture={true}
      />

      <div className={cx("wrapper")}>
        <div className={cx("search")}>
          <input
            value={key}
            onChange={handleSearch}
            onKeyDown={handleBackSpace}
            placeholder={"Nhập mã hoặc tên sản phẩm "}
          />
        </div>
        <div className={cx("content")}>

       
        <div className={cx("category")}>
          <div className={cx("cate_title")}>
                Thể Loại
          </div>
          <div className={cx("cate_item")}>Kryptonite 1</div>
          <div className={cx("cate_item")}>Kryptonite 2</div>
          <div className={cx("cate_item")}>Kryptonite 3</div>
        </div>
        <div className={cx("product")}>
          {product.length > 0 &&
            product.map((item) => <Card data={item} key={Math.random()} />)}
        </div>
        </div>
      </div>
    </>
  );
}

export default Home;
