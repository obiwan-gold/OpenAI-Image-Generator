import * as dotenv from "dotenv";
dotenv.config();

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(configuration);

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint
app.post("/dream", async (req, res) => {
  try {
    const prompt = req.body.prompt; // access the desc the user is trying to pass

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const image = aiResponse.data.data[0].url; // Response object with url
    res.send({ image }); // Send back to client
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || `Error`);
  }
});

app.listen(8080, () =>
  console.log("Create art on http://localhost:8080/dream")
);
