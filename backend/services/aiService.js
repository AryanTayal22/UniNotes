const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

const generateNotes = async (topic) => {
  try {
    const prompt = `You are a helpful study assistant that creates comprehensive study notes for university students.

Generate comprehensive study notes on the topic: "${topic}"

Please structure the notes as follows:
1. **Introduction** - Brief overview of the topic
2. **Key Concepts** - Main ideas and definitions
3. **Detailed Explanation** - In-depth coverage with examples
4. **Important Points to Remember** - Bullet points of crucial information
5. **Summary** - Quick recap

Make the notes clear, concise, and suitable for university students preparing for exams.
Use markdown formatting for better readability.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate notes: ' + error.message);
  }
};

const summarizeNote = async (title, description, subject, tags, extractedContent = null) => {
  try {
    let prompt;
    
    if (extractedContent) {
      // Content-based summary (actual document text available)
      prompt = `You are a helpful study assistant. Summarize the following study document.

**Document Title:** ${title}
**Subject:** ${subject}

**Document Content:**
${extractedContent}

Generate a helpful 2-3 paragraph summary that:
1. Explains the main topics covered in the document
2. Highlights key concepts and important points
3. Mentions any formulas, definitions, or critical information

Keep it informative and suitable for students preparing for exams. Use markdown formatting.`;
    } else {
      // Metadata-based summary (fallback when content extraction fails)
      prompt = `You are a helpful study assistant that provides concise summaries and context for study materials.

Provide a concise AI summary for the following study note:

Title: ${title}
Subject: ${subject}
Description: ${description || 'No description provided'}
Tags: ${tags?.join(', ') || 'None'}

Generate a helpful 2-3 paragraph summary that:
1. Explains what this note is likely about based on the title and subject
2. Highlights key topics the student should expect to learn
3. Provides brief context about why this topic is important

Keep it informative, helpful, and suitable for students. Use markdown formatting.`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate summary: ' + error.message);
  }
};

module.exports = { generateNotes, summarizeNote };
