/****************************************************************************
* mugin.js
* 
* Harrison DeStefano
* harrisondestefano.com
*
* Login using your mug
* WebRTC, Resemble
* March 14, 2015
* 0.0.1
****************************************************************************/

'use strict';
	
var Mugin = function(defaults){

	this.defaults = {
		
		constraints : {

			webtrc: {
			
				audio: false,
	  		
	  			video: true
	  		},

	  		mugMatchLimit : 65 
		},	
		
		el : function(){ return document.querySelector('video') }

	},

	this.results = {

		mugMatch : false, 

		mugMatchConf : 0
	}

	this.go = function(){
		/* 
		* Prompts the user for permission to use a media device such as a camera or microphone. 
		* If the user provides permission, the successCallback is invoked on the calling 
		* application with a LocalMediaStream object as its argument.
		*/	
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		
		navigator.getUserMedia(this.defaults.constraints.webtrc, this.stream, this.fail);

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

	this.validate = function(pass, fail){
		
		// Private Variables
		var self = this;
		var privateMug = this.getMug('private') || null;
		var publicMug = this.getMug('public') || null;
		var misMatchPercentageLimit = this.defaults.constraints.mugMatchLimit;
		var isMatch = null;

		var calcConfidenceScore = function(misMatchPercentage){
			return Math.floor(100.00 - misMatchPercentage);
		}
		var howConfidence = null;

		// Comparison by Huddle @ https://github.com/Huddle/Resemble.js
		resemble(privateMug).compareTo(publicMug).ignoreColors().onComplete(function(data){

			self.results.mugMatchConf = calcConfidenceScore(data.misMatchPercentage);
				
			if(misMatchPercentageLimit >= parseInt(data.misMatchPercentage)){
				self.results.mugMatch = true;
				pass();
			}
			else{
				self.results.mugMatch = false;
				fail();
			}
		
		});
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