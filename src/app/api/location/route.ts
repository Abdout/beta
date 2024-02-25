// // pages/api/location.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import fetch from 'node-fetch';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { input } = req.body;

//   // Check if input is a URL
//   const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
//     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
//     '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
//     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
//     '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
//     '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

//   if(urlPattern.test(input)) {
//     // Input is a URL, extract coordinates
//     const match = input.match(/@(-?\d+\.\d+),(-?\d+\.\d+),/);
//     if (match) {
//       const latitude = match[1];
//       const longitude = match[2];

//       // Use Geocoding API to get location details
//       const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`);
//       const data = await response.json();

//       // Extract city and district from data
//       const city = data.results[0].address_components.find((component: any) => component.types.includes('locality')).long_name;
//       const district = data.results[0].address_components.find((component: any) => component.types.includes('administrative_area_level_2')).long_name;

//       res.status(200).json({ city, district });
//     } else {
//       res.status(400).json({ error: 'No coordinates found in the URL' });
//     }
//   } else {
//     // Input is not a URL, assume it's a city and district separated by a comma
//     const [city, district] = input.split(',').map((str: string) => str.trim());

//     res.status(200).json({ city, district });
//   }
// }