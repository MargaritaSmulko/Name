var theMsg = function(text){
	return{
		description:text,
		id: uniqueId()
	}
};
var uniqueId = function() {
	var date = Date.now();
	var random = Math.random() * Math.random();
	return Math.floor(date * random).toString();
};
var msgList = [];

function run(){
	var appContainer = document.getElementsByClassName('chat')[0];
	appContainer.addEventListener('click', delegateEvent);

	var allMsg = restore();

	createAllMsg(allMsg);
}

function createAllMsg(allMsg) {
	for(var i = 0; i < allMsg.length; i++)
		addMsg(allMsg[i]);
}
function addMsg(msg) {
	var item = createItem(msg);
	var items = document.getElementsByClassName('textarea')[0];

	msgList.push(msg);
	items.appendChild(item);

	
}

function delegateEvent(evtObj) {
	if(evtObj.type === 'click'
		&& evtObj.target.classList.contains('btn-add'))
		onSendButtonClick();
}

function onSendButtonClick(){
	var msgText = document.getElementById('msgField');
	var newMsg = theMsg(msgText.value);

	if(msgText.value == '')
		return;

	addMsg(newMsg);
	msgText.value = '';
	store(msgList);
}

function createItem(msg){
	var msgBlock = document.createElement('div');
	var htmlAsText = '<div class="well userMsg" msgId="идентификатор" >Message text </div>';
	msgBlock.innerHTML = htmlAsText;
	update(msgBlock.firstChild,msg);
	return msgBlock.firstChild;

}
function update(divItem, message){
	divItem.setAttribute('msgId', message.id);
	divItem.lastChild.textContent = message.description;
}

function store(listToSave) {
	//output(listToSave);

	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	localStorage.setItem("History", JSON.stringify(listToSave));
}
function restore() {
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	var item = localStorage.getItem("History");
	return item && JSON.parse(item);
}