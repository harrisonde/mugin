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

	this.validate = function(){
		
		var privateMug = ''
		var publicMug = null;


		// Search for private image by username

		// Compare private and public image(s)

		// Return difference score, 


	}

};