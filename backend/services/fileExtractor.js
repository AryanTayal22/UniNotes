const axios = require('axios');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Extract text content from a file URL
 * Supports: PDF, DOCX
 */
const extractTextFromFile = async (fileUrl, fileType) => {
  try {
    // Download the file as a buffer
    const response = await axios.get(fileUrl, {
      responseType: 'arraybuffer',
      timeout: 30000 // 30 second timeout
    });
    
    const buffer = Buffer.from(response.data);
    
    // Extract text based on file type
    if (fileType?.includes('pdf')) {
      return await extractFromPDF(buffer);
    } else if (fileType?.includes('word') || fileType?.includes('document') || fileUrl.endsWith('.docx')) {
      return await extractFromDOCX(buffer);
    }
    
    // For unsupported types, return null
    return null;
  } catch (error) {
    console.error('File extraction error:', error.message);
    return null;
  }
};

/**
 * Extract text from PDF buffer
 */
const extractFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    // Get first 5000 characters to keep it manageable for AI
    return data.text.substring(0, 5000);
  } catch (error) {
    console.error('PDF parsing error:', error.message);
    return null;
  }
};

/**
 * Extract text from DOCX buffer
 */
const extractFromDOCX = async (buffer) => {
  try {
    const result = await mammoth.extractRawText({ buffer });
    // Get first 5000 characters to keep it manageable for AI  
    return result.value.substring(0, 5000);
  } catch (error) {
    console.error('DOCX parsing error:', error.message);
    return null;
  }
};

module.exports = { extractTextFromFile };
