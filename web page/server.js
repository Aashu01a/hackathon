import express from "expresws"
const app = express();
const port = 5002;

// Middleware to parse JSON request bodies
app.use(express.json());

// POST route to handle /api/preferences
app.post('/api/preferences', (req, res) => {
    const { strengths, weaknesses, learningStyle } = req.body;
    console.log('Received preferences:', strengths, weaknesses, learningStyle);

    // Simulate creating a user and returning an ID
    const userId = "exampleUserId123";
    res.json({ _id: userId });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

async function submitPreferences() {
    console.log('Submitting user preferences...');  // Logs when submitPreferences is called
    const strengths = document.getElementById('strengths').value.split(',');
    const weaknesses = document.getElementById('weaknesses').value.split(',');
    const learningStyle = document.getElementById('learningStyle').value;

    // Send user data to the server
    const response = await fetch('http://localhost:5002/api/preferences', { // Updated port to 5002
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ strengths, weaknesses, learningStyle })
    });

    const data = await response.json();
    console.log('User preferences submitted, ID:', data._id);  // Log to confirm data submission
    fetchRecommendations(data._id);
}

async function fetchRecommendations(userId) {
    console.log('Fetching recommendations for user:', userId);  // Log before fetching recommendations
    const response = await fetch(`http://localhost:5002/api/recommendations/${userId}`);
    const recommendations = await response.json();

    // Display recommendations on the page
    document.getElementById('recommendations').innerHTML = 
        `<h3>Recommended Learning Path:</h3><ul>${recommendations.map(r => `<li>${r}</li>`).join('')}</ul>`;
    console.log('Recommendations displayed on page');  // Log after displaying recommendations
}
app.get('/', (req, res) => {
    res.send('Server is working');
});
