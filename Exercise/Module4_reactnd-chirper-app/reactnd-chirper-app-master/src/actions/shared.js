import { getInitialData } from "../utils/api";
import { recieveTweets } from "./tweets";
import { recieveUsers } from "./users";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

const AUTHED_USER_ID = "tylermcginnis";

export const handleInitialData = () => {
  return (dispatch) => {
    // show loading bar on load
    dispatch(showLoading());

    getInitialData().then(({ users, tweets }) => {
      dispatch(recieveTweets(tweets));
      dispatch(recieveUsers(users));
      dispatch(setAuthedUser(AUTHED_USER_ID));

      // hide loading bar once data loads
      dispatch(hideLoading());
    });
  };
};
