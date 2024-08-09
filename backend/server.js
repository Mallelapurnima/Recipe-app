const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectToDatabase = require('./app/config/database'); // Adjusted to use the correct import
const router = require('./app/config/routes.js');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const { typeDefs } = require('./app/schema');
const { resolvers } = require('./app/resolvers');
const { verifyToken } = require('./app/middleware/auth');


// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/', router);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const SECRET_KEY = 'your_secret_key'; 

const startServer = async () => {
  // Connect to the database
  await connectToDatabase();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      const user = verifyToken(token.replace('Bearer ', ''));
      return { user };
    },
    });

  await server.start();
  server.applyMiddleware({ app });

  // Route for handling image uploads
  app.post('/upload', upload.single('image'), (req, res) => {
    const imageURL = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ imageURL });
  });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
