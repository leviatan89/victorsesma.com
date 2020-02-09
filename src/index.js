import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const CONF = {
	'candidateInfo':
	{
		'name':'Victor',
		'surname':'Sesma',
		'summaryLines':'Golang Developer Based in London',
	}
};

ReactDOM.render(<App conf={CONF}/>, document.getElementById('root'));
registerServiceWorker();
