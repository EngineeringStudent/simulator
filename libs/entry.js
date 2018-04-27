function Entry(username, up, down, remove, add){
	var self = this;
	var div = document.createElement('div');
	this.element = div;
	div.style.width='calc(100% - 40px)';
	div.style.height='32px';
	div.style.marginTop='2px';
	div.style.marginBottom='2px';
	function createButton(height, float, event){
		var b = document.createElement('button');
   b.style.position='relative';
		b.style.height=height;
		b.style.width='32px';
		b.style.padding='0px';
		b.style.cursor='pointer';
		b.style.float=float;
		b.addEventListener('click', event);
		return b;
	}
	function createImage(url){
		var img = document.createElement('img');
		img.src=url;
		img.style.position='absolute';
		img.style.top='50%';
		img.style.left='50%';
		img.style.width='80%';
		img.style.webkiTansform='translate(-50%, -50%)';
		img.style.msTransform='translate(-50%, -50%)';
		img.style.transform='translate(-50%, -50%)';
		return img;
	}
	div.style.fontWeight='bold';
	div.style.fontSize='14px';
	var buttonUp = createButton('50%', "left", function(){up(self);});
	var buttonDown = createButton('50%', "left", function(){down(self);});
	var buttonRemove = createButton('100%', "right", function(){remove(self);});
	var divUsername = document.createElement('div');
	var divUpDown = document.createElement('div');
	var userEntry = new UserEntry(username, add);
	divUpDown.style.float='right';
	divUpDown.style.height='100%';
	divUpDown.style.width='32px';
	divUpDown.appendChild(buttonUp);
	divUpDown.appendChild(buttonDown);
	var imgUp = createImage(iconUrls.up);
	buttonUp.appendChild(imgUp);
	var imgDown = createImage(iconUrls.down);
	buttonDown.appendChild(imgDown);
	var imgRemove = createImage(iconUrls.remove);
	buttonRemove.appendChild(imgRemove);
	var inputMessage = document.createElement('input');
	inputMessage.placeholder='Message...';
	inputMessage.type='text';
	inputMessage.style.margin='0';
	inputMessage.style.height='32px';
	inputMessage.style.width='calc(100% - 366px)';
	inputMessage.style.boxSizing='border-box';
	inputMessage.style.padding='0';
	inputMessage.style.float='right';
	inputMessage.style.fontSize='14px';
	var inputDelay = document.createElement('input');
	inputDelay.placeholder='Delay Milliseconds';
	inputDelay.value=10000;
	inputDelay.type='number';
	inputDelay.style.margin='0';
	inputDelay.style.height='32px';
	inputDelay.style.width='100px';
	inputDelay.style.boxSizing='border-box';
	inputDelay.style.padding='0';
	inputDelay.style.float='right';
	inputDelay.style.fontSize='14px';
	userEntry.element.style.height='100%';
	userEntry.element.style.margin='0';
	div.appendChild(userEntry.element);
	div.appendChild(buttonRemove);
	div.appendChild(divUpDown);
	div.appendChild(inputDelay);
	div.appendChild(inputMessage);
	function json(){
		return {username:username, message:inputMessage.value, delay:inputDelay.value};
    }
}