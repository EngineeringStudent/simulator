function UserEntry(username, callback){
	var div = document.createElement('div');
	this.element = div;
	div.style.position='relative';
	div.style.width='200px';
	div.style.height='26px';
	div.style.zIndex='1';
	div.style.float='left';
	div.style.padding='2px';
	div.style.border='1px solid black';
	div.style.margin='3px';
	div.style.fontWeight = 'bold';
	div.style.textAlign='center';
	div.style.verticalAlign='middle';
	div.style.cursor=Cursors.pointer;
	div.style.boxSizing = "border-box";
	div.style.whiteSpace = 'nowrap';
    div.style.overflow='hidden';
    div.style.textOverflow='ellipsis';
	div.style.boxSizing='border-box';
	div.style.display='table';
	var inner = document.createElement('div');
	inner.style.display='table-cell';
	inner.style.verticalAlign='middle';
	inner.innerHTML+=username;
	div.appendChild(inner);
	new HoverAndClick(div, enter, leave, function(){callback(username);});
	function enter(){
	div.style.border='2px solid black';	}
	function leave(){
	div.style.border='1px solid black';
	}
	this.dispose = function(){
		div.parentNode.removeChild(div);
	};
}