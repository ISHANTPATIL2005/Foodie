const router=require("express").Router();

const {auth,IsRestaurant}=require("../middelware/auth")
const{createproduct,getProductById,getAllProduct,getProductByRestaurant,searchProduct}=require("../controller/product")
const {getCart,addToCart,updateCartItem,removeCartItem}=require("../controller/cart")
const{createRating,getAllRating,getRatingById,deleteRating}=require("../controller/ReatingAndReview");
const{createOrder,getUserOrder,getAllOrder}=require("../controller/Order")



router.post("/createproduct",auth,IsRestaurant,createproduct);
router.get("/getAllProduct",getAllProduct)
router.get("/getProduct/:id",getProductById)
router.get("/getRestaurantProduct/:id",getProductByRestaurant)

//Cart Routes

router.get("/getCart",auth,getCart)
router.post("/addToCart",auth,addToCart)
router.put("/updateCart",auth,updateCartItem)
router.delete("/removeCart",auth,removeCartItem)

//review Routes

router.post("/reating",auth,createRating)
router.get("/getAllReating",getAllRating)
router.get("/reating/:id",getRatingById)
router.delete("/deleteReating/:id",auth,deleteRating)


//order Routes
router.post("/createOrder",auth,createOrder) //==> add later Isuser 
router.get("/userOrder",auth,getUserOrder)
router.get("/allOrder",auth,getAllOrder)

//Search Product
router.get("/search",searchProduct)

module.exports=router;