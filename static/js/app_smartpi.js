


function retrieveEntity() {
	$('.withAddress').show();
	
}
function retrieveReading() {
	$('.withAddress').show();
	var url="/mpr/readings?mpid="+$('#entity_contract').val()+"&account="+$('#entity_account').val()+"&contract="+$('#entity_contract').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",JSON.stringify(data));
							
			$('#time').html(new Date(data.time*1000).toLocaleString());
			$('#power').html(Math.round(data.power/1000)+" wh");						
	});
	setInterval("retrieveReading()",5000);
}

function retrieveBalance() {
	var url="/stromkonto/balance?mpid=1337&account="+$('#entity_account').val()+"&contract="+$('#entity_contract').val();
	console.log("Send",url);
	$.getJSON(url,function(data) {
			console.log("Received",JSON.stringify(data));
							
			$('#soll').html(data.soll);
			$('#haben').html(data.haben);			
			$('#saldo').html(data.haben-data.soll);	
	});
}

$('#entity_btn').on('click',function() {
	//retrieveEntity();
	retrieveReading();
});
$('#account_btn').on('click',function() {
	retrieveBalance();
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
