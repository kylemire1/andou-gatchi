export const GATCHI_CONTEXT_INITIAL_STATE = {
  currentState: "idle",
  health: 0,
  donors: [],
  topDonor: false,
};

const gatchiContextReducer = (state = GATCHI_CONTEXT_INITIAL_STATE, action) => {
  switch (action.type) {
    case "FEED":
      const { amount, username } = action.payload;
      let newDonors = state.donors;

      const foundIndex = newDonors.findIndex(
        (donor) => donor.username === username
      );
      if (foundIndex >= 0) {
        newDonors[foundIndex] = {
          ...newDonors[foundIndex],
          amount: newDonors[foundIndex].amount + amount,
        };
      } else {
        newDonors = [...newDonors, { username, amount }];
      }

      newDonors = sortDonors(newDonors);

      return {
        ...state,
        currentState: "thanking",
        health: state.health + action.payload.amount,
        donors: newDonors,
        topDonor: newDonors[0],
      };
    case "RETURN_TO_IDLE":
      return {
        ...state,
        currentState: "idle",
      };
    case "FULL_HEALTH":
      return {
        ...state,
        currentState: "full",
      };
    default:
      return state;
  }
};

const sortDonors = (donors) => {
  if (!donors.length) {
    return [];
  }

  donors.sort((a, b) => {
    if (a.amount < b.amount) {
      return 1;
    }
    if (a.amount > b.amount) {
      return -1;
    }
    return 0;
  });

  return donors;
};

export default gatchiContextReducer;
