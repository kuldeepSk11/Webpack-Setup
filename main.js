
import React from 'react';
import ReactDOM from 'react-dom';
var css = require('./src/css/style.scss');
import 'bootstrap';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';


class App extends React.Component{
	
	render(){
		return(
			
			<div className="container">hello word
			<i className="fas fa-user"></i> 
			</div>	
				
			
		)
	}
}
ReactDOM.render(<App />, document.getElementById('root'));


