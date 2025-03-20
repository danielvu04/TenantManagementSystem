import dotenv from 'dotenv';
import app from './app';

// Load environment variables
dotenv.config();

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 