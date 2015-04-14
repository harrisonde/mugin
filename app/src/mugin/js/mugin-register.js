/****************************************************************************
* mugin-register.js
* 
* Harrison DeStefano
* www.harrisondestefano.com
*
* Creates a new mugin and form validation
* mugin.js
* April 11, 2015
***************************************************************************/

var myMugin = new Mugin;

// Add method to set image via prototype 
Mugin.prototype.setImage = function(uri, height, width){
	/* 
	 * Users data is updated on the front-end, no need append to storage.
	 * Store a clean JSON object each time a new user is added.
	*/
	var jsonUserData = JSON.stringify({
		location : uri,
		height : height,
		width : width
	});
	if(!window.localStorage.getItem('dataStore')){
		// Write the object to localStorage
		window.localStorage.setItem("dataStore", jsonUserData);
	}
	else{
		window.localStorage.removeItem("dataStore");
		window.localStorage.setItem("dataStore", jsonUserData);
	}
};

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

// Get stored mug and capter new one too.
window.onload = function(){
	myMugin.go();
	myMugin.getImage();

	// Register event listener and function to do the magic
	var submitBtn = document.getElementById('mugin-register');
	submitBtn.addEventListener('click', setMyMug, false);

	function setMyMug(){	
		
		var isStreaming = window.stream || false;

		if(isStreaming){
			var video = document.getElementById('mugin-video');
			var photo = document.getElementById('mugin-photo');
			
			// get intrinsic 
			// https://html.spec.whatwg.org/multipage/embedded-content.html#the-video-element
			var height = video.videoWidth;
			var width = video.videoHeight;
			var ratio = video.videoHeight / (video.videoWidth/width);

			// create photo from video
			var context = photo.getContext('2d');
			context.drawImage(video, 0, 0);

			// Encoding photo data into base64 format
			var photoURI = photo.toDataURL('image/png');

			// Store said photo 
			myMugin.setImage(photoURI, height, width);
		}

		validate();
	}
	// validate the form
	function validate(){
		var errors = [];
		var f = document.forms[0];
		// clear old errors
		var oldErrorElm = document.getElementById('error');
		if(oldErrorElm){
			oldErrorElm.remove();
		}
		for(var i = 0; i < f.elements.length; i++){
		    switch(f[i].id)
		    {
		    	case 'nameFirst':
		    		if(f[i].value.length === 0){
		    			errors.push('First name is required');
		    		}
		    	break;
		    	
		    	case 'nameLast':
		    		if(f[i].value.length === 0){
		    			errors.push('Last name is required');
		    		}
		    	break;
		    	
		    	case 'email':
		    		if(f[i].value.length === 0){
		    			errors.push('Email is required');
		    		}
		    	break;

		    	case 'email-confirm':
		    		if(f[i].value.length === 0){
		    			errors.push('Email confirmation is required.');
		    		}
		    		else if( f[i].value !== f[i-1].value ){
		    			errors.push('Email must match');
		    		}
		    	break;
		    }
		}
		// Validate we have a  Mug
		var localData = window.localStorage.getItem('dataStore');
		if(localData){
			var localStore = JSON.parse(localData);
			var URI = localStore.location;
			if(!URI){
				errors.push('Your Mug is required.');
			}
		}else{
			errors.push('We don\'t have your Mug - it is required.');
		}

		// Check and display Errors
		if(errors.length > 0){
			var newDiv = document.createElement('ul'); 
			newDiv.setAttribute('id', 'error');
			for(err in errors){
				var newListItem = document.createElement('li');
				var newError = document.createTextNode(errors[err]); 
 				newListItem.appendChild(newError);
 				newDiv.appendChild(newListItem);
			}
			var body = document.getElementById('registration'); 
 			body.insertBefore(newDiv, body.childNodes[0]);
			var body = document.getElementById('registration'); 
 			window.scrollTo(0, 0);
		}
		else{
			setCookie('registration','complete');
			window.location = '/';
		}
		
	};

}