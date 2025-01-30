const API_BASE = 'https://apiuat.makebookingsonline.com/api/v1';
const NUXT_VYOM_KEY = 'ZGVtb2FwaTpEZW1vQXBpQEFwaQ==';

// Helper function for API calls
async function callApi(endpoint, method = 'POST', payload = null) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${NUXT_VYOM_KEY}`,
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  if (!response.ok) {
    const body = await response.text();
    console.error('API call failed:', body)
    throw new Error(`API call failed: ${endpoint} : ${response.statusText}`);
  }

  return response.json();
}

// Main integration flow
async function runIntegrationTest() {
  try {
    // 1. Search Packages
    const searchResult = await callApi('/packages/v2/search', 'POST', {
      country_code: "NZ",
      no_of_days: "1-3",
      limit: 10,
      sort_by: "price_asc"
    });
    //const packageId = searchResult.data[0].package_id;

    //console.log('Search successful. Package ID:', packageId);
    const packageId = "67972042045444f07263651a";
    // 2. Get Package Details
    const detailsResult = await callApi('/packages/v2/details', 'POST', {
      package_id: packageId
    });
    console.log('Package details retrieved');

    /*
      {
    "package_id" : "67972042045444f07263651a",
    "start_date": "2025-03-09",
    "end_date": "2025-03-11",
    "guest_count": [
        {
            "adult": [2],
            "child": [0],
            "child_age": ["0"]
        }
    ]
   
}
    */
    // 3. Check Availability
    const availabilityResult = await callApi('/packages/checkAvailability', 'POST', {
      package_id: packageId,
      start_date: "2025-03-09",
      end_date: "2025-03-11",
      guest_count: [{ adult: [2], child: [0], child_age: ["0"] }]
    });

    const servicesNotAvailable = [];
    const servicesAvailable = [];
    // find all the services that are not available
    for (const [day, dayDetails] of Object.entries(availabilityResult.data.packageServiceDetailsDayWise)) {
        for (const service of dayDetails.services) {
          console.log(service);
          // Check multiple availability indicators
          if (service.service_not_available == true) {
            servicesNotAvailable.push(service);
            console.log(`Removing unavailable service (Day ${day}): ${service.supplier_service_name || service.service_category}`);
          } else {
            servicesAvailable.push(service);
          }
        }
    }
    
    console.log('Services available:', servicesAvailable.length);
    console.log('Services not available:', servicesNotAvailable.length);

    const packageAvailabilityId = availabilityResult.package_availability_id;
    console.log('Availability checked. Availability ID:', packageAvailabilityId);

    // 4. Add Activity (simplified flow)
    const activitySearch = await callApi('/activities/search', 'POST', {
      guest_count: [{ adult: 2, child: 0 }],
      "adult": 2,
      "booking_start_date": "2025-03-09",
      "city": 14,
      "country_code": "NZ",
      "get_live_data": 1,
      "offset": 0,
      "open_search": null,
      "sort_order": "price_asc",
      "supplier_id": null
    });

    const activityOptionsResult = await callApi('/activities/getActivitiesOptions', 'POST', {
      supplier_id: activitySearch.data[0].supplier_id,
      search_index: activitySearch.search_index,
      product_id: activitySearch.data[0].product_id,
      vendor_name: activitySearch.data[0].vendor_name,
    });

    const activitiesAvailabilityId = activityOptionsResult.activities_availability_id;

    console.log('Activity search completed. Activities available:', JSON.stringify(activityOptionsResult, null, 2));

    const activityPayload = {
      package_availability_id: packageAvailabilityId,
      activities_availability_id: activitiesAvailabilityId,
      service_day: 1,
      service_mode: "add",
    };

    const pricePayload = [{
      "itinerary_id": 0,
      activities_availability_id: activitiesAvailabilityId,
      start_date: "2025-03-09",
      booking_time: "08:30:00 - 12:00:00",
      productPax: {
        adult: 2,
        child: 0,
        infant: 0
      },
      paxAges: {
        child: [0],
        infant: [0]
      }
    }];
    

    //const updatedPriceResult = await callApi('/activities/getUpdatedPrice', 'POST', pricePayload);
    //console.log('Updated price:', updatedPriceResult.aPrice.total_price);

    const addActivityResult = await callApi('/packages/activities/addService', 'POST', activityPayload);
    console.log('Activity added');

    // get the cities that we can choose from
    const cityResult = await callApi(
      '/master/city?category_key=accomodation&country_code=NZ',
      'GET'
    );

    console.log('Citys called');

    // 5. search Accommodation
    const accommodationSearch = await callApi('/accomodation/v2/search', 'POST', {
      check_in_date: "2025-03-09",
      check_out_date: "2025-03-11",
      city: "Queenstown",
      country_code: "NZ",
      "guest_count":[{"adult":2,"child":0,"child_age":[]}],
      "vendor_name":[],
      "supplier_id":0,
      "sort_by":"price_asc",
      "get_live_data":1,
      "accomodation_no_of_nights":2,
      "country_code":"NZ",
      "offset":0,
      "limit":30
    });

    console.log('have searched accommodation');
    
    // 5c. Get Room Types
    const roomTypes = await callApi('/accom/getRoomType', 'POST', {
      search_index: accommodationSearch.search_index,
      supplier_id: accommodationSearch.data[0].supplier_id,
    });

    console.log('Room types retrieved');

    const room = roomTypes.data[0];
    console.log('we are booking this room:', room.rooms[0].room_name, 'for price:', room.total_cost, 'id: ', room.room_available_id);
    const accomodationAvailabilityId = roomTypes.accommodation_availability_id;
    

    const accommodationPayload = {
      package_availability_id: packageAvailabilityId,
      accommodation_availability_id: accomodationAvailabilityId,
      room_available_id: room.room_available_id,
      service_day: 1,
      "number_of_nights":2,
      service_mode: "add",
      //"package_service_id":0 not needed because we are adding a new service
    };

    console.log('accommodationPayload:', accommodationPayload);
    const addAccommodationResult = await callApi('/packages/accom/addService', 'POST', accommodationPayload);
    console.log('Accommodation added');

    const cartResult = await callApi('/packages/addToCart', 'POST', {
      package_id: packageId,
      package_availability_id: packageAvailabilityId,
      itinerary_id: 0,
      "reference_number" : "1299",
      "reference_name" : "package add ",
    });
    console.log('Added to cart');

    return true;
    // 7. Confirm Booking
    const confirmResult = await callApi('/packages/confirm', 'POST', {
      itinerary_id: 0,
      booking_reference_number: "test_ref"
    });
    console.log('Booking confirmed');

    console.log('All API calls completed successfully!');
    return true;
  } catch (error) {
    console.error('Integration test failed:', error.message);
    return false;
  }
}

// Execute the test
runIntegrationTest().then(success => {
  process.exit(success ? 0 : 1);
});