// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  async function fetchData() {
    try {
      const response = await fetch('https://rest.ably.io/channels', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(process.env.ABLY_API_KEY as string)
        }
      });
      
      const data = await response.json();
      res.status(200).json( data )

      // Handle the response data here
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    }
  }

  await fetchData();

  
  
  
  
  

}
