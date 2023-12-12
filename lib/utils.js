export const currencyFormatter = (amount) => {
  // intL COMING FROM JAVASCRIPT ITSELF
  const formatter = Intl.NumberFormat("en-US", {
    currency: "AUD",
    style: "currency",
  });
  return formatter.format(amount);
};
export const dateFormatter = (timeStamp) => {
  let currentDate = new Date(timeStamp);
  return currentDate.toDateString(currentDate);
};
console.log(dateFormatter("2023-12-12T06:41:56.662Z"));
