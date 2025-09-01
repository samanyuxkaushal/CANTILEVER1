const jwt = require('jsonwebtoken');

// This middleware function protects routes by verifying the JWT
function authMiddleware(req, res, next) {
  // 1. Get token from the request header
  const token = req.header('x-auth-token');

  // 2. Check if no token is present
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  // 3. Verify the token
  try {
    // Decode the token using the same secret from the .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the user payload (e.g., user ID) to the request object
    // This makes the user's information available in all subsequent protected route handlers
    req.user = decoded.user;
    
    // 5. Pass control to the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
}

module.exports = authMiddleware;

