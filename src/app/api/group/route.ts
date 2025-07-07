export const GET = async () => {
  return new Response(
    JSON.stringify({
      message: "This is the group API route",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
