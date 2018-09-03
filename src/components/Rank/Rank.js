import React from 'react'


const Rank = (props) => {
	console.log('user',props.user.name)
	return (
    	<div>
	   		<div className='white f5'>
	   			{`${props.user.name}, your current entry count is..`}
	   		</div>
	   		<div className='white f1'>
	   			{props.user.entries}
	   		</div>
    	</div>
	)
}


export default Rank