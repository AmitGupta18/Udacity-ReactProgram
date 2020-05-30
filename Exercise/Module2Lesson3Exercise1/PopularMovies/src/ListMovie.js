import React, { Component } from 'react';
import ListProfile from './ListProfile';

class ListMovie extends Component{
render(){
  	const {profiles, users, movies} = this.props;
	return(
    	<div>
      		{Object.keys(movies).map((key) => (
          	<div>
            	<h2>{movies[key].name}</h2>
            	<p>{"Liked by:"}</p>
				<ListProfile users={users} profiles={profiles.filter((profile) => profile.favoriteMovieID == key)} />
          	</div>
        	))}
      	</div>
    );
}
}

export default ListMovie