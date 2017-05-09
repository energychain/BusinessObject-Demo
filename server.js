var StromDAOBO = require("stromdao-businessobject");   
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

server.route({
    method: 'GET',
    path:'/node/address', 
    handler: function (request, reply) {
		var res={}
		if(typeof request.query.mpid == "undefined") {
				res.err="Missing GET parameter: mpid";
				return reply(res);
		} else {
			var node = new StromDAOBO.Node({external_id:request.query.mpid,testMode:true});
			res.address=node.wallet.address;			
			return reply(res);			
	
		}		 
    }
});
server.route({
    method: 'GET',
    path:'/node/rpcsource', 
    handler: function (request, reply) {
		var res={}
		if(typeof request.query.mpid == "undefined") {
				res.err="Missing GET parameter: mpid";
				return reply(res);
		} else {
			var node = new StromDAOBO.Node({external_id:request.query.mpid,testMode:true});			
				res.rpcsource=node.rpcprovider.url;
				return reply(res);				
					
		}		 
    }
});
server.route({
    method: 'GET',
    path:'/node/blocknumber', 
    handler: function (request, reply) {
		var res={}
		if(typeof request.query.mpid == "undefined") {
				res.err="Missing GET parameter: mpid";
				return reply(res);
		} else {
			var node = new StromDAOBO.Node({external_id:request.query.mpid,testMode:true});
			node._getBlockNumber().then(function(o) {
				res.blocknumber=o;
				return reply(res);				
			});			
		}		 
    }
});
server.route({
    method: 'GET',
    path:'/mpo/store', 
    handler: function (request, reply) {
		var res={}
		if(typeof request.query.mpid == "undefined") {
				res.err="Missing GET parameter: mpid";
				return reply(res);
		} else 
		if(typeof request.query.reading == "undefined") {
				res.err="Missing GET parameter: reading";
				return reply(res);
		} else {
			var node = new StromDAOBO.Node({external_id:request.query.mpid,testMode:true});
			  node.mpo().then( function(mpo) {
							mpo.storeReading(request.query.reading).then( function(tx_result) {	
									res.tx=tx_result;
									res.mpid=request.query.mpid;
									res.reading=request.query.reading;
									res.address=node.wallet.address;
								    return reply(res);
							});
			});
		}		 
    }
});
server.route({
    method: 'GET',
    path:'/provider/sign', 
    handler: function (request, reply) {
		var res={}
		if(typeof request.query.mpid == "undefined") {
				res.err="Missing GET parameter: mpid";
				return reply(res);
		}  else {
			var node = new StromDAOBO.Node({external_id:request.query.mpid,testMode:true});
			node.roleLookup().then( function(roleLookup) {					
					roleLookup.setRelation(node.options.roles[3],node.options.contracts["StromDAO-BO.sol:Provider"]).then( function(tx_result) {	
							return reply({tx_result:tx_result});
					});
			});
		}		 
    }
});
server.route({
    method: 'GET',
    path:'/provider/delivery', 
    handler: function (request, reply) {
		var res={}
		if(typeof request.query.mpid == "undefined") {
				res.err="Missing GET parameter: mpid";
				return reply(res);
		}  else 		
		if(typeof request.query.delivery == "undefined") {
				res.err="Missing GET parameter: delivery";
				return reply(res);
		}  else {
			var node = new StromDAOBO.Node({external_id:request.query.mpid,testMode:true});
			node.provider().then( function(provider) {							
							provider.handleDelivery(request.query.delivery).then( function(tx_result) {										
									return reply({tx_result:tx_result});
							});
			});
		}		 
    }
});
server.route({
    method: 'GET',
    path:'/provider/stromkonto', 
    handler: function (request, reply) {
		var res={}
		if(typeof request.query.mpid == "undefined") {
				res.err="Missing GET parameter: mpid";
				return reply(res);
		}  else {
			var node = new StromDAOBO.Node({external_id:request.query.mpid,testMode:true});
			node.provider().then( function(provider) {							
							provider.stromkonto().then( function(tx_result) {										
									node.stromkonto(tx_result[0]).then( function(stromkonto) {	
										stromkonto.balancesSoll(node.wallet.address).then( 
										function(tx_result) {
											res.soll=tx_result[0].toString();
											stromkonto.balancesHaben(node.wallet.address).then( 
											function(tx_result) {
												res.haben=tx_result[0].toString();
												return reply(res);	
											});	
										});
									});
							});
			});
		}		 
    }
});
server.route({
    method: 'GET',
    path:'/mpo/delivery', 
    handler: function (request, reply) {
		var res={}
		if(typeof request.query.mpid == "undefined") {
				res.err="Missing GET parameter: mpid";
				return reply(res);
		}  
		else {
			var node = new StromDAOBO.Node({external_id:request.query.mpid,testMode:true});
			node.mpo().then( function(mpo) {
							mpo.lastDelivery(node.wallet.address).then( function(tx_result) {	
									return reply({tx_result:tx_result[0]});
							});
						});
		}		 
    }
});
server.route({
    method: 'GET',
    path:'/mpo/readings', 
    handler: function (request, reply) {
		var res={}
		if(typeof request.query.mpid == "undefined") {
				res.err="Missing GET parameter: mpid";
				return reply(res);
		}  
		else {
			var node = new StromDAOBO.Node({external_id:request.query.mpid,testMode:true});
			node.mpo().then( function(mpo) {
							mpo.readings(node.wallet.address).then( function(tx_result) {	
									res.time=tx_result.time.toString();
									res.power=tx_result.power.toString();
									return reply(res);
							});
						});
		}		 
    }
});
server.route({
    method: 'GET',
    path:'/billing/set', 
    handler: function (request, reply) {
		var res={}
		if(typeof request.query.mpid == "undefined") {
				res.err="Missing GET parameter: mpid";
				return reply(res);
		}  else {
			var node = new StromDAOBO.Node({external_id:request.query.mpid,testMode:true});
			node.provider().then( function(provider) {							
						provider.approveSender(node.wallet.address,true,request.query.day,request.query.energy).then( function(tx_result) {								
								return reply({tx_result:tx_result});
						});
			});
		}		 
    }
});
server.route({
    method: 'GET',
    path:'/billing/sign', 
    handler: function (request, reply) {
		var res={}
		if(typeof request.query.mpid == "undefined") {
				res.err="Missing GET parameter: mpid";
				return reply(res);
		}  else {
			var node = new StromDAOBO.Node({external_id:request.query.mpid,testMode:true});
						node.provider().then( function(provider) {	
							provider.billings(node.wallet.address).then( function(tx_result) {										
									node.billing(tx_result[0]).then( function(billing) {
											billing.becomeTo().then(function(tx_result2) {
												return reply({tx_result:tx_result});
										    });
									});									
							});
						});
		}		 
    }
});
server.route({
    method: 'GET',
    path:'/mpo/retrieve', 
    handler: function (request, reply) {
		var res={}
		if(typeof request.query.mpid == "undefined") {
				res.err="Missing GET parameter: mpid";
				return reply(res);
		} else 
		{
			var node = new StromDAOBO.Node({external_id:request.query.mpid,testMode:true});
				node.mpo().then( function(mpo) {
							mpo.readings(node.wallet.address).then( function(tx_result) {	
									res.time=(tx_result.time.toString()*1);
									res.reading=(tx_result.power.toString()*1);
									res.mpid=request.query.mpid;
									res.address=node.wallet.address;
								    return reply(res);								
							});
						});			 
		}		 
    }
});
server.route({
    method: 'GET',
    path:'/mpo/blockchain', 
    handler: function (request, reply) {
		var res={}
		if(typeof request.query.address == "undefined") {
				res.err="Missing GET parameter: address";
				return reply(res);
		} else 
		{
			var node = new StromDAOBO.Node({external_id:"1337",testMode:true});
			node.mpo().then( function(mpo) {
							mpo.readings(request.query.address).then( function(tx_result) {	
									res.time=(tx_result.time.toString()*1);
									res.reading=(tx_result.power.toString()*1);
									res.address=request.query.address;	
									return reply(res);							
							});
						});
		}		 
    }
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

	server.route({
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: 'static/'
			}
		}
	});

	
});
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
