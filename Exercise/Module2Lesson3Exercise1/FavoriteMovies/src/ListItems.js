import React from "react";

class ListItems extends React.Component{
render(){
  	const {profiles, users, movies} = this.props;
	return (  
      <div>
      	{profiles.map(profile => 
         <p>{`${users[profile.userID].name}'s favorite movie is ${movies[profile.favoriteMovieID].name}`}. </p>
        )}
      </div>
    );
}
}

export default ListItems;