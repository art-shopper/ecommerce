/* -------------------<   ACTIONS   >--------------------- */

const SET_CART_LIST = 'SET_CART_LIST';
const ADD_ORDER_ITEM ='ADD_ORDER_ITEM';

/* ---------------<   ACTION CREATORS   >------------------- */

// export const authenticated = user => ({
//   type: AUTHENTICATED, user
// })

/* -------------------<   REDUCERS   >--------------------- */

const initialState = {
  list: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  }
  return state
};

/* ------------------<   DISPATCHERS   >-------------------- */
import axios from 'axios';

// Add an item to the state (might not need axios for this)


// Remove an item from the state


export default reducer;