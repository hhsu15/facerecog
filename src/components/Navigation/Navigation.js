import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {
	return (
		isSignedIn ?
	    	<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
	        	<p onClick={() => onRouteChange('signout')} className='f3 link dim black pa3 pointer'>Sign out</p>
	    	</nav>
    	: (
    		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
	        	<p onClick={() => onRouteChange('signin')} className='f3 link dim black pa3 pointer'>Sign In</p>
	        	<p onClick={() => onRouteChange('registration')} className='f3 link dim black pa3 pointer'>Registration</p>
	    	</nav>
    	)

	)
}


export default Navigation