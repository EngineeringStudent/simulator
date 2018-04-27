function EntriesPanel(){
	var self = this;
	var div = document.createElement('div');
	this.element = div;
	div.style.display='inline';
	div.style.width='calc(100% - 240px)';
	div.style.height='100%'
	div.style.float='right';
	div.style.overflowY='visible';
	div.style.overflowX='hidden';
	var entries =[];
	this.add = function(username){
		var entry = new Entry(username, up, down, remove, self.add);
		entries.push(entry);
		div.appendChild(entry.element);
	};
	function up(entry){
		var index = entries.indexOf(entry);
		if(index>0)
		{
			var entry = entries.splice(index, 1)[0];
			div.removeChild(entry.element);
			div.insertBefore(entry.element, entries[index-1].element);
			entries.splice(index-1, 0, entry);
		}
	}
	function down(entry){
		var index = entries.indexOf(entry);
		if(index<entries.length-1)
		{
			var entry = entries.splice(index, 1)[0];
			div.removeChild(entry.element);
			if(index<entries.length-1)
				div.insertBefore(entry.element, entries[index+1].element);
			else
				div.appendChild(entry.element);
			entries.splice(index+1, 0, entry);
			console.log(entries);
		}
	}
	function remove(entry){
		var index = entries.indexOf(entry);
		if(index>=0)
		{
			var entry = entries.splice(index, 1)[0];
			div.removeChild(entry.element);
		}
	}
}