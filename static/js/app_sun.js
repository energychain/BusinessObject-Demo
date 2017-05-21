var mapping=[];
mapping["0x23b0209Bc95dc71f8fc29e526C438C8F4332E4e6"]="Provider";

function retrieveEntity() {
	var url="/node/address?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",JSON.stringify(data));
			$('.withAddress').show();	
				
			last_meter_reading(data.address);
			$('#address').html(data.address);
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
			console.log("Received",JSON.stringify(data));	
		
			retrieveEntity();	
				
	});	
});


function last_meter_reading(adr) {
	var url="/mpr/readings?mpid="+$('#entity_extid').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			$('#mpo_reading').val(data.power);			
			$('#mpo_last_time').val(new Date((data.time+"000")*1).toLocaleString());
			console.log("Received",JSON.stringify(data));
								
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
	
var baseLogFunction = console.log;
	
 console.log = function(){
        baseLogFunction.apply(console, arguments);

        var args = Array.prototype.slice.call(arguments);
        for(var i=0;i<args.length;i++){
            var node = createLogNode(args[i]);
            document.querySelector("#txLog").appendChild(node);
        }

    }
function createLogNode(message){
        var node = document.createElement("div");
        var textNode = document.createTextNode(message);
        node.appendChild(textNode);
        return node;
    }

    window.onerror = function(message, url, linenumber) {
        console.log("JavaScript error: " + message + " on line " +
            linenumber + " for " + url);
    }	
