var mapping=[];
mapping["0x23b0209Bc95dc71f8fc29e526C438C8F4332E4e6"]="Provider";

function retrieveEntity() {
	var url="/node/address?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);
			$('.withAddress').show();	
				
			last_meter_reading(data.address);
			
			/*
			var html="<h2 title='"+data.address+"'><span id='entity_"+data.address.substr(4,9)+"' data='"+$('#entity_extid').val()+"'><span class='glyphicon glyphicon-king'></span>&nbsp;"+$('#entity_extid').val()+"</span></h2>";
			$(html).appendTo('#bcadr');				
			$('#entity_'+data.address.substr(4,9)).draggable().addClass('label label-default entity');
			 $('#entity_'+data.address.substr(4,9)).affix();
			 * */
			 mapping[data.address]=$('#entity_extid').val();
	});
}

$('#entity_btn').on('click',function() {
	retrieveEntity();
});


$('#mpr_store').on('click',function() {
	
	var url="/mpr/store?mpid="+$('#entity_extid').val()+"&reading="+$('#mpo_reading').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);	
		
			retrieveEntity();	
			if(typeof data.err != "undefined") {							
				$('#txLog').html("TX: "+data.err);							
			} else {
				$('#txLog').html("TX: "+data.tx);				
			}			
	});	
});


function last_meter_reading(adr) {
	var url="/mpr/readings?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			$('#mpo_reading').val(data.power);			
			$('#mpo_last_time').val(new Date((data.time+"000")*1).toLocaleString());
			console.log("Received",data);
								
	});
};
$( ".eth_addr_btn" ).draggable({
  addClasses: true
});
setInterval(function() {
	$.getJSON("/node/blocknumber?mpid=1337",function(o) {
		$('.lastBlock').html(o.blocknumber);	
	});
},5000);
	$.getJSON("/node/rpcsource?mpid=1337",function(o) {
		$('.rpcsource').html(o.rpcsource);	
	});
