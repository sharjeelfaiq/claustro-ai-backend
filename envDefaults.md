# Database connection URL
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/db_name?schema=public

# Generate JWT Secret by running the following command in the terminal: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET_KEY=your_secret_key_here

# JWT token expiry time. Example values: '1h' for 1 hour, '7d' for 7 days.
JWT_EXPIRATION_TIME=1h

# Port number
PORT=3000

# Node environment
NODE_ENV=development