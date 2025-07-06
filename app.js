const express = require('express');
const path = require('path');
const app = express();

// Set up EJS as the template engine
app.set('view engine', 'ejs');

// Set the views folder where the EJS files are stored
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JavaScript) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get(['/', '/index'], (req, res) => {
    res.render('index');
});

// Route for the About Me page
app.get('/about', (req, res) => {
    res.render('about'); // Renders the 'about.ejs' file from the 'views' folder
});

// Route for the Projects page
app.get('/projects', (req, res) => {
    res.render('projects');  // Ensure 'projects.ejs' is being rendered
});

// Route for the Contact page (serving static HTML file)
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);  // Corrected with backticks
});
