import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
//https://www.npmjs.com/package/react-twitter-embed
import { TwitterTimelineEmbed } from 'react-twitter-embed'; 
import userImage from './victorSesma.png';
import linkedinIcon from './linkedIn.svg';
import twitterIcon from './twitter.svg';
import githubIcon from './github.svg';
import linkedinIconHover from './linkedInHover.svg';
import twitterIconHover from './twitterHover.svg';
import githubIconHover from './githubHover.svg';
import email from './email.png';
import './App.css';

class App extends Component {
  render() {
    return (
		<Router>
	      <div className="App">
					<Header conf={this.props.conf} />
					<Switch>
						<Route path="/" exact strict component={Home}/>
						<Route path="/blog" render={() => <Blog conf={this.props.conf} />} />
						<Route
						path="/curriculum-vitae"
						render={() => (
							<CurriculumVitae {...this.props} />
						)}
						/>
						<Route path="/contact-me" component={ContactMe} />
						<Route component={My404Component} />
					</Switch>
					<Footer />
	      </div>
		</Router>
    );
  }
}


class My404Component extends Component {
	render() {
		return (
			<article>
				<h2>404</h2>
				<p>Sorry, that page doesn’t exist!</p>
			</article>
		);
	}
}

class Ad extends Component {
	componentDidMount() {
		(window.adsbygoogle = window.adsbygoogle || []).push({
			google_ad_client: "ca-pub-3535299454867786",
			enable_page_level_ads: true
		});
	}

	render() {
		return (
			null
		);
	}
}

class ContactHeader extends Component{
	constructor(props) {
		super(props);
		this.state = {
			imageLinkedin: linkedinIcon,
			imageTwitter: twitterIcon,
			imageGithub: githubIcon
		};
	}
	handleMouseOverLinkedinEnter() {
		this.setState({
		 	imageLinkedin: linkedinIconHover
		 });
	}
	handleMouseOverLinkedinLeave() {
		this.setState({
		 	imageLinkedin: linkedinIcon
		 });
	}
	handleMouseOverTwitterEnter() {
		this.setState({
		 	imageTwitter: twitterIconHover
		 });
	}
	handleMouseOverTwitterLeave() {
		this.setState({
		 	imageTwitter: twitterIcon
		 });
	}	
	handleMouseOverGithubEnter() {
		this.setState({
		 	imageGithub: githubIconHover
		 });
	}
	handleMouseOverGithubLeave() {
		this.setState({
		 	imageGithub: githubIcon
		 });
	}	
	render(){
		return (
			<div>
				<h1>Get in Touch</h1>
				<a href="https://www.linkedin.com/in/v%C3%ADctor-sesma-ram%C3%B3n-3b2291104/" target="_blank" rel="noopener noreferrer">
					<img className="Contact-social" onMouseEnter={this.handleMouseOverLinkedinEnter.bind(this)} onMouseLeave={this.handleMouseOverLinkedinLeave.bind(this)} src={this.state.imageLinkedin} alt="Linkedin" />
				</a>
				<a href="https://twitter.com/VictorSesma_" target="_blank" rel="noopener noreferrer">
					<img className="Contact-social" onMouseEnter={this.handleMouseOverTwitterEnter.bind(this)} onMouseLeave={this.handleMouseOverTwitterLeave.bind(this)} src={this.state.imageTwitter} alt="Twitter" /> 
				</a>
				<a href="https://github.com/leviatan89" target="_blank" rel="noopener noreferrer">
					<img className="Contact-social" onMouseEnter={this.handleMouseOverGithubEnter.bind(this)} onMouseLeave={this.handleMouseOverGithubLeave.bind(this)} src={this.state.imageGithub} alt="Github" /> 
				</a>
				<p>Or email me to <a className="App-link" href="mailto:leviatan.89@gmail.com?Subject=Can%20we%20talk?">leviatan.89@gmail.com</a></p>
			</div>
		);
	}
}

class ContactMe extends Component{
	componentDidMount() {
		document.title = "Contact Me - Victor Sesma";
	}
	render(){
		return (
			<article>
				<ContactHeader />
			</article>
		);
	}
}


class Blog extends Component{
	componentDidMount() {
		document.title = "Blog - Victor Sesma";
	}
	render(){
		return (
			<BlogPosts conf={this.props.conf} />
		);
	}
}
class BlogPosts extends Component{
	render(){
		return (
			<section>
				{
					Object.keys(this.props.conf.blogPosts).map((post) =>
					<BlogPost conf={this.props.conf.blogPosts[post]} key={post}/>
					)
				}
			</section>
		);
	}
}
class BlogPost extends Component{
	render(){
		return (
			<article>
				<h1>{this.props.conf.postTitle}</h1>
				<p>{this.props.conf.postContent}</p>
				<p><i>By: {this.props.conf.createdBy} on {this.props.conf.createdOn}</i></p>
			</article>
		);
	}
}



class Home extends Component{
	componentDidMount() {
		document.title = "Home - Victor Sesma";
	}
	render(){
		return (
			<article>
				<h1>Welcome to Victor Sesma's website</h1>
				<div className="Twitter-container">
					<TwitterTimelineEmbed
						sourceType="profile"
						screenName="VictorSesma_"
						options={{ height: 400 }}
					/>
				</div>
			</article>
		);
	}
}
class CurriculumVitae extends Component{
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			lifeEvents: []
		};
	}

	componentDidMount() {
		document.title = "Curriculum Vitae - Victor Sesma";
		fetch("https://api.victorsesma.com/cv/")
			.then(res => res.json())
			.then(
				(result) => {
					// console.log("result is", result);
					this.setState({
						isLoaded: true,
						lifeEvents: result
					});
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	render(){
		return (
			<section>
				{Object.keys(this.state.lifeEvents).map((lifeEvent)=>
					<LifeEvent key={this.state.lifeEvents[lifeEvent].ShownOrder} lifeEvent={this.state.lifeEvents[lifeEvent]}/>
				)}
			</section>
		);
	}
}

class Header extends Component{
	componentDidMount() {
		const s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		s.innerHTML = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-54TXN3H')";
		document.head.appendChild(s);
	}
	render(){
		return (
			<header className="App-header">
        		<PersonSummary conf={this.props.conf} />
				<Menu />
				<Ad />
      		</header>
		);
	}
}

const Menu = (props) => {
    return (
			<div className="Header-menu">
				<div className="Header-menu-item"><NavLink to="/" exact activeClassName={"Header-in-page"}>Home</NavLink></div>
				<div className="Header-menu-item"><NavLink to="/blog" activeClassName={"Header-in-page"}>Blog</NavLink></div>
				<div className="Header-menu-item"><NavLink to="/curriculum-vitae" activeClassName={"Header-in-page"}>Curriculum Vitae</NavLink></div>
				<div className="Header-menu-item"><NavLink to="/contact-me" activeClassName={"Header-in-page"}>Contact Me</NavLink></div>
			</div>
    );
}

class PersonSummary extends Component{
	render(){
		return(
			<div className="Person-summary">
				<PersonImg conf={this.props.conf}/>
				<PersonText conf={this.props.conf}/>
			</div>
		);
	}
}

class PersonImg extends Component{
	constructor(props) {
		super(props);
		this.state = {showVideo:false};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		console.log('clicked');
		this.setState(
			{showVideo:!this.state.showVideo}
		);
	}

	render(){
		const altName = (this.props.conf.candidateInfo.name+this.props.conf.candidateInfo.surname).replace(' ','');
		return(
			<div className="Person-img">
				<img onClick={this.handleClick} src={userImage} className="User-img" alt={altName} />
				<YouTube video="1VYFlIOdAfY" showVideo={this.state.showVideo} handleClick = {this.handleClick} />
			</div>
		);
	}
}


class YouTube extends Component{
	render(){
		var videoSrc = "https://www.youtube.com/embed/" +
				this.props.video + "?autoplay=" +
				this.props.autoplay + "&rel=" +
				this.props.rel + "&modestbranding=" +
				this.props.modest;
		var title = "youtube-"+this.props.title;
		if(this.props.showVideo !== false){
			return(
				<div className="YouTubeContainer" onClick={this.props.handleClick}>
					<div className="YouTube-overlay">
						<iframe className="YouTube-player" type="text/html" title={title} src={videoSrc} frameBorder="0"/>
					</div>
				</div>
			);
		}else{
			return(
				null
			);
		}
	}
}


function PersonName (conf){
		var fullName = conf.candidateInfo.name+' '+conf.candidateInfo.surname;
		return fullName;
}

class PersonText extends Component{
	render(){
		return(
			<div className="Person-text">
				<p className="Person-name">
					{PersonName(this.props.conf)}
				</p>
				<p className="Person-line">
					{this.props.conf.candidateInfo.summaryLines}
				</p>
			</div>
		);
	}
}

class Footer extends Component{
	render(){
		return(
			<div className="Footer">
				<ul>
					<li>
						<a href="https://github.com/leviatan89" target="_blank" rel="noopener noreferrer">Source Code</a>
					</li>
					<li>
						<a href="https://cli.ginernet.com/aff.php?aff=135" target="_blank" rel="noopener noreferrer">Hosted by GINERNET</a>
					</li>
					<li>
						<a href="https://twitter.com/VictorSesma_" target="_blank" rel="noopener noreferrer">Twitter</a>
					</li>
					<li>
						<a href="https://www.linkedin.com/in/v%C3%ADctor-sesma-ram%C3%B3n-3b2291104/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
					</li>
				</ul>
			</div>
		);
	}
}

class LifeEvent extends Component{
	render(){

		return(
				<article className="Life-event">
					<div className="Life-event-headline">
						<div className="Life-event-date">
							{this.props.lifeEvent.StartDate}-{this.props.lifeEvent.EndDate}
						</div>
						<div className="Life-event-title">
							<h1 className="Life-event-name">{this.props.lifeEvent.Name}</h1>
							<span className="Life-event-summary">{this.props.lifeEvent.Summary}</span>
						</div>
					</div>
					<div className="Life-event-description">
						<p>{this.props.lifeEvent.Description}</p>
					</div>
				</article>
		);
	}
}

export default App;
