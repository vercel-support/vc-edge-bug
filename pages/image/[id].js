export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  ctx.res.statusCode = 307;
  ctx.res.setHeader(
    "Location",
    `${
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"
    }/api/image/${id}`
  );

  return {
    props: {},
  };
};

export default function Image() {
  return null;
}
