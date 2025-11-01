const router =require("express").Router()

const{auth,}=require("../middelware/auth")
const{addAddress,updateAddress,getAddresses}=require("../controller/Address")

router.post("/addAddress",auth,addAddress)
router.put("/updateAddress/:id",auth,updateAddress)
router.get("/getAddress",auth,getAddresses)

module.exports=router