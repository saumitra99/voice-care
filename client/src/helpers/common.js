import dayjs from "dayjs";

const capitalizeFirstLetter = (string) =>
  string?.charAt(0)?.toUpperCase() + string?.slice(1);

export const PriceFormat = (price) =>
  price?.toLocaleString("en-IN", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
    style: "currency",
    currency: "INR",
  });

export const getEpoch = (TempDate) => dayjs(TempDate).unix();
// Math.round(new Date(TempDate).getTime() / 1000);
// Number(new Date(TempDate).getTime());

export const isJsonValid = (
  jsonString,
  StrictFields = ["uniqueId", "label", "text"]
) => {
  try {
    const o = JSON.parse(jsonString);
    if (o && typeof o === "object") {
      console.log(o, "json passed");
      if (Object.keys(o)?.every((i) => StrictFields.includes(i))) {
        return o;
      }
    }
  } catch (e) {}

  return false;
};

export const displayDateFormat = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

export default capitalizeFirstLetter;
