// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };
  
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // and use that tab to fill in out title and url
    console.log(tabs[0].url);
    //alert(tabs[0].id + ":" + tabs[0].url + ' : Green');
	
	var youtubeURL = tabs[0].url
	var videoID = youtubeURL.split('v=')[1];
	var videoID = videoID.split('&')[0];
	var topic = youtubeURL.split('query=')[1];
    //alert(videoID + " : " + topic + ' : Green');
	
	if (videoID == undefined){
		var url = 'http://ec2-34-229-99-219.compute-1.amazonaws.com:8080/search?topic=' + topic;
	}else{
		var url = 'http://ec2-34-229-99-219.compute-1.amazonaws.com:8080/?videoID=' + videoID;
	}
    //alert(videoID + " : " + topic + ' : Green');

var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // innerText does not let the attacker inject HTML elements.
  var mytext = document.createElement('text');
  mytext.innerText = this.response
  document.body.appendChild(mytext);
  }
}
xhr.send();


});
/*
var url = 'http://ec2-34-229-99-219.compute-1.amazonaws.com:8080/?videoid=123&topic=dfgdfgdfg';

var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // innerText does not let the attacker inject HTML elements.
  var mytext = document.createElement('text');
  mytext.innerText = this.response;
  document.body.appendChild(mytext);
  }
}
xhr.send();
*/
