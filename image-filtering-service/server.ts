import express from 'express';
import bodyParser from 'body-parser';
import { Response, Request } from 'express';
import { ImageRouter } from './controllers/v1/image.router';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.use('/api/v1/', ImageRouter);

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req: Request, res: Response) => {
    res.send("try POST /api/v1/imagetoprocess with parameters image_url and optionally upload_image_signedUrl")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();