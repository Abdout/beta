import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { html } = req.body;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};