$('#entity_btn').on('click',function() {
	var url="/node/address?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);
			$('.withAddress').show();	
			$('.bc_nice_html').html(data.address.substr(4,9));						
	});
});

$('#mpo_store').on('click',function() {
	var url="/mpo/store?mpid="+$('#entity_extid').val()+"&reading="+$('#mpo_reading').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);						
	});
});

$('#provider_sign').on('click',function() {
	var url="/provider/sign?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);
			$('#provider_signed').show();						
	});
});
$('#billing').on('click',function() {
	var url="/billing/set?mpid="+$('#entity_extid').val()+"&energy="+$('#billing_energy').val()+"&day="+$('#billing_day').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);
								
	});
});
$('#billing').on('click',function() {
	var url="/billing/sign?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);
								
	});
});
setInterval(function() {
	$.getJSON("/node/blocknumber?mpid=1337",function(o) {
		$('.lastBlock').html(o.blocknumber);	
	});
},5000);
