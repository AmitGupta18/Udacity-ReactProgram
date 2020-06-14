import React, { Component } from 'react';
class ListProfile extends Component{
render(){
  	const {profiles, users} = this.props;
	return(
        <ul>
      		{profiles.map((profile) => (
          		<li>{users[profile.userID].name}</li>
  			))}
  		</ul>
    );
}
}

export default ListProfile