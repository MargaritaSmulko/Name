'use strict';
var theMsg = function(text, nameUser){

	return{
		description:text,
		name: nameUser,
		id: uniqueId()
	}
};
var uniqueId = function() {
	var date = Date.now();
	var random = Math.random() * Math.random();
	return Math.floor(date * random).toString();
};
var appState = {
	mainUrl : 'http://localhost:8888/chat',
	msgList:[],
	token : 'TN11EN'
};
//var msgList = [];
var userName;
function run(){
	var appContainer = document.getElementsByClassName('chat')[0];
	appContainer.addEventListener('click', delegateEvent);
	//appContainer.addEventListener('click', delegateEventDelete);

	restore();
	//var allMsg = restore();

	//createAllMsg(allMsg);
}



function createAllMsg(allMsg) {
	for(var i = 0; i < allMsg.length; i++)
		addMsg(allMsg[i]);
}
function addMsg(msg) {
	var item = createItem(msg);
	var items = document.getElementsByClassName('textarea')[0];

	appState.msgList.push(msg);

	items.appendChild(item);
	scroll();
	
}

function delegateEvent(evtObj) {
	if(evtObj.type === 'click'
		&& evtObj.target.classList.contains('btn-add'))
		onSendButtonClick();
	if(evtObj.type === 'click' && evtObj.target.classList.contains('addName'))
		onAddButtonClick();
	if (evtObj.type === 'click'
		&& evtObj.target.classList.contains('del'))
	    onDeleteButtonClick(evtObj.target);
}
function onDeleteButtonClick(e){
	var msg_id = e.msgId;
		var messList = appState.msgList;

	for(var i = 0; i < messList.length; i++) {
		if(messList[i].id !== msg_id)
			continue;               
		toggle(messList[i], function() {
		});

		return;
	}

}

function toggle(mess, continueWith) {
	del(appState.mainUrl + '?id=' + mess.id, JSON.stringify(mess), function() {
	});
}

function onSendButtonClick(){
	if(userName== undefined || userName== '')
		userName = "ANONIM";	
	var msgText = document.getElementById('msgField');
	var newMsg = theMsg(msgText.value,userName);

	if(msgText.value == '')
		return;

    sendMessage(newMsg);

	//addMsg(newMsg);
	msgText.value = '';
	//store(appState.msgList);
}
function sendMessage(message, continueWith) {
    post(appState.mainUrl, JSON.stringify(message), function(){
        restore();
    });
}

function onAddButtonClick(){
	userName = document.getElementById('nameField').value;
}

function createItem(msg){
	var msgBlock = document.createElement('div');
	var htmlAsText = '<div class="well userMsg" msgId="'+msg.id+'">' +
		'<button data-msg-id = "btnDel-'+msg.id+ '" type = "button" class="btn btn-primary btn-sm del">Delete</button> ' +
		'<br> user name: Message text </div>  ';
	msgBlock.innerHTML = htmlAsText;
	update(msgBlock.firstChild,msg);
	return msgBlock.firstChild;

}
function scroll(){
	var textar = document.getElementById("conversation");
	textar.scrollTop = textar.scrollHeight;
}
function update(divItem, message){
	//divItem.setAttribute('msgId', message.id);
	divItem.lastChild.textContent = message.name+": "+ message.description;
}

/*function store(listToSave) {
	//output(listToSave);

	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	localStorage.setItem("MyHistory", JSON.stringify(listToSave));
}*/
function restore(continueWith) {
	var url = appState.mainUrl + '?token=' + appState.token;

	get(url, function(responseText) {
		console.assert(responseText != null);

		var response = JSON.parse(responseText);

		appState.token = response.token;
		createAllMsg(response.messages);
		

		continueWith && continueWith();
	});
}/*
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	var item = localStorage.getItem("MyHistory");
	return item && JSON.parse(item);
}*/

function defaultErrorHandler(message) {
	console.error(message);
}
function get(url, continueWith, continueWithError) {
	ajax('GET', url, null, continueWith, continueWithError);
}

function post(url, data, continueWith, continueWithError) {
	ajax('POST', url, data, continueWith, continueWithError);	
}

function put(url, data, continueWith, continueWithError) {
	ajax('PUT', url, data, continueWith, continueWithError);	
}

function del(url, data, continueWith, continueWithError) {
	ajax('DELETE', url, data, continueWith, continueWithError);	
}

function isError(text) {
	if(text == "")
		return false;
	
	try {
		var obj = JSON.parse(text);
	} catch(ex) {
		return true;
	}

	return !!obj.error;
}

function ajax(method, url, data, continueWith, continueWithError) {
	var xhr = new XMLHttpRequest();

	continueWithError = continueWithError || defaultErrorHandler;
	xhr.open(method || 'GET', url, true);

	xhr.onload = function () {
		if (xhr.readyState !== 4)
			return;

		if(xhr.status != 200) {
			continueWithError('Error on the server side, response ' + xhr.status);
			return;
		}

		if(isError(xhr.responseText)) {
			continueWithError('Error on the server side, response ' + xhr.responseText);
			return;
		}

		continueWith(xhr.responseText);
	};    

    xhr.ontimeout = function () {
    	ontinueWithError('Server timed out !');
    }

    xhr.onerror = function (e) {
    	var errMsg = 'Server connection error !\n'+
    	'\n' +
    	'Check if \n'+
    	'- server is active\n'+
    	'- server sends header "Access-Control-Allow-Origin:*"';

        continueWithError(errMsg);
    };

    xhr.send(data);
}
