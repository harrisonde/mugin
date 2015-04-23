/****************************************************************************
* mugin-index.js
* 
* Harrison DeStefano
* www.harrisondestefano.com
*
* Creates a new mugin and form validation
* mugin.js
* April 11, 2015
***************************************************************************/
// Use constructor method to create a new mugin
var myMugin = new Mugin();

// As soon as the page loads, we need your mug!
myMugin.go();

// Setup event listener for button click 
var submitBtn = document.getElementById('mugin-login');
submitBtn.onclick = function(){
	myMugin.history.set();
	validate();
};

// Check for any cookies we might need to handel
if(getCookie('registration') !== 1){
	removeCookie('registration');
	var newDiv = document.createElement('div'); 
	newDiv.setAttribute('id', 'message');
	newDiv.setAttribute('class', 'alert alert-success');
	var newMessage = document.createTextNode('Success! Please use your mug to login.'); 
		newDiv.appendChild(newMessage);
	var body = document.getElementById('login'); 
		body.insertBefore(newDiv, body.childNodes[0]);
}

myMugin.history = {
	get : function(){
		return this.loginAttempts;
	},
	set : function(){
		this.loginAttempts = this.loginAttempts + 1 || 1;
	}
}

// Form validation
function validate(){
	var errors = [];
	var f = document.forms[0];
	
	// Validate form
	for(var i = 0; i < f.elements.length; i++){
	    if(f[i].id === 'email'){
	    	if(f[i].value.length === 0){
	    		errors.push('Email is required');
	    	}
	    	else{
		    	var localData = window.localStorage.getItem('userStore');
				if(localData){
					var localStore = JSON.parse(localData);
					var userEmail = localStore.eMail;
					// simple case insensitive comparison
					if(userEmail.toLowerCase() !== f[i].value.toLowerCase()){
						errors.push('The email or mug you entered is incorrect.');
					}
				}
		    }
	    }
	}
	// Check and display Errors
	if(errors.length > 0){		
		// Clear old errors
		var oldErrorElm = document.getElementById('message');
		if(oldErrorElm){
			oldErrorElm.remove();
		}
		//  Set Count Badge
		var countBadge = document.getElementById('mugin-stats-attempt');
		countBadge.innerHTML = myMugin.history.get();
		
		// Display errors
		var newDiv = document.createElement('ul'); 
		newDiv.setAttribute('id', 'message');
		newDiv.setAttribute('class', 'alert alert-danger');
		for(var err in errors){
			var newListItem = document.createElement('li');
			var newError = document.createTextNode(errors[err]); 
				newListItem.appendChild(newError);
				newDiv.appendChild(newListItem);
		}
		var body = document.getElementById('login'); 
			body.insertBefore(newDiv, body.childNodes[0]);
			window.scrollTo(0, 0);
	} 
	else {
		// Validate mug
		var pass = function(){ 
			var newUser = {"user" : { "status" : 'true' }};
			setCookie('user', JSON.stringify(newUser) );
			window.location = '/#/profile?status=loggedin&confidence='+myMugin.results.mugMatchConf;
		};

		var fail = function(){
			// Clear old errors
			var oldErrorElm = document.getElementById('message');
			if(oldErrorElm){
				oldErrorElm.remove();
			}
			// Display errors
			var newDiv = document.createElement('ul'); 
			newDiv.setAttribute('id', 'message');
			newDiv.setAttribute('class', 'alert alert-danger');
			var newListItem = document.createElement('li');
			var newError = document.createTextNode('We can not verify your mug.'); 
			newListItem.appendChild(newError);
			newDiv.appendChild(newListItem);
			var body = document.getElementById('login'); 
			body.insertBefore(newDiv, body.childNodes[0]);
			window.scrollTo(0, 0);
		}
		myMugin.validate(pass, fail);
	}
	

};