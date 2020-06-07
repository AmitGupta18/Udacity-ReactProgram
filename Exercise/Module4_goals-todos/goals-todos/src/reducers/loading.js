import { RECEIVE_DATA } from "../actions/shared";

export default function loading(state = true, action) {
  if (action.type === RECEIVE_DATA) {
    return false;
  }
  return state;
}
