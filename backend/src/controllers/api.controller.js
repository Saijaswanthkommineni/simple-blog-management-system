// API Controller - Business logic for API endpoints

const getRoot = (req, res) => {
  res.json({
    success: true,
    message: 'Backend server is running successfully.'
  });
};

const getHealth = (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
};

const postTest = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Request body is required.'
    });
  }

  res.json({
    success: true,
    message: 'POST request received.',
    data: {
      name: name
    }
  });
};

module.exports = {
  getRoot,
  getHealth,
  postTest
};
