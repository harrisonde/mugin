/****************************************************************************
* mugin-profile.js
* 
* Harrison DeStefano
* www.harrisondestefano.com
*
* Displays helpful user information
* mugin.js
* April 19, 2015
***************************************************************************/

'use strict'

// Add image to UI 
Mugin.prototype.drawImage = function(URI, width, height){

	// Add image (stub for fallback)
	function insertImg(URI){
		/*
		*	Add image to UI via img element and src attribute
		*/
		var photo = document.getElementById('mugin-photo');
		
		// Create new image
		var userImage = new Image();
		userImage.src = URI; 

		// Add into DOM
		photo.parentNode.insertBefore(userImage, photo);
	}
		
	function insertCanvas(URI){
		/*
		* Add image to UI via canvas element
		*/	

		// Create new image
		var userImage = new Image(width, height);
		userImage.src = URI;
		
		// Setup event listener, wait for image to load
		userImage.onload = function () {
			
			// Get the photo element
			var photo = document.getElementById('mugin-photo');
			
			// Set image ratio attribute(s)
			photo.setAttribute('width', 640);
			photo.setAttribute('height', 480);

			// Draw the image
			var context = photo.getContext('2d');
			context.drawImage(userImage, 0, 0);
		};
	}
	
	insertCanvas(URI);
}

// Add method to get stored image via prototype
Mugin.prototype.getImage = function(){
	/*
	* Check for stored user image and add to UI.
	*/
	var localData = window.localStorage.getItem('dataStore');
	
	if(localData){
		// create photo from local storage
		var localStore = JSON.parse(localData);
		var width = localStore.width;
		var height = localStore.height;
		var URI = localStore.location;
		Mugin.prototype.drawImage(URI, width, height);	
	}
};

// Get user data from localstorage
Mugin.prototype.user = function(){
	var localStore = JSON.parse(window.localStorage.getItem('userStore'));	
	this.currentUser = {
		nameFirst : localStore.nameFirst,
	    nameLast : localStore.nameLast,	
	    email : localStore.eMail
	};
};

var myMugin = new Mugin;

// Get stored mug and capter new one too.
myMugin.getImage();
myMugin.user();

// Show login stastics
var loginBadge = document.getElementById('mugin-stats-login');
var confidenceBadge = document.getElementById('mugin-stats-confidence');
var qString = window.location.hash.split('?')[1].split('&');
for(var q in qString){
	var k = qString[q].split('=')[0];
	var v = qString[q].split('=')[1];
	if(k === 'status'){
		loginBadge.innerHTML = v;
	}
	else if(k === 'confidence'){
		confidenceBadge.innerHTML = v;
	}
}; 

// Display user name
var displayName = document.getElementsByClassName('userName');
for(var i = 0; i < displayName.length; i++){
	//console.log(displayName[el]);
	displayName[i].innerHTML = myMugin.currentUser.nameFirst;
}

// Add user informatoin to the form
var f = document.forms[0];
for(var i = 0; i < f.elements.length; i++){
    switch(f[i].id)
    {
    	case 'nameFirst':
    		f[i].value = myMugin.currentUser.nameFirst;
    	break;
    	
    	case 'nameLast':
    		f[i].value = myMugin.currentUser.nameLast;
    	break;
    	
    	case 'email':
    		f[i].value = myMugin.currentUser.email;
    	break;
    }
}


