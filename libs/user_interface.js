function UserInterface(){ 
	
	var popup = new Popup(run);
	var buttonMenuStyle = ".buttonSelect{cursor: pointer;float: right;width: auto;height: 20px;color: #fff;background-color: #4b79A1;border: 1px solid #4b79A1;padding: 0px 10px;margin-right: 2px;}";
	addStyle(buttonMenuStyle);
	var buttonMenu = document.createElement('button');
	buttonMenu.className+="buttonSelect";
	buttonMenu.textContent='Simulation';
	buttonMenu.addEventListener('click', function(){
		popup.show();
	});
	var inputTextOptions = document.getElementById('InputTextOptions')
	inputTextOptions.appendChild(buttonMenu);
	function hideAll(){popup.hide(); buttonMenu.style.display='none';}
	function run(){
		hideAll();
	}
}