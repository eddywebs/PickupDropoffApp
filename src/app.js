var app = angular.module('shuffling', []);

app.controller('FormController', ['guests', 'guest','addGuest', function(guests, guest, addGuest){
	var form =this;
	form.name = null;
	form.date = null;
	form.status = null;
	form.location = null;
	form.guests = guests;
	form.locationEnabled=false;

	form.disableLocation=function(bool){
		form.locationEnabled=bool;
	};

	console.log(guests);

	form.addGuest= function(name, date, status, location){
		addGuest.add(new guest(name, date, status, location));
		
		form.name = null;
		form.date = null;
		form.status = null;
		form.location = null;
		angular.element( document.querySelector( '#formTab' ) ).removeClass('active');
		angular.element( document.querySelector( '#form' ) ).removeClass('active');
		angular.element( document.querySelector( '#guests' ) ).addClass('active');
		angular.element( document.querySelector( '#guestsTab' ) ).addClass('active');
		
	};


}]);

app.controller('TabController', ['guests', 'guest', 'update', function(guests, guest, update){
	var tab= this;
	tab.guests=guests;

	tab.options = ['pickup', 'dropoff', 'arrived'];

	this.update=function(uid, status, deleted){
		//console.log('update me');
		update.update(uid, status, deleted);
	};
	//console.log(tab.guests);

}]);

//using factories for objects and services for application methods
//guest factory as object class
app.factory('guest', ['guests', function(guests){	

	function guest(name, date, status, location){
		var lastId= Math.max.apply(null, guests.map(function(a) {return a.uid;}));
		console.log('max number before adding a guest is:'+lastId);
		this.name= name;
		this.date = date;
		this.status = status;
		this.location =location;
		this.deleted=false;
		this.uid = (lastId!=null) ? lastId+1 : 0;
		console.log(guests);
	}

	

	return guest;
}]);

//using angular value to store all the guests
//value is like a property or variable which can be accessed in any module, service or factory
angular.module('shuffling').value('guests', function(){

	return (localStorage.getItem('guests')!==null) ? JSON.parse(localStorage.getItem('guests')) : [{"uid":0,"name":"adi","date":"2016-01-01T05:00:00.000Z","status":"pickup","location":"Central Sq, Cambridge","deleted":false},{"uid":1,"name":"Adi2","date":"2017-01-01T05:00:00.000Z","status":"pickup","location":"Harvard Sq, Cambridge","deleted":false}] ;

}());


// app.service('guests', ['guest', function(guest){


// 	return (localStorage.getItem('guests')!==null) ? JSON.parse(localStorage.getItem('guests')) : [{"name":"adi","date":"2016-01-01T05:00:00.000Z","status":"pickup","location":"Central Sq, Cambridge","deleted":false},{"name":"Adi2","date":"2017-01-01T05:00:00.000Z","status":"pickup","location":"Harvard Sq, Cambridge","deleted":false}] ;
// 	// var contacts= (localStorage.getItem('guests')!==null) ? JSON.parse(localStorage.getItem('guests')) : [{"name":"adi","date":"2016-01-01T05:00:00.000Z","status":"pickup","location":"Central Sq, Cambridge","deleted":false}];

// 	// this.list=contacts;

// }]);

app.service('addGuest', ['guests', 'guest', function(guests, guest){

	this.add=function(guest){

		guests.push(guest);
		localStorage.setItem('guests', JSON.stringify(guests, function (key, val) {
		     if (key == '$$hashKey') {
		         return undefined;
		     }
		     return val;
			}));
		// console.log('added and now [] is: ');
		// console.log(guests);
	};
}]);

app.service('update', ['guests', 'guest', function(guests, guest){

	this.update=function(uid, status, deleted){

		//find the array index of the given uid (http://stackoverflow.com/questions/12553274/getting-index-of-an-arrays-element-based-on-its-properties)
		var index= guests.map(function(el) {
							  return el.uid;
							}).indexOf(uid);

		console.log('updating the array:');
		guests.filter(function( obj ) {
		  return obj.uid == 6;
		});
		console.log(guests[index] );
		console.log('with status='+status+' deleted='+deleted);

		if(status!==null) guests[index].status=status;
		if(deleted==true) guests[index].deleted=true;
		localStorage.setItem('guests', JSON.stringify(guests, function (key, val) {
		     if (key == '$$hashKey') {
		         return undefined;
		     }
		     return val;
			}));
		console.log('updated array is below:');
		console.log(guests);
	};

	
	

}]);
