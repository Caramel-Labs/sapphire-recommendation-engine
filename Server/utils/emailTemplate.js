// Function to generate the email template
exports.emailTemplate = (favouredPlaces, recommendedPlaces, userName) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
      
      <h1 style="color: #2E86C1; text-align: center;">Visa Application Approved</h1>
      
      <p style="font-size: 16px;">
        Dear ${userName},
      </p>

      <p style="font-size: 16px;">
        We are pleased to inform you that your visa application has been approved. The Government of Sri Lanka looks forward to welcoming you to our beautiful country and hopes your journey will be a memorable one.
      </p>

      <p style="font-size: 16px;">
        To help you plan your visit, we’ve gathered some recommendations based on your interests and the exciting destinations available. Below are the highlights:
      </p>

      <h2 style="color: #1F618D;">Your Bucket list:</h2>
      <ul style="font-size: 16px;">
        ${favouredPlaces.map((interest) => `<li>${interest}</li>`).join("")}
      </ul>

      <h2 style="color: #1F618D;">Recommended Places:</h2>
      <ul style="font-size: 16px;">
        ${recommendedPlaces.map((place) => `<li>${place}</li>`).join("")}
      </ul>

      <p style="font-size: 16px;">
        We hope these suggestions inspire your travel plans. Please feel free to reach out to us if you have any further questions or need assistance with your trip.
      </p>

      <p style="font-size: 16px;">
        Wishing you a wonderful experience and safe travels!
      </p>

      <p style="font-size: 16px;">Sincerely,</p>
      <p style="font-size: 16px; font-weight: bold;">The Government of Sri Lanka</p>

      <hr style="border: 0; height: 1px; background-color: #ccc; margin: 20px 0;" />

      <footer style="font-size: 12px; color: #999; text-align: center;">
        <p>The Government of Sri Lanka | [Government Office Address] | [Contact Info]</p>
        <p>
          This email was sent to you because you applied for a visa through our official service. If you have any questions, please contact our support team.
        </p>
        <p>
          &copy; ${new Date().getFullYear()} The Government of Sri Lanka. All rights reserved.
        </p>
      </footer>
    </div>
  `;
};
