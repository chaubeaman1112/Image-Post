// creating our server
require('dotenv').config();
const express = require("express");
const postmodel = require("./models/note.model");
const multer = require("multer");
const app = express();
const uploadfile = require("./services/storage.servies");
const cors= require('cors');

app.use(cors());
app.use(express.json());


const upload = multer({ storage: multer.memoryStorage() }); // this is also a middleware


const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey:process.env.googlegeminiapikey,
});

app.post(
  "/generate-caption",
  upload.single("images"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please upload an image",
        });
      }

      const idea = req.body.idea || "";

      const prompt = `
        Generate one engaging social media caption
        for this image.

        User's idea: ${idea || "No idea provided"}

        Consider both the image and the user's idea.
        Return only the caption.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: [
          {
            inlineData: {
              mimeType: req.file.mimetype,
              data: req.file.buffer.toString("base64"),
            },
          },
          {
            text: prompt,
          },
        ],
      });

      return res.status(200).json({
        caption: response.text,
      });
    } catch (error) {
      console.error("AI caption error:", error.message);

      return res.status(500).json({
        message: "Caption generation failed",
      });
    }
  }
);

app.post("/create-post", upload.single("images"), async (req, res) => {
  //  console.log(req.body);
  //  console.log(req.file);

  const result = await uploadfile(req.file.buffer);

  const post = await postmodel.create({
    images: result.url,
    caption: req.body.caption,
  });

  return res.status(201).json({
    message: "Message created Successfully",
    post,
  });
});


app.get("/posts",async(req,res)=>{
    const mypost= await postmodel.find()

    res.status(200).json({
        message:"Messages are fetched successfully",
        post:mypost
    })
})
module.exports = app;
