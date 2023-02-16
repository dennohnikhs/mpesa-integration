const express = require("express");
const {
  // mpesaPassword,
  // oauthToken,
  // stkPush,
  payMpesa,
} = require("../controllers/mpesaController");

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Welcome to Mpesa Integration");
});
router.get("/pay-mpesa", payMpesa);
// router.get("/password", mpesaPassword);
// router.post("/stk-push", oauthToken, stkPush);
router.get("/confirm", (req, res) => {
  console.log("Payment confirmed");
  console.log({ req });

  return res.json({
    confirmed: true,
    message: "Confirmed",
  });
});

module.exports = router;
