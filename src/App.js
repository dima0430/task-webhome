import React from 'react'
import Form from './form/Form';
import Comments from './comments/Comments';

import './App.scss';

const App = ()=> {
	return (
		<div className='wrapper'>	
			<Form/>
			<Comments/>
		</div>
	);
}

export default App;
