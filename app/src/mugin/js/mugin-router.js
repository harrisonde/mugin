/****************************************************************************
* mugin-router.js
* 
* Harrison DeStefano
* www.harrisondestefano.com
*
* Handle routes
* mugin.js
* April 14, 2015
***************************************************************************/

'use strict';

var Router = function(){
	
	var resource = {
		"404" : {
			"path" : "404.html"
		},
		"index" : {
			"path" : "index.html"
		},
		"profile":{
			"path" : "profile.html",
			"role" : "loggedin"
		},
		"register" : {
			"path":"register.html",
			"role": "loggedout"
		}
	};

	this.getResource = function(location){

		if(window.location.hash === ''){
			location = 'index';
		}
		else{
			var location = window.location.hash.split('/')[1];
		}

		// get path
		var path;
		for(var r in resource){
			if(r === location){
				path = 'view/'+resource[r].path;
			}
		}
		// handel unknown resource request
		if(path === undefined){
			path = 'view/'+resource['404'].path;
		}
		// make request
		var xhr = new XMLHttpRequest();
		xhr.open("GET", path); 
		xhr.send();
		xhr.addEventListener('readystatechange', function(){
	    	if(this.readyState == 4 && this.status == 200){  
	        	var html = this.response;
	    		// inject html
				var body = document.getElementById('mugin'); 
 				body.innerHTML = html;
 				// add script(s), if any
 				var childern = document.body.children;
 				for(var c in childern){
 					if( childern[c].tagName === 'CTRL'){
 						var script = document.createElement('script');
 						script.src = childern[c].getAttribute('src');
 						body.appendChild(script);
 					}
 				}

	    	}else if(this.status == 0){
	    		// inject html
	    		html = 'Error loading request.'; 
				var body = document.getElementById('mugin'); 
 				body.innerHTML = html;
	    	}
	    });
	}
};

window.addEventListener('load', function(){
	var myRouter = new Router;
	myRouter.getResource();

	// Listen for hash change
	window.addEventListener("hashchange", resourceLocator, false);

	function resourceLocator(){
		var location = window.location.hash;
		myRouter.getResource('index');
	}

});
