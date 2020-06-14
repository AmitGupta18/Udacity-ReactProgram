import { RECEIVE_TWEETS, TOGGLE_LIKE, ADD_TWEET } from "../actions/tweets";

export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets,
      };
    case TOGGLE_LIKE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes:
            action.hasLiked === true
              ? state[action.id].likes.filter(
                  (uid) => uid !== action.authedUser
                )
              : state[action.id].likes.concat([action.authedUser]),
        },
      };
    case ADD_TWEET:
      const { tweet } = action;

      let replyingTo = {};
      if (tweet.replyingTo !== null) {
        // Update tweet which this tweet is replying to
        replyingTo = {
          [tweet.replyingTo]: {
            // [tweet.replyingTo] is an id of the tweet which this tweet is replying to
            ...state[tweet.replyingTo], // Keep everythin of parent tweet as-is
            replies: state[tweet.replyingTo].replies.concat([tweet.id]), // update replies array by concatenating it with this tweet's id
          },
        };
      }

      return {
        ...state,
        [tweet.id]: tweet,
        ...replyingTo, // Update parent tweet's replies array
      };
    default:
      return state;
  }
}
