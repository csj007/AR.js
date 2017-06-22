// goto the proper landing page depending on where you run
var isMobile = 'ontouchstart' in window === true ? true : false
// document.querySelector('#currentPlatform').innerHTML = isMobile ? 'mobile' : 'desktop'

//////////////////////////////////////////////////////////////////////////////
//		arAppURL
//////////////////////////////////////////////////////////////////////////////
var arAppURL = null
function updateArAppURL(){
	// build arAppURL
	if( location.hash.substring(1) ){
		arAppURL = location.hash.substring(1)
	}else{
		// build url
		// FIXME pass from relative to absolute url in a better way
		arAppURL = location.protocol + '//' + location.host + location.pathname.replace(/[^\/]*$/, '') + 'examples/screenAsPortal/index.html'		
	}
	// add options in arAppURL
	arAppURL = arAppURL + '#' + JSON.stringify({
		trackingBackend: 'artoolkit',
		markerPageResolution: window.innerWidth + 'x' + window.innerHeight,
		// markerPageResolution: 1024 + 'x' + 653,
	})

	// // Update arAppURL in the webpage
	// document.body.querySelector('#arAppURLView').value = arAppURL
	// document.body.querySelector('#arAppURLLink').href = arAppURL	

	// // prepare emailURLtoMeLink
	// var mailBody = `DO NOT forget the change the reciptient email address before sending it :)
	// 
	// The AR.js App is at ${arAppURL}.
	// `
	// var mailtoUrl = 'mailto:your-goes-here-name@example.com?subject=Augmented%20Webpages%20URL&body='+encodeURIComponent(mailBody)
	// document.body.querySelector('#emailURLtoMeLink').href = mailtoUrl

	// create qrCode
	;(function(){
	        var container = document.createElement('div')
	        var qrcode = new QRCode(container, {
	                text: arAppURL,
	                width: 256,
	                height: 256,
	                colorDark : '#000000',
	                colorLight : '#ffffff',
	        });
	        var qrCodeImage = container.querySelector('img')
		var containerElement = document.body.querySelector('#qrCodeContainer')
		while (containerElement.firstChild){
			containerElement.removeChild(containerElement.firstChild);
		}
		containerElement.appendChild(qrCodeImage)				
	})()
}
updateArAppURL()

window.addEventListener('resize', function(){
	updateArAppURL()
})



function toggleMarkerPage(){
	toggleFullScreen()

	var domElement = document.querySelector('#markers-page')
	if( domElement.style.display === 'none' ){
		history.pushState({ foo: "bar" }, "page 2", "#MarkerPage");
		domElement.style.display = 'block'
	}else{
		domElement.style.display = 'none'
	}
}
window.addEventListener('popstate', function(event){
	toggleMarkerPage();
})
history.pushState("", document.title, location.pathname+ location.search);

//////////////////////////////////////////////////////////////////////////////
//		setMarkerPageTrackingBackend
//////////////////////////////////////////////////////////////////////////////
setMarkerPageTrackingBackend('artoolkit')	
function setMarkerPageTrackingBackend(trackingBackend){
	// trackingBackend feedback
	document.querySelector('#currentTracking').innerHTML = trackingBackend
	// remove previous classes
	document.body.classList.remove('trackingBackend-artoolkit')			
	document.body.classList.remove('trackingBackend-aruco')
	// set the proper class
	if( trackingBackend === 'artoolkit' ){
		document.body.classList.add('trackingBackend-artoolkit')
	}else if( trackingBackend === 'aruco' ){
		document.body.classList.add('trackingBackend-aruco')			
	}else console.assert(false)
}

//////////////////////////////////////////////////////////////////////////////
//		toggleFullScreen
//////////////////////////////////////////////////////////////////////////////
// from https://stackoverflow.com/questions/21280966/toggle-fullscreen-exit
function toggleFullScreen() {
	if (!document.fullscreenElement 
		&& !document.mozFullScreenElement 
		&& !document.webkitFullscreenElement && !document.msFullscreenElement 
	) {  // current working methods
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.msRequestFullscreen) {
			document.documentElement.msRequestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
}


function displayResolution(){
	var resolution = window.innerWidth + 'x' + window.innerHeight
	alert('resolution is ' + resolution)
}
