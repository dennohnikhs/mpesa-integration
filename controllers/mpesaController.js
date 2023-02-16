require("dotenv").config();
// const dateTime = require("node-datetime");
//the below passkey is not provided by daraja api so you given a passkey after approval by saf
const axios = require("axios");
//short_code is the till number for the lipa na mpesa  service
const passKey = process.env.PASS_KEY;
const shortCode = process.env.SHORT_CODE;
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const oauthTokenUrl = process.env.OAUTH_TOKEN_URL;
function formatNumber(num) {
  if (num < 10) {
    num = `0${num}`;
  }
  return num;
}

//es6 format of writing the above code is
//const formatNumber = (num)=> num < 10? `0${num}`: num;

function formatTimestamp() {
  let date = new Date();
  const formatted = `${date.getFullYear()}${formatNumber(
    date.getMonth() + 1
  )}${formatNumber(date.getDate())}${formatNumber(
    date.getHours()
  )}${formatNumber(date.getMinutes())}${formatNumber(date.getSeconds())}`;
  return formatted;
}
function newPassword() {
  const timestamp = formatTimestamp();

  const passString = shortCode + passKey + timestamp;
  const base64EncodedPassword = Buffer.from(passString).toString("base64");
  return {
    timestamp,
    base64EncodedPassword,
  };
}

async function getAuthToken() {
  let consumerBuffer = new Buffer.from(consumerKey + ":" + consumerSecret);
  let auth = `Basic ${consumerBuffer.toString("base64")}`;

  try {
    let dataResponse = await axios.get(oauthTokenUrl, {
      headers: {
        Authorization: auth,
      },
    });

    let dataInfo = dataResponse.data;
    let accessToken = dataInfo.access_token;
    return accessToken;
  } catch (err) {
    console.log("Error occurred on getAuthtoken", err);
  }

  return null;
}

async function performStkPush(authToken, password) {
  const headers = {
    Authorization: "Bearer " + authToken,
  };
  const stkUrl = process.env.STK_URL;

  let data = {
    BusinessShortCode: shortCode,
    Password: password.base64EncodedPassword,
    Timestamp: password.timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: "1",
    PartyA: "254717019058",
    PartyB: shortCode,
    PhoneNumber: "254717019058",
    CallBackURL: "http://511e-41-72-199-236.ngrok.io/confirm",
    AccountReference: "Langat Denis Electronics shop",
    TransactionDesc: "Lipa Na Mpesa",
  };

  try {
    const response = await axios.post(stkUrl, data, { headers: headers });

    return response.data;
  } catch (err) {
    console.log("An error occurred on performStkPush", err);
  }
  return null;
}

async function payMpesa(req, res) {
  //STEP 1 generate password
  const password = newPassword();

  try {
    //STEP 2 generate token
    const authToken = await getAuthToken();

    //STEP 3 send stk push
    const responseData = await performStkPush(authToken, password);

    return res.json({
      success: true,
      message: "Push sent",
      mpesa_response: responseData,
    });
  } catch (err) {
    console.log("An error occurred payMpesa", err);
  }

  return res.json({
    success: false,
    message: "Unknown Error occurred",
  });
}

module.exports = { payMpesa };
