import { userAuthSuccess } from '../../../shared/actionTypes';

export default function reducer(state = {
  userAuth
}, action) {
  switch(action.type) {
    case userAuthSuccess:
     return {
       ...state,
       userAuth: action.payload
     }
  }
}
