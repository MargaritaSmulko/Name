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
var msgList = [];
var userName;
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
	if(evtObj.type === 'click' && evtObj.target.classList.contains('addName'))
		onAddButtonClick();
}

function onSendButtonClick(){
	if(userName=='')
		userName = "ANONIM";	
	var msgText = document.getElementById('msgField');
	var newMsg = theMsg(msgText.value,userName);

	if(msgText.value == '')
		return;

	addMsg(newMsg);
	msgText.value = '';
	store(msgList);
}

function onAddButtonClick(){
	userName = document.getElementById('nameField').value;
}
function createItem(msg){
	var msgBlock = document.createElement('div');
	var htmlAsText = '<div class="well userMsg" msgId="идентификатор" >user name: Message text <br>  +
	<button id = "addName" type = "button" class="btn btn-primary btn-sm del">Delete</button> + 
	 </div> <br>';
	msgBlock.innerHTML = htmlAsText;
	update(msgBlock.firstChild,msg);
	return msgBlock.firstChild;

}
function update(divItem, message){
	divItem.setAttribute('msgId', message.id);
	divItem.lastChild.textContent = message.name+": "+ message.description;
}

function store(listToSave) {
	//output(listToSave);

	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	localStorage.setItem("MyHistory", JSON.stringify(listToSave));
}
function restore() {
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	var item = localStorage.getItem("MyHistory");
	return item && JSON.parse(item);
}