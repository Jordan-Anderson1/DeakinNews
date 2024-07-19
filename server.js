const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sgMail = require("@sendgrid/mail");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;

  const msg = {
    to: email,
    from: "jordantanderson@outlook.com.au",
    subject: "Welcome to Deakin Newsletter!",
    text: "Thanks for subscribing to Deakin News!",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});
