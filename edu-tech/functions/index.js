/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const stripe=require("stripe")("sk_test_51PhUv5RvBKIWool1yV1Lheck0e7mYFrG8FdjPIRrRIi8HRqHRugcU3nDCWc1hJW5Uw2DRVmrxCfQliSEokw8cyuW00GUeqy8pK");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.createPaymentIntent = onRequest((req, res) => {
  cors(req, res, async () => {
    const {amount} = req.body;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
      });
      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      logger.error("Payment Intent creation failed", {error: error.message});
      res.status(500).send({error: error.message});
    }
  });
});
