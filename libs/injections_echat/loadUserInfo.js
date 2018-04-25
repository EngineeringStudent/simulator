
	function loadUserInfo(username, callback){
		
		$.ajax({
			url:'http://e-chat.co/search/users',
			type : 'POST',	
			data : {
				targetUsername : username
			},
			success : function(msg) {
				try {
					console.log(msg);
					var searchResultArray = $.parseJSON(msg);
					if (searchResultArray.length > 0) {
						for(var i=0; i<searchResultArray.length; i++){
							var jObject=searchResultArray[i].data;
							console.log(jObject);
							var found=true;
							console.log();
							console.log(username);
							var other=decodeHTMLEntities(jObject.username);
							var found=true;
							if(other.length==username.length){
								for(var s=0; s<username.length; s++)
								{
									if(!(username[s]==other[s]  ||  other[s]=='?')){
										found=false;
										break;
									}
								}
								if(found)
								{
									console.log('found');
									jObject.username = username;
									callback(jObject);
									return;
								}
							}
						}
					}
					console.log('could not get data for username: '+username);
				} catch (ex) {
					console.log('search failed for username: '+username);
					console.log(ex.stack);
				}
				callback();
			},
			error : function(msg) {
				console.log('search failed for username: '+username);
				callback();
			},
			complete : function(msg) {
				callback();
			}
		});
	}