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
	
	var resources = {
		"404" : {
			"path" : "404.html"
		},
		"index" : {
			"path" : "index.html"
		},
		"profile":{
			"path" : "profile.html",
			"authorization" : "true"
		},
		"register" : {
			"path":"register.html"
		}
	};

	this.getResource = function(location){
		// Navigation based on hash
		if(window.location.hash === ''){
			location = 'index';
		}
		else{
			var location = window.location.hash.split('/')[1];
		}

		// get path
		// to do: clean up = move path into resource
		var path, resource;
		for(var r in resources){
			if(r === location){
				resource = resources[r];
				path = 'view/'+resources[r].path;
			}
		}
		// handel unknown resource request
		if(path === undefined){
			path = 'view/'+resources['404'].path;
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
 				// Add script(s), if any
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
