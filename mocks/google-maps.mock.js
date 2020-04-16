var google = {
    maps : {
		event: {
			addListener : function(map, action, func){}
		},
		Animation : {
			DROP: true
		},
        OverlayView : function () {
        },
        Marker : function () {
			return {
				addListener : function(event,func){}
			}
        },
        InfoWindow : function () {
        },
        LatLng: function(lat, lng){
        	return [lat, lng];
        },
        Map: function(obj){
			return {
				setCenter: function(coords){
					return true;
				},
				setZoom: function(coords){
					return true;
				},
			}
        },
        MapTypeId: {ROADMAP: true},
        places: {
        	AutocompleteService: function(){

        	},
    		PlacesService: function(obj){
    			return {
    				PlacesServiceStatus: {
	        			OK: true
	        		},
	        		textSearch: function(query){
	        			return [];
	        		},
	        		nearbySearch: function(query){
	        			return [];
	        		}
    			};	
    		}
        }
    }
};
