const axios = require("axios");
const nodemailer = require("nodemailer");
const Interest = require("../models/UserInterestModel");
const { emailTemplate } = require("../utils/emailTemplate");

// Nodemailer transport configuration (replace with actual email service details)
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// Controller function to get all interests
exports.getAllInterests = async (req, res) => {
  try {
    const interests = await Interest.find();
    res.status(200).json(interests);
  } catch (error) {
    console.error("Error fetching interests:", error);
    res.status(500).json({ error: "Failed to retrieve interests" });
  }
};

// Controller function for processing data
exports.processData = async (req, res) => {
  const { email, userName, interests, places } = req.body;

  // Validate the incoming request
  if (!Array.isArray(interests) || !Array.isArray(places)) {
    return res.status(400).json({
      error: "Invalid input. Both interests and places should be arrays.",
    });
  }

  try {
    // Make a request to the external server
    const response = await axios.post(
      "https://run.mocky.io/v3/e131e0e6-824a-4333-818b-4a86388ccfb6",
      {
        interests,
        places,
      }
    );

    const { favouredPlaces, recommendedPlaces } = response.data;
    console.log(response.data);

    // Compose the email content using a separate template
    const emailContent = emailTemplate(
      favouredPlaces,
      recommendedPlaces,
      userName
    );

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject:
        "Your Visa to Sri Lanka is Approved! Explore Recommended Destinations for Your Trip",
      html: emailContent,
    });

    // Respond with success
    res
      .status(200)
      .json({ message: "Data processed and email sent successfully." });
  } catch (error) {
    console.error("Error processing data or sending email:", error);
    res.status(500).json({ error: "Failed to process data or send email." });
  }
};
