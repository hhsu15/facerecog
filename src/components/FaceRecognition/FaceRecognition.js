import React from 'react'
// use cmd + ctl + g to change all at the same time
const FaceRecognition = ({imageUrl}) => {
	return (
    	<div className='center ma'>
    	   <div className='absolute mt3'> 
    			<img alt='' src={imageUrl} width='400px' height='auto' />
    		</div>
    	</div>
	)
}


export default FaceRecognition