export const GATCHI_CONTEXT_INITIAL_STATE = {
  currentState: "idle",
  health: 0,
  donors: [],
};

const gatchiContextReducer = (state = GATCHI_CONTEXT_INITIAL_STATE, action) => {
  switch (action.type) {
    case "FEED":
      return {
        ...state,
        currentState: "thanking",
        health: state.health + action.payload.amount,
        donors: [...state.donors, action.payload.username],
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

export default gatchiContextReducer;
