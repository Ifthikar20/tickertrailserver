import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import nodemailer from 'nodemailer';
import kpiRoutes from './routes/kpi.js';
import MainModel from './models/MainModel.js';
import { kpis } from './data/data.js';
import { userdata } from './data/userdata.js';
import UserModel from './models/UserModel.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



// Setting up Routes
app.use('/kpi', kpiRoutes);

// Nodemailer transport configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address from environment variables
    pass: process.env.EMAIL_PASS,
  },
});

// Sample data
const sampleData = [
  {
    link: "https://finance.yahoo.com/m/fc3e0dd0-6992-30d3-885f-fdc9bb948ff8/is-nvidia-stock-a-buy-now%3F.html",
    providerPublishTime: 1722791220,
    publisher: "Motley Fool",
    relatedTickers: ["NVDA", "GOOG", "AAPL"],
    thumbnail: {
      resolutions: [
        {
          height: 553,
          tag: "original",
          url: "https://s.yimg.com/uu/api/res/1.2/pXgmy3ko5Oh1xGP.S8bK1w--~B/aD01NTM7dz03MjA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/motleyfool.com/e76d4474c429b5ccc76ca8cbac8ddfb3",
          width: 720
        },
        {
          height: 140,
          tag: "140x140",
          url: "https://s.yimg.com/uu/api/res/1.2/oAQjC_3z72ObM3nJhRPPQw--~B/Zmk9ZmlsbDtoPTE0MDtweW9mZj0wO3c9MTQwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/motleyfool.com/e76d4474c429b5ccc76ca8cbac8ddfb3",
          width: 140
        }
      ]
    },
    title: "Is Nvidia Stock a Buy Now?",
    type: "STORY",
    uuid: "fc3e0dd0-6992-30d3-885f-fdc9bb948ff8"
  },
  {
    link: "https://finance.yahoo.com/news/warren-crushed-apple-says-jim-170112894.html",
    providerPublishTime: 1722790872,
    publisher: "Benzinga",
    relatedTickers: ["AAPL"],
    thumbnail: {
      resolutions: [
        {
          height: 576,
          tag: "original",
          url: "https://s.yimg.com/uu/api/res/1.2/unqlNNgqEbpKQYiqOnXeYw--~B/aD01NzY7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/Benzinga/ff97706c2ca330eddf054f73d63930fa",
          width: 1024
        },
        {
          height: 140,
          tag: "140x140",
          url: "https://s.yimg.com/uu/api/res/1.2/dXhq_0nlougBwhCVyecqig--~B/Zmk9ZmlsbDtoPTE0MDtweW9mZj0wO3c9MTQwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/Benzinga/ff97706c2ca330eddf054f73d63930fa",
          width: 140
        }
      ]
    },
    title: "'Warren Crushed Apple' Says Jim Cramer As Buffett Cuts Stake In Tech Giant By Nearly Half: Here's How Much Dividend Income Berkshire Forgoes",
    type: "STORY",
    uuid: "ad62479e-908b-3630-b2ef-c5f5902a5923"
  },
  {
    link: "https://finance.yahoo.com/m/0500666c-0e0a-3850-9762-713cc8042739/these-2-dow-stocks-are-set-to.html",
    providerPublishTime: 1722785940,
    publisher: "Motley Fool",
    relatedTickers: ["AMZN", "AAPL", "^DJI", "^GSPC", "MSFT"],
    thumbnail: {
      resolutions: [
        {
          height: 473,
          tag: "original",
          url: "https://s.yimg.com/uu/api/res/1.2/_utSSWX5hNc3pxSQhdknGA--~B/aD00NzM7dz03MjA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/motleyfool.com/dc47722b85eb82fde96479445731c4b9",
          width: 720
        },
        {
          height: 140,
          tag: "140x140",
          url: "https://s.yimg.com/uu/api/res/1.2/Tm_zlcJpvTY3YGiKA5mVlA--~B/Zmk9ZmlsbDtoPTE0MDtweW9mZj0wO3c9MTQwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/motleyfool.com/dc47722b85eb82fde96479445731c4b9",
          width: 140
        }
      ]
    },
    title: "These 2 Dow Stocks Are Set to Soar in 2024 and Beyond",
    type: "STORY",
    uuid: "0500666c-0e0a-3850-9762-713cc8042739"
  },
  {
    link: "https://finance.yahoo.com/news/apple-investors-urged-stay-calm-153440866.html",
    providerPublishTime: 1722785680,
    publisher: "Bloomberg",
    relatedTickers: ["AAPL", "BRK-B"],
    thumbnail: {
      resolutions: [
        {
          height: 1333,
          tag: "original",
          url: "https://s.yimg.com/uu/api/res/1.2/K4.933utkhnR6.1HpTeEhQ--~B/aD0xMzMzO3c9MjAwMDthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/en/bloomberg_markets_842/f9905bc9b1afde5c020196583c118866",
          width: 2000
        },
        {
          height: 140,
          tag: "140x140",
          url: "https://s.yimg.com/uu/api/res/1.2/aOVwwq1Lnmj5VKAijj4FkQ--~B/Zmk9ZmlsbDtoPTE0MDtweW9mZj0wO3c9MTQwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/bloomberg_markets_842/f9905bc9b1afde5c020196583c118866",
          width: 140
        }
      ]
    },
    title: "Apple Investors Urged to Stay Calm After Buffett Slashes Stake",
    type: "STORY",
    uuid: "4fae3098-1189-3fb6-8a59-a8feee96d65a"
  }
];

// Function to generate HTML for email
const generateEmailHTML = (articles) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Article Digest</title>
  <style>
      body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #e9ecef;
      }
      .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between; /* Ensure there is space between the column */
          max-width: 800px;
          margin: 0 auto; /* Center the container */
          padding: 0 20px; /* Padding on the sides */
      }
      .header {
          text-align: center;
          width: 100%; /* Ensure the header spans the full width */
          padding: 20px 0; /* Padding above and below the header */
      }
      .header h1 {
          margin: 0;
          font-size: 2em; /* Large size for the header */
          color: #333;
      }
      .divider {
          width: 100%; /* Full width divider */
          height: 4px;
          background-color: #007bff;
          margin-bottom: 20px; /* Space after the divider */
      }
      .card {
          background-color: #ffffff;
          border: 1px solid #ddd;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          overflow: hidden;
          width: 300px; /* Half the container width minus gap */
          height: 300px; /* Fixed height to maintain square shape */
          margin-bottom: 20px; /* Space between rows */
      }
      .card img {
          width: 100%;
          height: 50%; /* Half the card's height for the image */
          object-fit: cover;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
      }
      .card-content {
          padding: 10px;
          flex: 1; /* Fill the remaining space */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
      }
      .card h2 {
          font-size: 1em; /* Smaller font size for space */
          margin: 5px 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis; /* Ellipsis for overflow text */
      }
      .card a {
          color: #007bff;
          text-decoration: none;
          margin-top: 10px;
          font-weight: bold;
      }
      .card a:hover {
          text-decoration: underline;
      }
  </style>
</head>
<body>
  <div class="container">
      <div class="header">
          <h1>News</h1>
          <div class="divider"></div>
      </div>
      ${articles.map(article => `
          <div class="card">
              <img src="${article.thumbnail.resolutions[0].url}" alt="${article.title}">
              <div class="card-content">
                  <h2>${article.title}</h2>
                  <a href="${article.link}" target="_blank">Read more</a>
              </div>
          </div>
      `).join('')}
  </div>
</body>
</html>
  `;
};


// Function to send an email
const sendEmail = async (to, subject, articles) => {
  const htmlContent = generateEmailHTML(articles);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: 'Check out the latest articles!',
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Example endpoint to send email
app.post('/send-email', async (req, res) => {
  const { email } = req.body;
  const subject = 'Your Daily Article Digest';

  try {
    await sendEmail(email, subject, sampleData);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email.' });
  }
});
// Sample GET endpoint
app.get('/status', (req, res) => {
  res.status(200).json({ message: 'Success', status: 'OK' });
});

const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {

}).then(async () => {
  app.listen(PORT, () => console.log(`Server port is ${PORT}`));
  // await mongoose.connection.db.dropDatabase();
  // MainModel.insertMany(kpis);
  // UserModel.insertMany(userdata);
}).catch((error) => console.log(`${error} did not connect`));

