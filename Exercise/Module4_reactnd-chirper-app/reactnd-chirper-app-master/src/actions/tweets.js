import { saveLikeToggle, saveTweet } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_LIKE = "TOGGLE_LIKE";
export const ADD_TWEET = "ADD_TWEET";

export const recieveTweets = (tweets) => ({
  type: RECEIVE_TWEETS,
  tweets,
});

const toggleLike = ({ id, hasLiked, authedUser }) => ({
  type: TOGGLE_LIKE,
  id,
  hasLiked,
  authedUser,
});

const addTweet = (tweet) => ({
  type: ADD_TWEET,
  tweet,
});

export const handleAddTweet = (text, replyingTo) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return saveTweet({ text, author: authedUser, replyingTo })
      .then((formattedTweet) => {
        dispatch(addTweet(formattedTweet));
      })
      .then(() => dispatch(hideLoading()));
  };
};

export const handleToggleLike = (info) => {
  return (dispatch) => {
    dispatch(toggleLike(info));
    return saveLikeToggle(info).catch((e) => {
      console.warn("Error in handleToggleTweet: ", e);
      dispatch(toggleLike(info));
      alert("There was an error liking the tweet. Try again.");
    });
  };
};
