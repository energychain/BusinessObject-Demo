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
			$('#txLog').html("TX: "+data.tx);					
	});
});

$('#provider_sign').on('click',function() {
	var url="/provider/sign?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);
			$('#txLog').html(data);
			$('#provider_signed').show();						
	});
});
$('#billing_set').on('click',function() {
	var url="/billing/set?mpid="+$('#entity_extid').val()+"&energy="+$('#billing_energy').val()+"&day="+$('#billing_day').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);
								
	});
});
$('#billing_sign').on('click',function() {
	var url="/billing/sign?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			$('#txLog').html("TX: "+data.tx_result[0]);
			console.log("Received",data);
								
	});
});
$('#provider_delivery').on('click',function() {
	var url="/provider/delivery?mpid="+$('#entity_extid').val()+"&delivery="+$('#provider_deliverable').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			$('#txLog').html("TX: "+data.tx_result);
			console.log("Received",data);
								
	});
});
$('#mpo_deliverable').on('click',function() {
	var url="/mpo/delivery?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			$('#mpo_deliverable_address').val(data.tx_result);
			console.log("Received",data);
								
	});
});
$('#provider_stromkonto').on('click',function() {
	var url="/provider/stromkonto?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			//$('#mpo_deliverable_address').val(data.tx_result);
			$('#provider_stromkonto_soll').val(data.soll.toString());
			$('#provider_stromkonto_haben').val(data.haben.toString());
			console.log("Received",data);
								
	});
});
$('#mpo_last_read').on('click',function() {
	var url="/mpo/readings?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			$('#mpo_last_reading').val(data.power);
			console.log("Received",data);
								
	});
});

setInterval(function() {
	$.getJSON("/node/blocknumber?mpid=1337",function(o) {
		$('.lastBlock').html(o.blocknumber);	
	});
},5000);
	$.getJSON("/node/rpcsource?mpid=1337",function(o) {
		$('.rpcsource').html(o.rpcsource);	
	});
