import axios from "../services/customAxios";
// import _ from "lodash";

function handleGetDataService() {
  return axios.get("/");
}
function handleGetDataCateService(cate) {
  return axios.get(`/cate/${cate}`);
}
function handleGetCartService() {
  return axios.get("/cart");
}
function handleSearchService(key) {
  return axios.post("/search", { key: key });
}
function handleAddCartService(data) {
  return axios.post("/addToCart", { data: data });
}
function handleClearCartService() {
  return axios.get("/clear");
}
function handleAddProductService(id, name, cate, price, quantity, image) {
  return axios.post("/addProduct", {
    id: id,
    name: name,
    cate: cate,
    price: price,
    quantity: quantity,
    image: image,
  });
}
function handleAddQuanService(quan, id) {
  return axios.post("/addQuan", { quan: quan, id: id });
}
export default {
  handleGetDataService,
  handleGetCartService,
  handleSearchService,
  handleAddCartService,
  handleClearCartService,
  handleAddProductService,
  handleGetDataCateService,
  handleAddQuanService,
};
