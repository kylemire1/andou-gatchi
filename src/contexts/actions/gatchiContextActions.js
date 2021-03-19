import { FEED, FULL_HEALTH, RETURN_TO_IDLE } from "./types";

export const feed = (amount, username) => {
  return {
    type: FEED,
    payload: { amount, username },
  };
};

export const returnToIdle = () => {
  return {
    type: RETURN_TO_IDLE,
  };
};

export const fullHealth = () => {
  return {
    type: FULL_HEALTH,
  };
};
