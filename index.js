const express = require('express');
const path = require('path');
const sharp = require('sharp');

const app = express();
const port = 3000;

// Example route to process an image
app.get('/api/process-image', async (req, res) => {
  try {
    const imageName = req.query.image;

    // Validate image name
    if (!imageName) {
      return res.status(400).json({ error: 'Image name is required' });
    }

    // Build the image path
    const imagePath = path.join(__dirname, 'images', imageName);

    // Read the input image using Sharp
    const image = sharp(imagePath);

    // Apply image processing operations
    const processedImage = await image
      .resize(800) // Resize the image to a width of 800 pixels
      .grayscale() // Convert the image to grayscale
      .toBuffer();

    // Set the response headers
    res.set('Content-Type', 'image/jpeg');

    // Send the processed image as the response
    res.send(processedImage);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
