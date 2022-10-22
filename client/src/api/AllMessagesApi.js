import { get, post } from "./helpers/methodHelper";

export const getAllMessages = async (data) => {
  const res = await get(`all-messages`);
  return res;
};

export const postMarkAsSeen = async (data) => {
  const res = await post(`mark-seen`, data);
  return res;
};
export const postUpdatedJson = async (data) => {
  const res = await post(`update-json`, data);
  return res;
};

export { getAllMessages as default };
