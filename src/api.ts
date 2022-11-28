export const getDummyProducts = async () => {
  const data = await (
    await fetch("https://dummyjson.com/products?limit=100")
  ).json();
  return data?.products ? data?.products : [];
};
