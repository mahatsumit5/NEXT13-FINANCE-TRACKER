export const currencyFormatter = (amount) => {
  // intL COMING FROM JAVASCRIPT ITSELF
  const formatter = Intl.NumberFormat("en-US", {
    currency: "AUD",
    style: "currency",
  });
  return formatter.format(amount);
};
