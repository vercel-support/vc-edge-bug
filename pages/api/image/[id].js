import chromium from "chrome-aws-lambda";

export default async (req, res) => {
  const { id } = req.query;

  // Start the browser with the AWS Lambda wrapper (playwright-aws-lambda)
  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, "--font-render-hinting=medium"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    ignoreHTTPSErrors: true,
    headless: true,
  });

  // Create a page with the Open Graph image size best practise
  const page = await browser.newPage();

  await page.goto(
    `${
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"
    }/post/${id}`,
    {
      timeout: 15 * 1000,
    }
  );

  const data = await page.screenshot({
    type: "png",
  });

  await browser.close();

  res.setHeader("Cache-Control", "s-maxage=3000, stale-while-revalidate");
  res.setHeader("Content-Type", "image/png");

  res.end(data);
};
