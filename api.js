var 
	spashttp = require("spas-http")
	, _ = require("underscore")._
	, url = "http://api.flickr.com/services/rest/?format=json&nojsoncallback=1&method=";
	
//
// ### collections
//
exports["collections"] = {
	
	getInfo: function(params, credentials, cb) { 
		params.url = url + "flickr.collections.getInfo";
		spashttp.request(params, credentials, cb);
	},
	getList: function(params, credentials, cb) {
		params.url = url + "flickr.collections.getTree";
		spashttp.request(params, credentials, cb);	
	}
}

//
// ### photosets
//
exports["photosets"] = {
	
	getInfo: function(params, credentials, cb) { 
		params.url = url + "flickr.photosets.getInfo";
		spashttp.request(params, credentials, cb);
	},
	getList: function(params, credentials, cb) {
		params.url = url + "flickr.photosets.getList";
		spashttp.request(params, credentials, cb);	
	},
	getPhotos: function(params, credentials, cb) {
		params.url = url + "flickr.photosets.getPhotos";
		spashttp.request(params, credentials, cb);
	}
}

//
// ## Custom - These do not have equivelants in the Flickr API
//
exports["custom"] = {
	
	getPhotosetsWithPhotos: function(params, credentials, cb) { 
		params.url = url + "flickr.photosets.getList";
		
		spashttp.request(params, credentials, function( err, sets ) {
			if (!err) {

				var n = sets.photosets.photoset.length;
				_.each(sets.photosets.photoset, function( obj, key) {
					params.url = url + "flickr.photosets.getPhotos" + "&api_key=" + params.api_key + "&photoset_id="+obj.id + "&per_page="+params.photosper_page;
					spashttp.request({url: params.url}, credentials, function( err, photos ) {
					
						n = n - 1;
						
						if (err) {
							obj["error"] = err;
						} else {
							if (_.has(photos, 'photoset')) {
								sets.photosets.photoset[key].photo = photos.photoset.photo;
								sets.size += photos.size;
							} else {
								console.log('photoset missing: ' + params);
							}
						}
						
						if (n === 0) {
							cb( null, sets );
						}
					});
				});
			} else {
				var result;
				try {
					result = JSON.parse(body);
				} catch(e) {
					result = {errnum:1, errtxt:"req failed"}
				} finally {
					cb(result );	
				}
			}			
		});	
	},
	
	getCollectionsWithPhotos: function(params, credentials, cb) {
		params.url = url + "flickr.collections.getTree";
		spashttp.request(params, credentials, function( err, cols ) {

			var n = cols.collections.collection.length;
			
			_.each(cols.collections.collection, function( colObj, colKey) {
				
				n = n - 1;
				n = n + colObj.set.length;
				
				_.each(colObj.set, function( setObj, setKey) {
					
					params.url = url + "flickr.photosets.getPhotos" + "&api_key=" + params.api_key + "&photoset_id="+setObj.id
					spashttp.request({url: params.url}, credentials, function( err, photos ) {
						
						cols.size += photos.size;
						
						cols.collections.collection[colKey].set[setKey].photo = photos.photoset.photo;
						n = n - 1;
						if (n === 0) {
							cb( null, cols );
						}
					});
				});
				
			});
			
		});	

	}	
}