import { userAuthSuccess } from '../../shared/actionTypes';

export default function reducer(state={
  userAuth: false
}, action) {
  switch(action.type) {
    case userAuthSuccess:
     return {
       ...state,
       userAuth: action.payload
     }
  }

  return state;
}
