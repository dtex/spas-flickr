var request = require("request"),
	_ = require("underscore")._,
	url = "http://api.flickr.com/services/rest/?format=json&nojsoncallback=1&method=";
	
var makeRequest = function(reqString, credentials, cb) {
	
	if (_.isObject(credentials) && _.has(credentials, 'access_token')) {
		reqString += "&access_token=" + credentials.access_token;
	}
	
	request(reqString, function (err, res, body) {
		if (!err && res.statusCode == 200) {
			cb(null, JSON.parse(body))
		} else {
			var result;
			try {
				result = JSON.parse(body);
			} catch(e) {
				result = {errnum:1, errtxt: body}
			} finally {
				cb(result );	
			}
		}
	});
}

/*var getParts = function(params, partsList) {
	return ("?part=" + (_.has(params, 'part') ? params.part : partsList));
}*/

//
// ## Get all params and makeRequest
//
var go = function(method, params, credentials, cb) {
	var reqString = url + method + getExcluding(params, []);
	return makeRequest(reqString, credentials, cb);
}

//
// ## Get only one of from a list of params. If no match, default to first in list
//
var getOne = function(params, pickList) {
	var result = "";
	_.each(pickList, function(val, key) {
		if (_.has(params, val)) {
			result = "&" + val + "=" + params[val]
		}
	});
	if (result === "") result = pickList[0];
	return result;
}

//
// ## Get all params excluding the ones in the list
var getExcluding = function(params, ignoreList) {
	var result = "";
	_.each(params, function(val, key) {
		if(ignoreList.indexOf(key) === -1 ) {
			result += "&" + key + '=' + val;
		}
	});
	return result;
}


//
// ### activity
//
/*flickr.activity.userComments
flickr.activity.userPhotos*/

//
// ### auth
//
/*flickr.auth.checkToken
flickr.auth.getFrob
flickr.auth.getFullToken
flickr.auth.getToken*/

//
// ### auth.oauth
//
/*flickr.auth.oauth.checkToken
flickr.auth.oauth.getAccessToken*/

//
// ### blogs
//
/*flickr.blogs.getList
flickr.blogs.getServices
flickr.blogs.postPhoto*/

//
// ### cameras
//
/*flickr.cameras.getBrandModels
flickr.cameras.getBrands*/

//
// ### collections
//
exports["collections"] = {
	
	getInfo: function(params, credentials, cb) { 
		var reqString = url + "flickr.collections.getInfo" + getExcluding(params, []);
		makeRequest(reqString, credentials, cb);
	},
	getList: function(params, credentials, cb) {
		var reqString = url + "flickr.collections.getTree" + getExcluding(params, []);
		makeRequest(reqString, credentials, cb);	
	}
}
/*flickr.collections.getInfo
flickr.collections.getTree*/

//
// ### commons
//
/*flickr.commons.getInstitutions*/

//
// ### contacts
//
/*flickr.contacts.getList
flickr.contacts.getListRecentlyUploaded
flickr.contacts.getPublicList
flickr.contacts.getTaggingSuggestions*/

//
// ### favorites
//
/*flickr.favorites.add
flickr.favorites.getContext
flickr.favorites.getList
flickr.favorites.getPublicList
flickr.favorites.remove*/

//
// ### galleries
//
/*flickr.galleries.addPhoto
flickr.galleries.create
flickr.galleries.editMeta
flickr.galleries.editPhoto
flickr.galleries.editPhotos
flickr.galleries.getInfo
flickr.galleries.getList
flickr.galleries.getListForPhoto
flickr.galleries.getPhotos*/

//
// ### groups
//
/*flickr.groups.browse
flickr.groups.getInfo
flickr.groups.join
flickr.groups.joinRequest
flickr.groups.leave
flickr.groups.search*/

//
// ### groups.discuss.replies
//
/*flickr.groups.discuss.replies.add
flickr.groups.discuss.replies.delete
flickr.groups.discuss.replies.edit
flickr.groups.discuss.replies.getInfo
flickr.groups.discuss.replies.getList*/

//
// ### groups.discuss.topics
//
/*flickr.groups.discuss.topics.add
flickr.groups.discuss.topics.getInfo
flickr.groups.discuss.topics.getList*/

//
// ### groups.members
//
/*flickr.groups.members.getList*/

//
// ### groups.pools
//
/*flickr.groups.pools.add
flickr.groups.pools.getContext
flickr.groups.pools.getGroups
flickr.groups.pools.getPhotos
flickr.groups.pools.remove*/

//
// ### interestingness
//
/*flickr.interestingness.getList*/

//
// ### machinetags
//
/*flickr.machinetags.getNamespaces
flickr.machinetags.getPairs
flickr.machinetags.getPredicates
flickr.machinetags.getRecentValues
flickr.machinetags.getValues*/

//
// ### panda
//
/*flickr.panda.getList
flickr.panda.getPhotos*/

//
// ### people
//
/*flickr.people.findByEmail
flickr.people.findByUsername
flickr.people.getGroups
flickr.people.getInfo
flickr.people.getLimits
flickr.people.getPhotos
flickr.people.getPhotosOf
flickr.people.getPublicGroups
flickr.people.getPublicPhotos
flickr.people.getUploadStatus*/

//
// ### photos
//
/*flickr.photos.addTags
flickr.photos.delete
flickr.photos.getAllContexts
flickr.photos.getContactsPhotos
flickr.photos.getContactsPublicPhotos
flickr.photos.getContext
flickr.photos.getCounts
flickr.photos.getExif
flickr.photos.getFavorites
flickr.photos.getInfo
flickr.photos.getNotInSet
flickr.photos.getPerms
flickr.photos.getRecent
flickr.photos.getSizes
flickr.photos.getUntagged
flickr.photos.getWithGeoData
flickr.photos.getWithoutGeoData
flickr.photos.recentlyUpdated
flickr.photos.removeTag
flickr.photos.search
flickr.photos.setContentType
flickr.photos.setDates
flickr.photos.setMeta
flickr.photos.setPerms
flickr.photos.setSafetyLevel
flickr.photos.setTags*/

//
// ### photos.comments
//
/*flickr.photos.comments.addComment
flickr.photos.comments.deleteComment
flickr.photos.comments.editComment
flickr.photos.comments.getList
flickr.photos.comments.getRecentForContacts*/

//
// ### photos.geo
//
/*flickr.photos.geo.batchCorrectLocation
flickr.photos.geo.correctLocation
flickr.photos.geo.getLocation
flickr.photos.geo.getPerms
flickr.photos.geo.photosForLocation
flickr.photos.geo.removeLocation
flickr.photos.geo.setContext
flickr.photos.geo.setLocation
flickr.photos.geo.setPerms*/

//
// ### photos.licenses
//
/*flickr.photos.licenses.getInfo
flickr.photos.licenses.setLicense*/

//
// ### photos.notes
//
/*flickr.photos.notes.add
flickr.photos.notes.delete
flickr.photos.notes.edit*/

//
// ### photos.people
//
/*flickr.photos.people.add
flickr.photos.people.delete
flickr.photos.people.deleteCoords
flickr.photos.people.editCoords
flickr.photos.people.getList*/

//
// ### photos.suggestions
//
/*flickr.photos.suggestions.approveSuggestion
flickr.photos.suggestions.getList
flickr.photos.suggestions.rejectSuggestion
flickr.photos.suggestions.removeSuggestion
flickr.photos.suggestions.suggestLocation*/

//
// ### photos.transform
//
/*flickr.photos.transform.rotate*/

//
// ### photos.upload
//
/*flickr.photos.upload.checkTickets*/

//
// ### photosets
//
exports["photosets"] = {
	
	getInfo: function(params, credentials, cb) { 
		var reqString = url + "flickr.photosets.getInfo" + getExcluding(params, []);
		makeRequest(reqString, credentials, cb);
	},
	getList: function(params, credentials, cb) {
		var reqString = url + "flickr.photosets.getList" + getExcluding(params, []);
		makeRequest(reqString, credentials, cb);	
	},
	getPhotos: function(params, credentials, cb) {
		var reqString = url + "flickr.photosets.getPhotos" + getExcluding(params, []);
		makeRequest(reqString, credentials, cb);
	}
}

//
// ### photosets.comments
//
/*flickr.photosets.comments.addComment
flickr.photosets.comments.deleteComment
flickr.photosets.comments.editComment
flickr.photosets.comments.getList*/

//
// ### places
//
/*flickr.places.find
flickr.places.findByLatLon
flickr.places.getChildrenWithPhotosPublic
flickr.places.getInfo
flickr.places.getInfoByUrl
flickr.places.getPlaceTypes
flickr.places.getShapeHistory
flickr.places.getTopPlacesList
flickr.places.placesForBoundingBox
flickr.places.placesForContacts
flickr.places.placesForTags
flickr.places.placesForUser
flickr.places.resolvePlaceId
flickr.places.resolvePlaceURL
flickr.places.tagsForPlace*/

//
// ### prefs
//
/*flickr.prefs.getContentType
flickr.prefs.getGeoPerms
flickr.prefs.getHidden
flickr.prefs.getPrivacy
flickr.prefs.getSafetyLevel*/

//
// ### push
//
/*flickr.push.getSubscriptions
flickr.push.getTopics
flickr.push.subscribe
flickr.push.unsubscribe*/

//
// ### reflection
//
/*flickr.reflection.getMethodInfo
flickr.reflection.getMethods*/

//
// ### stats
//
/*flickr.stats.getCollectionDomains
flickr.stats.getCollectionReferrers
flickr.stats.getCollectionStats
flickr.stats.getCSVFiles
flickr.stats.getPhotoDomains
flickr.stats.getPhotoReferrers
flickr.stats.getPhotosetDomains
flickr.stats.getPhotosetReferrers
flickr.stats.getPhotosetStats
flickr.stats.getPhotoStats
flickr.stats.getPhotostreamDomains
flickr.stats.getPhotostreamReferrers
flickr.stats.getPhotostreamStats
flickr.stats.getPopularPhotos
flickr.stats.getTotalViews*/

//
// ### tags
//
/*flickr.tags.getClusterPhotos
flickr.tags.getClusters
flickr.tags.getHotList
flickr.tags.getListPhoto
flickr.tags.getListUser
flickr.tags.getListUserPopular
flickr.tags.getListUserRaw
flickr.tags.getMostFrequentlyUsed
flickr.tags.getRelated*/

//
// ### test
//
/*flickr.test.echo
flickr.test.login
flickr.test.null*/

//
// ### urls
//
/*flickr.urls.getGroup
flickr.urls.getUserPhotos
flickr.urls.getUserProfile
flickr.urls.lookupGallery
flickr.urls.lookupGroup
flickr.urls.lookupUser*/

//
// ## Custom - These do not have equivelants in the Flickr API
//
exports["custom"] = {
	
	getPhotosetsWithPhotos: function(params, credentials, cb) { 
		var reqString = url + "flickr.photosets.getList" + getExcluding(params, []);
		makeRequest(reqString, credentials, function( err, sets ) {
			var n = sets.photosets.photoset.length;
			_.each(sets.photosets.photoset, function( obj, key) {
				reqString = url + "flickr.photosets.getPhotos" + "&api_key=" + params.api_key + "&photoset_id="+obj.id;
				makeRequest(reqString, credentials, function( err, photos ) {
					n = n - 1;
					sets.photosets.photoset[key].photo = photos.photoset.photo;
					if (n === 0) {
						cb( null, sets );
					}
				});
			});
		});	
	},
	
	getCollectionsWithPhotos: function(params, credentials, cb) {
		var reqString = url + "flickr.collections.getTree" + getExcluding(params, []);
		makeRequest(reqString, credentials, function( err, cols ) {

			var n = cols.collections.collection.length;
			
			_.each(cols.collections.collection, function( colObj, colKey) {
				
				n = n - 1;
				n = n + colObj.set.length;
				
				_.each(colObj.set, function( setObj, setKey) {
					
					reqString = url + "flickr.photosets.getPhotos" + "&api_key=" + params.api_key + "&photoset_id="+setObj.id
					makeRequest(reqString, credentials, function( err, photos ) {
						
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