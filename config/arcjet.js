import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";
import { NODE_ENV } from "../config/env.js";

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
      allow: ["CATEGORY:SEARCH_ENGINE", "UA:PostmanRuntime/7.39.0"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});

export default aj;
