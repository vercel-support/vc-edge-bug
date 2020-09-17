This is a reproduction repo for a Vercel Edge Network caching bug. This requires VERCEL_URL as an Environment Variable in your vercel project config

Routes:

- /post/<id> is a simple dynamic page route
- /api/image/<id> returns an image of /post/<id>
- /image/<id> redirects to /api/image/<id>

The bug:

Vercel Edge caches the response of /api/image for as long as the serverless function is "warm". Once the function cold starts again, it does not return the cached response (which is set to last the maximum 365 days)

To reproduce:

- Deploy on vercel
- hit https://<url>/api/image/1234
- it should return an image of the route /post/1234
- the `x-vercel-header` will be MISS initially, on the second request it will be HIT
- wait until the serverless function is no longer warm (not sure how long this takes, I've only noticed it the day after) and send another request. it should take some time to spin up since it's a cold start, and then the `x-vercel-header` will be MISS

Expected results:

- /api/image/<id> returns the cached response for the full s-max-age length
- /image/<id> redirect also returns the cached response
