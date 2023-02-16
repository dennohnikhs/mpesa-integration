// const axios = require("axios")
// //axios is the most used request package for node js
//   async function oauthToken (req,res,next){
//     const consumerKey = process.env.CONSUMER_KEY
//     const consumerSecret = process.env.CONSUMER_SECRET
//     const oauthTokenUrl = process.env.OAUTH_TOKEN_URL;

//         //form a buffer of the consumer key and secret
//         let consumerBuffer = new Buffer.from(consumerKey+":"+consumerSecret);

//         let auth = `Basic ${consumerBuffer.toString('base64')}`;
//     //we now send headers using axios to safaricom
//     //we put consumer key and secret in the headers so that safaricom can know that they send them themselves and then provide us the access token
//         try{

//             let dataResponse = await axios.get(oauthTokenUrl,{
//                 "headers":{
//                     "Authorization":auth
//                 }
//             })
//             let dataInfo = dataResponse.data
//             let accessToken = dataInfo.access_token
//             req.oauthToken = accessToken
//             next();

//         }catch(err){
//     console.log({err})
//         }

//     }
// module.exports=oauthToken
