/****************************************************************************
* @filename      mugin.js
* 
* @author        Harrison DeStefano
* @authorURI     harrisondestefano.come
*
* @description   Login using your mug
* @dependencies  WebRTC, Resemble
* @since	 	 March 14, 2015
* @version       0.0.1
****************************************************************************/

'use strict';
	
var Mugin = function(defaults){

	this.defaults = {
		
		constraints : {

			audio: false,
	  		
	  		video: true
		},	
		
		el : function(){ return document.querySelector('video') }
			
		
	},

	this.go = function(){
		/* 
		* Prompts the user for permission to use a media device such as a camera or microphone. 
		* If the user provides permission, the successCallback is invoked on the calling 
		* application with a LocalMediaStream object as its argument.
		*/	
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		
		navigator.getUserMedia(this.defaults.constraints, this.stream, this.fail);

	},

	this.fail = function(response){
		
		return response;
	
	},

	this.stream = function(stream){
		
		window.stream = stream; 

		var el = document.querySelector('video'); //this.defaults.el();
			
		if (window.URL) {
		
			el.src = window.URL.createObjectURL(stream);
		
		} else {
		
			el.src = stream;
		}
	
	},

	this.validate = function(publicMug){
		
		var privateMug = this.getMug('private') || null;
		var publicMug = this.getMug('public') || null;

		console.log('privateMug -> ' + privateMug);
		console.log('publicMug -> ' + publicMug);
		
		// Search for private image by username

		// Compare private and public image(s)
		var diff = resemble(privateMug).compareTo(publicMug).ignoreColors().onComplete(function(data){
		    console.log(data);
		    /*
		    {
		      misMatchPercentage : 100, // %
		      isSameDimensions: true, // or false
		      dimensionDifference: { width: 0, height: -1 }, // defined if dimensions are not the same
		      getImageDataUrl: function(){}
		    }
		    */
		});


		// Return difference score, 


	},

	this.getMug = function(mugType){

		switch(mugType){
			case 'public' :

				var video =  document.querySelector('video'); 
				var canvas = document.getElementById('mugin-photo');

				// Set canvas height to video
				canvas.setAttribute('height', 480);
				canvas.setAttribute('width', 680);

				// Draw image onto canvas
				var context = canvas.getContext('2d');
        		context.drawImage(video, 0,0 );
				
				// Get photo UIR
				var URI = canvas.toDataURL('image/png');

				return URI;

			break;

			case 'private' : 
				/*
				* Check for stored user image and add to UI.
				*/
				var localData = window.localStorage.getItem('dataStore');
				
				if(localData){

					// create photo from local storage
					var localStore = JSON.parse(localData);
					var URI = localStore.location;

					// Returns 64bit array
					return URI;		
				}
			break;

			default :
				return 'Mugs are public or private' 
			break;
		}

		
	}

};