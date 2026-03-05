require('dotenv').config();
const mongoose = require('mongoose');

async function clearSummaries() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const result = await mongoose.connection.db.collection('notes').updateMany(
      {}, 
      { $unset: { aiSummary: '' } }
    );
    
    console.log('Cleared aiSummary from', result.modifiedCount, 'notes');
    await mongoose.disconnect();
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
  }
}

clearSummaries();
