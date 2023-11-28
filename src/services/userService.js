import axios from "../services/customAxios";
// import _ from "lodash";

function handleGetDataService() {
  return axios.get("/");
}
function handleGetCartService() {
  return axios.get("/cart");
}
function handleSearchService(key) {
  return axios.post("/search", { key: key });
}
function handleAddCartService(data){
  return axios.post("/addToCart", { data: data });

}
function handleClearCartService(){
  return axios.get("/clear");
};

export default {
  handleGetDataService,
  handleGetCartService,
  handleSearchService,
  handleAddCartService,
  handleClearCartService
};
