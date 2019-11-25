import { Router, Request, Response } from 'express';
import request, { Request as HttpRequest, Response as HttpResponse } from 'request'
import { requireAuth } from './auth.router';
import { signedUrlIsValid, imageUrlIsValid, filterImageFromURL } from '../../utils';

const router: Router = Router();

// make PUT request to signed url
const handleSignedUrlPutRequest = (res: Response, imageSignedUrl: string, processedImage: string): HttpRequest => {
  return request
    .put(imageSignedUrl)
    .on('response', (response: HttpResponse) => {
      if (response.statusCode === 200) {
        res.status(200).sendFile(processedImage);
      } else {
        res.status(500).send('Something went wrong while sending to the signed url')
      }
    })
}

router.post('/imagetoprocess', requireAuth, async (req: Request, res: Response): Promise<Response> => {
  const { image_url: imageUrl, image_signedUrl: imageSignedUrl } = req.body;

  if (imageUrlIsValid(imageUrl)) {
    const processedImage = await filterImageFromURL(imageUrl);

    if (imageSignedUrl) {
      if (!signedUrlIsValid(imageSignedUrl)) {
        res.status(422).send('Signed image url is invalid')
        return;
      }

      request
        .get(processedImage)
        .on('response', (response: HttpResponse) => {
          if (response.statusCode !== 200) {
            res.status(400).send('Could not access the image via given image url');
            return
          }
        })
        .pipe(handleSignedUrlPutRequest(res, imageSignedUrl, processedImage));
    } else {
      res.status(200).send('Image processing was successful');
    }
  } else {
    res.status(422).send('Invalid image url was sent');
  }
});

export const ImageRouter: Router = router;
