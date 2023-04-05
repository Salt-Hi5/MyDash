# MyDash
### Your Personalized Google Dashboard

MyDash is a full-stack web application built by the mob Hi5 as our final project during the 13-week bootcamp at [**`</salt>`** (School of Applied Technology)](https://www.linkedin.com/company/applied-technology-stockholm/mycompany/). MyDash gives the user an overview of all their Google services, with the ability to see their emails, calendar appointments and recent files in Google Drive.

The application's frontend is written in TypeScript using React. It has a primary backend written in C# using ASP.NET, and a secondary one to handle the API calls with Google, written in JavaScript using Node.js and Express.js. It uses a SQL Server to store non-sentitive user settings, and is deployed using Azure.

### Privacy

MyDash takes user privacy very seriously, and does not store any sensitive information retrieved from Google. We store only the user's first name, email address and the link to their Google profile picture, along with saved application settings such as which locations to show weather data about.
