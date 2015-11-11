describe('FormController', function(){

	it('true test spec', function(){
		expect(true).toBe(true);

	});
	var addGuest, guests, guest;

	beforeEach(function(){
		module('shuffling');

		inject(function($injector){
					addGuest=$injector.get('addGuest');
					guests=$injector.get('guests');
					guest=$injector.get('guest');
				});
	});//END OF beforeEach()

	it('should add a guest to the guests array', function(){
				var startingLen=guests.length;
				addGuest.add(new guest('adi', null, 'pickup', 'from some location'));
				expect(guests.length).toBe(startingLen+1);
				});	
});

describe('tabController', function(){

	var guests, guest, updateService;

	beforeEach(function(){
		module('shuffling');

		//use $provide to make fake implementation of the services
		module(function($provide){
	      $provide.value('guests', [
	        {uid: 0, name: 'adi', date: '2016-01-01T05:00:00.000Z', status: 'pickup', location: 'Central Sq, Cambridge', deleted: false}
	      ]);
	    });

		inject(function($injector){
			guests=$injector.get('guests');
			guest=$injector.get('guest');
			updateService=$injector.get('update');
		});
	});//end of beforeEach()

	it('should update the only guest in the guests array to dropoff', function(){
		updateService.update(0, 'dropoff', null);
		expect(guests[0].status).toBe('dropoff');
	});

	it('should set the deleted flag(soft delete) of only guest to true', function(){
		updateService.update(0, null, true);
		expect(guests[0].deleted).toBe(true);
	});

});