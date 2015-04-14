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
	var validateResponse = myMugin.validate();

	// Following is not required for Mugin core, syntatic sugar
	myMugin.history.set();
	panelUi(validateResponse);
};

// Check for any cookies we might need to handel
if(getCookie('registration') !== 1){
	removeCookie('registration');
	var newDiv = document.createElement('div'); 
	newDiv.setAttribute('class', 'alert-success');
	var newMessage = document.createTextNode('Success! Please use your mug to login.'); 
		newDiv.appendChild(newMessage);
	var body = document.getElementById('mugin'); 
		body.insertBefore(newDiv, body.childNodes[0]);
}

// Following is not required for Mugin core, more syntatic sugar
// Count the login attempts
myMugin.history = {
	get : function(){
		return this.loginAttempts;
	},
	set : function(){
		this.loginAttempts = this.loginAttempts + 1 || 1;
	}
}

// Modify DOM to show mugin response
function panelUi(validateResponse){
	var loginBadge = document.getElementById('mugin-stats-login');
	var countBadge = document.getElementById('mugin-stats-attempt');
	var confidenceBadge = document.getElementById('mugin-stats-confidence');

	// Only update the following if we have a response
	if(validateResponse){

		// Set UI elements
		if(validateResponse.match){
			// Set Confidence 
			confidenceBadge.innerHTML = validateResponse.confidence;
			// Set Login Status
			loginBadge.innerHTML = 'Logged In';
			var newUser = {"user" : { "status" : 'true' }};
			setCookie('user', JSON.stringify(newUser) );
		}
		else{
			// Set confidence 
			confidenceBadge.innerHTML = '0';
			// Set Login Status
			loginBadge.innerHTML = 'Logged Out';
		}
	}

	//  Set Count Badge
	countBadge.innerHTML = myMugin.history.get();
	
}