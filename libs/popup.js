function Popup(){
	var div =document.createElement('div');
	document.documentElement.appendChild(div);
	div.style.display='inline';
	div.style.zIndex='4000';
	div.style.width='100%';
	div.style.height='600px';
	div.style.minHeight='200px';
	div.style.position='absolute';
	div.style.border='1px solid rgb(75, 121, 161)';
	div.style.backgroundColor='#F5F5F5';
	var usersPanel = new UsersPanel(addUsersMessage);
	div.appendChild(usersPanel.element)
	var entriesPanel = new EntriesPanel();
	div.appendChild(entriesPanel.element);
	this.show = function(){div.style.display='inline';};
	this.hide = function(){div.style.display='none';};
	function addUsersMessage(username){
		entriesPanel.add(username);
	}
	console.log('adfs');
}