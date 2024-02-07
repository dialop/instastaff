// Import necessary modules
const express = require('express');
const router = express.Router();
const mailgun = require('mailgun-js');
require('dotenv').config();

// Initialize Mailgun with API key and domain
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

// Route to send an email notification
router.post('/send-email', (req, res) => {
  const job = req.body;

  // Send email notification
  mg.messages().send({
    // Hard coded where to send email, will add req.params from cookies later
    from: 'Instastaff Team <instastaff@gmail.com>',
    to: 'nurse.instastaff@gmail.com', // Update with recipient email
    subject: `Shift Booking Confirmation at ${job.facility_name}`,
    text: `
    Dear Nurse,

Congratulations! You have successfully booked a shift at ${job.facility_name}.

Details of your booked shift:
- Facility: ${job.facility_name}
- Address: ${job.facility_short_address}, Toronto, ON
- Date: ${new Date(job.date).toLocaleDateString()}
- Start Time: ${job.start_time}
- Occupation: ${job.title}
- Duration: ${job.duration} hours

Thank you for choosing InstaStaff for your staffing needs. If you have any questions or need further assistance, feel free to contact us.

Best regards,
InstaStaff Team` 
  }, (error, body) => {
    if (error) {
      console.log(error);
      res.status(500).send({ message: 'Error sending email' });
    } else {
      console.log(body);
      res.send({ message: 'Email sent' });
    }
  });
});

module.exports = router;
