import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const CONF = {
	'candidateInfo':
	{
		'name':'Victor',
		'surname':'Sesma Ramon',
		'summaryLines':'Passion Driven Dev',
	},
		'blogPosts':
		{
			0:{
				'createdOn':'2018-03-27 01:03:00',
				'createdBy':'Victor Sesma Ramon',
				'postTitle':'First Post That Says You "Hello World"',
				'postContent':'This is my first blog post. I will tell you cool stuff in here. For now it is just my hello world. I am online.'
			}/*,
			1:{
				'createdOn':'2017-03-03 15:15:25',
				'createdBy':'Victor Sesma Ramon',
				'postTitle':'Second post!',
				'postContent':'Super long content 2. Super long content 2. Super long content 2. Super long conten 2.'
			}*/
		}
};

ReactDOM.render(<App conf={CONF}/>, document.getElementById('root'));
registerServiceWorker();
