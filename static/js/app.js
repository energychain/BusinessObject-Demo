var mapping=[];
mapping["0xd457F18DB9949899263d5bEbd74e74Ef6d2a6624"]="Provider";

function retrieveEntity() {
	var url="/node/address?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);
			$('.withAddress').show();	
				
		
			var html="<h2 title='"+data.address+"'><span id='entity_"+data.address.substr(4,9)+"' data='"+$('#entity_extid').val()+"'><span class='glyphicon glyphicon-king'></span>&nbsp;"+$('#entity_extid').val()+"</span></h2>";
			$(html).appendTo('#bcadr');				
			$('#entity_'+data.address.substr(4,9)).draggable().addClass('label label-default entity');
			 $('#entity_'+data.address.substr(4,9)).affix();
			 mapping[data.address]=$('#entity_extid').val();
	});
}

$('#entity_btn').on('click',function() {
	retrieveEntity();
});

$('.dropzone_mpo').droppable({
  accept: ".entity",
   drop: function(e,ui) {
	var adr=$(ui.draggable[0]).attr('data');
	$('#entity_extid').val(adr);
	$('.bc_nice_html').html(adr);
	last_meter_reading(adr);
	last_deliverable(adr);
	$(ui.draggable[0]).empty();
	$(ui.draggable[0]).remove();
	retrieveEntity();
    //alert( "dropped" );
  }
});
$('.dropzone_mpo_sign_in').droppable({
  accept: ".entity",
   drop: function(e,ui) {
	var adr=$(ui.draggable[0]).attr('data');
	$('#entity_extid').val(adr);
	$('.bc_nice_html').html(adr);
	var url="/mpo/sign?mpid="+$('#entity_extid').val()+"&role=5";
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);	
			$('#txLog').html("TX: "+data.tx);	
			$(ui.draggable[0]).empty();
			$(ui.draggable[0]).remove();
			retrieveEntity();				
	});
	
    //alert( "dropped" );
  }
});
$('.dropzone_mpo_sign_out').droppable({
  accept: ".entity",
   drop: function(e,ui) {
	var adr=$(ui.draggable[0]).attr('data');
	$('#entity_extid').val(adr);
	$('.bc_nice_html').html(adr);
	var url="/mpo/sign?mpid="+$('#entity_extid').val()+"&role=4";
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);	
			$('#txLog').html("TX: "+data.tx);	
			$(ui.draggable[0]).empty();
			$(ui.draggable[0]).remove();
			retrieveEntity();				
	});
	
    //alert( "dropped" );
  }
});
$('.dropzone_mpo_commit').droppable({
  accept: ".entity",
   drop: function(e,ui) {
	var adr=$(ui.draggable[0]).attr('data');
	$('#entity_extid').val(adr);
	$('.bc_nice_html').html(adr);
	var url="/mpo/store?mpid="+$('#entity_extid').val()+"&reading="+$('#mpo_reading').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);	

			$(ui.draggable[0]).empty();
			$(ui.draggable[0]).remove();
			retrieveEntity();	
			if(typeof data.err != "undefined") {
				var old_html=$('.dropzone_mpo_commit').html();
				$('.dropzone_mpo_commit').html('<div class="alert alert-danger" role="alert">FAILED!</div>');				
				$('#txLog').html("TX: "+data.err);
				$("#"+ui.draggable[0].id).removeClass("label-default");
				$("#"+ui.draggable[0].id).addClass("label-error");
				setTimeout(function() {
					$('.dropzone_mpo_commit').html(old_html);
				},2000);
			} else {
				$('#txLog').html("TX: "+data.tx);
				$("#"+ui.draggable[0].id).removeClass("label-error");
				$("#"+ui.draggable[0].id).addClass("label-default");
			}			
	});
	
    //alert( "dropped" );
  }
});
$('.dropzone_dso').droppable({
  accept: ".entity",
   drop: function(e,ui) {
	var adr=$(ui.draggable[0]).attr('data');
	$('#entity_extid').val(adr);
	$('.bc_nice_html').html(adr);
	var url="/dso/check?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);	
			$('#dso_power_limit').val(data.power_limit);			
			$(ui.draggable[0]).empty();
			$(ui.draggable[0]).remove();
			retrieveEntity();				
	});
  }
});
$('.dropzone_dso_commit').droppable({
  accept: ".entity",
   drop: function(e,ui) {
	var adr=$(ui.draggable[0]).attr('data');
	$('#entity_extid').val(adr);
	$('.bc_nice_html').html(adr);
	var url="/dso/sign?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);	
			$('#txLog').html("TX: "+data.tx);	
			$(ui.draggable[0]).empty();
			$(ui.draggable[0]).remove();
			retrieveEntity();				
	});
	
    //alert( "dropped" );
  }
});
$('.dropzone_sign_billing').droppable({
  accept: ".entity",
   drop: function(e,ui) {
	var adr=$(ui.draggable[0]).attr('data');
	$('#entity_extid').val(adr);
	$('.bc_nice_html').html(adr);
	$(ui.draggable[0]).empty();
	$(ui.draggable[0]).remove();
	billing_sign();
	retrieveEntity();    
  }
});

$('.dropzone_billing').droppable({
  accept: ".delivery",
   drop: function(e,ui) {
	var adr=$(ui.draggable[0]).attr('data');
	
	$(ui.draggable[0]).empty();
	$(ui.draggable[0]).remove();
	var url="/provider/delivery?mpid="+$('#entity_extid').val()+"&delivery="+adr;
	console.log("Send",url);
	$.getJSON(url,function(data) {
			$('#txLog').html("TX: "+data.tx_result);
			console.log("Received",data);					
	});   
  }
});
$('.dropzone_delivery').droppable({
  accept: ".delivery",
   drop: function(e,ui) {
	var adr=$(ui.draggable[0]).attr('data');
	
	$(ui.draggable[0]).empty();
	$(ui.draggable[0]).remove();
	delivery_get($('#entity_extid').val(),adr);
	   
  }
});

$('.dropzone_stromkonto').droppable({
  accept: ".entity",
   drop: function(e,ui) {
	   var adr=$(ui.draggable[0]).attr('data');
	   $('#entity_extid').val(adr);
	var url="/provider/stromkonto?mpid="+adr;
		console.log("Send",url);
		$.getJSON(url,function(data) {
				//$('#mpo_deliverable_address').val(data.tx_result);
				$('#provider_stromkonto_soll').val(data.soll.toString());
				$('#provider_stromkonto_haben').val(data.haben.toString());
				console.log("Received",data);
					
				$(ui.draggable[0]).empty();
				$(ui.draggable[0]).remove();
				retrieveEntity()				
		});	   
	   
  }
});

function billing_sign() {
	var url="/provider/sign?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);
			$('#txLog').html(data);
			$('#provider_signed').show();						
	});

	var url="/billing/set?mpid="+$('#entity_extid').val()+"&energy="+$('#billing_energy').val()+"&day="+$('#billing_day').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",data);
								
	});
}
;
$('#billing_sign').on('click',function() {
	var url="/billing/sign?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			$('#txLog').html("TX: "+data.tx_result[0]);
			console.log("Received",data);
								
	});
});

function appendDel(del) {
				$("#del_"+del.substr(2,10)).empty()
			$("#del_"+del.substr(2,10)).remove();
			var html="<h3><span id='del_"+del.substr(2,10)+"' data='"+del+"'><span class='glyphicon glyphicon-tag'></span>&nbsp;"+del.substr(2,10)+"</span></h3>";
			$(html).appendTo('#deliverables');	
			$('#del_'+del.substr(2,10)).draggable().addClass('label label-primary delivery');
}

function delivery_get(adr,del) {
	var url="/delivery/get?mpid="+adr+"&deliverable="+del;
	console.log("Send",url);
	$.getJSON(url,function(data) {
			$('#delivery_power').val(data.power);
			$('#delivery_startTime').val(data.startTime);
			$('#delivery_endTime').val(data.endTime);
			$('#delivery_resolution').val(data.resolution);
			if(typeof mapping[data.owner] != "undefined") data.owner=mapping[data.owner];
			$('#delivery_owner').val(data.owner);
			console.log("Received",data);
			appendDel(del);
			appendDel(data.resolution);
								
	});
}
function last_deliverable(adr) {
	var url="/mpo/delivery?mpid="+adr;
	console.log("Send",url);
	$.getJSON(url,function(data) {
			$('#mpo_deliverable_address').val(data.tx_result);
			console.log("Received",data);
			delivery_get(adr,data.tx_result);

		
								
	});
};

function last_meter_reading(adr) {
	var url="/mpo/readings?mpid="+adr;
	console.log("Send",url);
	$.getJSON(url,function(data) {
			$('#mpo_reading').val(data.power);			
			$('#mpo_last_time').val(data.time);
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
