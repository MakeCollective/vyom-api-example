# vyom-api-example

Based on the following documentation, we attempt to use the API to achieve the following user stories:

## Use Cases

All use cases start at the point where the user has already chosen a package.

### Happy Path: User picks a package that they like and books it

1. User views the package details.
2. User selects dates and number of guests.
3. User reviews the package and can see that everything is available.
4. User adds guests with their details.
5. User confirms the package.
6. User is redirected to the payment gateway.

### Partially Available Package: Some of the accommodation and/or activities are not available. The user must edit the package to remove/replace the unavailable package components.

1. User views the package details.
2. User selects dates and number of guests.
3. User reviews the package and can see that 1 - n of the package components are not available.
4. User has to click the "Remove Package" button.
5. User has the option to add some other activity/accommodation.
6. User adds guests with their details.
7. User confirms the package.
8. User is redirected to the payment gateway.

### Customised Package: User decides to change the package by adding/removing accommodation and/or activities.

1. User views the package details.
2. User selects dates and number of guests.
3. User reviews the package and can see that everything is available.
4. User edits the package.
5. User removes accommodation/activity.
6. User adds accommodation/activity.
7. User adds guests with their details.
8. User confirms the package.
9. User is redirected to the payment gateway.

## API Documentation

### MBO-Package API DOC

Makebookingsonline API Doc for Packages

#### Search Package

### ApiName: `packages/v2/search`
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/packages/v2/search`
### Payload:

```json
{
    "country_code": "NZ",
    "package_transport": "",
    "package_types": "",
    "no_of_days": "1-3",
    "limit": 10,
    "offset": 0,
    "sort_by": "price_asc"
}
```



Note:
1. package_transport should be seat_in_coach,self_drive,private_touring and no_transport.
2. package_types should be family,honeymoon,activity and adventure.
3. Limit : number of packages on each page.

### Response:


```json
{

    "status": 200,
    "data": [
        {
            "title": "Queenstown Coast Package -3 days",
            "type": "family",
            "transfers": "self_drive",
            "start_city_id": 1,
            "end_city_id": 14,
            "number_of_city": 3,
            "number_of_nights": 2,
            "number_of_days": 3,
            "bookability": "open",
            "dictated_start_date": "1970-01-01T00:00:00.000Z",
            "dictated_end_date": "1970-01-01T00:00:00.000Z",
            "inclusion": [
                "Take a look of  amazing view of NewZealand ,beautiful mountain and nature "
            ],
            "exclusion": [
                "1-Government Service Tax as applicable on the above rates "
            ],
            "highlight": [
                "Take a look of  amazing view of NewZealand ,beautiful mountain and nature "
            ],
            "country_code": "NZ",
            "id": "67972042045444f07263651a",
            "package_id": "67972042045444f07263651a",
            "start_city_name": "Auckland",
            "end_city_name": "Queenstown",
            "package_status": 1,
            "images": [
                "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284677202.png",
                "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284775254.png",
                "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284885561.png",
                "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284963525.png"
            ],
            "price": 1109.1003,
            "city_summary": [
                {
                    "start_city": 14,
                    "city_name": "Queenstown",
                    "number_of_nights": 2,
                    "service_day": 1,
                    "service_end_day": 2,
                    "service_days": [
                        1,
                        2,
                        3
                    ]
                }
            ]
        }
    ],
    "totalCount": 2
}
```


Step 2. Get Package details

### ApiName:packages/v2/details
### Endpoint `https://apiuat.makebookingsonline.com/api/v1/packages/v2/details
### Payload:


```json
{
    "package_id": "67972042045444f07263651a"
}
```

Note:( To use service_priority (PRIMARY & ALTERNATE) parameters in package detail api).

1. Get the  package_id from the package search response.
2. The service_priority is "PRIMARY" option  the main or default choice for accommodation and rental
3. if the service_priority is "PRIMARY" option is unavailable then The alternate is the secondary option for accommodation and rental

In activities consider included:1, included:0 is for suggestion only which can be given to customer as a choice to add in package

### Response:

```json
{
    "status": 200,
    "data": {
        "package_id": "67972042045444f07263651a",
        "price": 960.26,
        "packageDetails": {
            "title": "Queenstown Coast Package -3 days",
            "type": "family",
            "transfers": "self_drive",
            "start_city_id": 1,
            "end_city_id": 14,
            "number_of_city": 3,
            "number_of_nights": 2,
            "number_of_days": 3,
            "bookability": "open",
            "dictated_start_date": "1970-01-01T00:00:00.000Z",
            "dictated_end_date": "1970-01-01T00:00:00.000Z",
            "inclusion": [
                "Take a look of amazing view of New Zealand, beautiful mountain and nature"
            ],
            "exclusion": [
                "1-Government Service Tax as applicable on the above rates"
            ],
            "highlight": [
                "Take a look of amazing view of New Zealand, beautiful mountain and nature"
            ],
            "country_code": "NZ",
            "images": [
                {
                    "title": "",
                    "image_path": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284677202.png",
                    "is_primary": 1,
                    "image_id": 1,
                    "image_system_name": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284677202.png"
                },
                {
                    "title": "",
                    "image_path": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284775254.png",
                    "is_primary": null,
                    "image_id": 2,
                    "image_system_name": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284775254.png"
                },
                {
                    "title": "",
                    "image_path": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284885561.png",
                    "is_primary": null,
                    "image_id": 3,
                    "image_system_name": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284885561.png"
                },
                {
                    "title": "",
                    "image_path": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284963525.png",
                    "is_primary": null,
                    "image_id": 4,
                    "image_system_name": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284963525.png"
                }
            ],
            "package_status": 1,
            "city_display": {
                "1": "Arrival in Queenstown",
                "2": "Stay in Queenstown",
                "3": "Departure From Queenstown"
            },
            "city_summary": [
                {
                    "start_city": 14,
                    "city_name": "Queenstown",
                    "number_of_nights": 2,
                    "service_day": 1,
                    "service_end_day": 2,
                    "service_days": [
                        1,
                        2,
                        3
                    ]
                }
            ]
        },
        "packageServiceDetailsDayWise": {
            "1": {
                "services": [
                    {
                        "supplier_id": 1313,
                        "product_reference_id": 13256,
                        "supplier_name": "Queenstown Expeditions",
                        "supplier_service_name": "Glenorchy Kiwi Special Tour",
                        "category_id": 22,
                        "service_category": "Activity",
                        "service_day": 1,
                        "start_city": 14,
                        "start_city_name": "Queenstown",
                        "service_latitude": "",
                        "service_longitude": "",
                        "start_time": "08:00:00 ",
                        "end_time": " 12:00:00",
                        "service_description": "",
                        "service_image": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/nzplanner/assets/data/service-image/13256_doc_1621324865-0.jpg",
                        "vendor_name": "VYOM_ACTIVITY",
                        "price": 84.8925,
                        "child_price": 21.75,
                        "included": 1,
                        "package_service_id": 3,
                        "parent_id": 0,
                        "service_start_day": 1,
                        "category_key": "activity",
                        "aDisplay": [
                            {
                                "display_type": "time",
                                "display_label": "Start Time",
                                "display_value": "08:00:00 "
                            },
                            {
                                "display_type": "time",
                                "display_label": "End Time",
                                "display_value": " 12:00:00"
                            }
                        ]
                    },
                    {
                        "supplier_id": 1619,
                        "product_reference_id": 24333,
                        "supplier_name": "KJet Queenstown",
                        "supplier_service_name": "KJet (Express Jet Boat Ride)",
                        "category_id": 22,
                        "service_category": "Activity",
                        "service_day": 1,
                        "start_city": 14,
                        "start_city_name": "Queenstown",
                        "service_latitude": "",
                        "service_longitude": "",
                        "start_time": "09:35:00",
                        "service_description": "Time conscious – KJet offers an express Jet boat ride catering to your client’s needs. 30-40 Minutes of\r\nJet boating, departing from either Queenstown Marina, Frankton or the Main Town Pier, Queenstown Bay\r\n(*minimum numbers apply).",
                        "service_image": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/nzplanner/assets/data/service-image/24333_doc_1696912556-0.jpg",
                        "vendor_name": "VYOM_ACTIVITY",
                        "price": 160.08299999999997,
                        "child_price": 48.3,
                        "included": 0,
                        "package_service_id": 4,
                        "parent_id": 0,
                        "service_start_day": 1,
                        "category_key": "activity",
                        "aDisplay": [
                            {
                                "display_type": "time",
                                "display_label": "Start Time",
                                "display_value": "09:35:00"
                            }
                        ]
                    },
                    {
                        "category_id": 2,
                        "service_category": "Accommodation",
                        "supplier_id": 48,
                        "supplier_name": "Mercure Queenstown Resort",
                        "supplier_service_name": "Mercure Queenstown Resort",
                        "service_day": 1,
                        "number_of_nights": 2,
                        "start_city": 14,
                        "start_city_name": "Queenstown",
                        "service_latitude": "-45.038545",
                        "service_longitude": "168.638611",
                        "start_time": "14:00",
                        "end_time": "10:00:00",
                        "price": 767.7977999999999,
                        "service_image": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/nzplanner/assets/data/service-image/333_doc_1591663380-0.jpg",
                        "service_priority": "PRIMARY",
                        "package_service_id": 1,
                        "parent_id": 0,
                        "service_start_day": 1,
                        "is_checkout_date": 0,
                        "category_key": "accommodation",
                        "aDisplay": [
                            {
                                "display_type": "time",
                                "display_label": "Check-In Time",
                                "display_value": "14:00"
                            }
                        ],
                        "included": 1
                    }
                ],
                "category_count": {
                    "accommodation": 2,
                    "rental_car": 2,
                    "activity": 2
                },
                "display_city": "Arrival in Queenstown",
                "start_city": 14
            },
            "2": {
                "services": [
                    {
                        "category_id": 2,
                        "service_category": "Accommodation",
                        "supplier_id": 48,
                        "supplier_name": "Mercure Queenstown Resort",
                        "supplier_service_name": "Mercure Queenstown Resort",
                        "service_day": 2,
                        "number_of_nights": 2,
                        "start_city": 14,
                        "start_city_name": "Queenstown",
                        "service_latitude": "-45.038545",
                        "service_longitude": "168.638611",
                        "start_time": "00:00",
                        "end_time": "10:00:00",
                        "price": 767.7977999999999,
                        "service_image": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/nzplanner/assets/data/service-image/333_doc_1591663380-0.jpg",
                        "service_priority": "PRIMARY",
                        "package_service_id": 1,
                        "service_start_day": 1,
                        "is_checkout_date": 0,
                        "category_key": "accommodation",
                        "aDisplay": [
                            {
                                "display_type": "string",
                                "display_label": "Stay Continues",
                                "display_value": ""
                            }
                        ],
                        "included": 1
                    }
                ],
                "category_count": {
                    "accommodation": 2,
                    "rental_car": 2
                },
                "display_city": "Stay in Queenstown",
                "start_city": 14
            }
        }
    }
}

```


### ApiName: packages/checkAvailability
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/packages/checkAvailability`
### Payload:


```json
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
```



Note:

1. Getting the package_id from package search api response.
2. checkAvailability will return the packageDetails + packageDetailsDaywise + the “package_availability_id

To use the Include and NOT Include parameter in package availability api .

1. if include "1" it's count into the package .
2. if include "0" it's not counted into the package ,it's only for option choice.

### Response:

```json
{
  "status": 200,
  "data": {
    "packageDetails": {
      "title": "Queenstown Coast Package -3 days",
      "type": "family",
      "transfers": "self_drive",
      "start_city_id": 1,
      "end_city_id": 14,
      "number_of_city": 3,
      "number_of_nights": 2,
      "number_of_days": 3,
      "bookability": "open",
      "dictated_start_date": {
        "$date": {
          "$numberLong": "0"
        }
      },
      "dictated_end_date": {
        "$date": {
          "$numberLong": "0"
        }
      },
      "inclusion": [
        "Take a look of amazing view of NewZealand, beautiful mountain and nature"
      ],
      "exclusion": [
        "1-Government Service Tax as applicable on the above rates"
      ],
      "highlight": [
        "Take a look of amazing view of NewZealand, beautiful mountain and nature"
      ],
      "country_code": "NZ",
      "id": "67972042045444f07263651a",
      "images": [
        {
          "image_system_name": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284677202.png",
          "is_primary": 1,
          "title": ""
        },
        {
          "image_system_name": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284775254.png",
          "is_primary": null,
          "title": ""
        },
        {
          "image_system_name": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284885561.png",
          "is_primary": null,
          "title": ""
        },
        {
          "image_system_name": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/data/packages/file_17321284963525.png",
          "is_primary": null,
          "title": ""
        }
      ],
      "booking_start_date": "2025-03-09",
      "booking_end_date": "2025-03-11",
      "guest_count": [
        {
          "adult": [2],
          "child": [0],
          "child_age": ["0"]
        }
      ],
      "city_summary": [
        {
          "start_city": 14,
          "city_name": "Queenstown",
          "number_of_nights": 2,
          "service_day": 1,
          "service_end_day": 2,
          "service_days": [1, 2, 3]
        }
      ],
      "aPrice": {
        "total_price": 2886.88,
        "price_per_adult": 1213.53,
        "price_per_child": 0,
        "total_adult_price": 2427.05,
        "total_child_price": 459.83,
        "agent_total_price": 2745.64,
        "agent_total_adult_price": 2307.71,
        "agent_total_child_price": 437.93,
        "agent_per_adult_price": 1153.86,
        "agent_per_child_price": 0
      }
    },
    "packageServiceDetailsDayWise": {
      "1": {
        "services": [
          {
            "id": 1,
            "parent_id": 0,
            "package_id": "67972042045444f07263651a",
            "category_id": 1,
            "service_category": "Rental Car",
            "supplier_id": 7,
            "supplier_name": "",
            "supplier_service_name": "Car, B2 SUZUKI SWIFT OR SIMILAR(EDAR)",
            "service_day": 1,
            "service_start_day": 1,
            "number_of_days": 1,
            "start_city": 1,
            "start_city_name": "Auckland",
            "pickup_location_id": "4858",
            "dropoff_city": 1,
            "drop_city_name": "",
            "dropoff_location_id": "4858",
            "pickup_location": "AUCKLAND AIRPORT",
            "dropoff_location": "AUCKLAND AIRPORT",
            "pickup_address": "",
            "dropoff_address": "",
            "start_latitude": "",
            "service_latitude": "-37.005603",
            "service_longitude": "174.791014",
            "start_date": "2025-03-09",
            "end_date": "2025-03-10",
            "start_time": "11:30:00",
            "end_time": "07:40:00",
            "service_time": "11:30:00",
            "display_type": "",
            "display_value": "",
            "display_label": "",
            "product_reference_id": "EDAR",
            "session_id": "QDALRJ6D0R70175-6601",
            "vehicle_itcode": "ITNZ2693",
            "specification": "{\"fuel\":\"Unspecified\",\"transmission\":\"Automatic\",\"doors\":\"4\",\"distance_limit\":\"Unlimited\",\"passenger\":\"4\",\"baggage\":\"1\"}",
            "service_image": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/mbo/assets/images/rental-cars/HERTZ/ZENZEDAR999.jpg",
            "price": 113.19,
            "one_way_or_drop_price": "",
            "vendor_name": "HERTZ",
            "none_refundable": "",
            "service_not_available": false,
            "day_highlight": "",
            "country_code": "",
            "currency": "",
            "is_dropoff_date": 0,
            "category_key": "rental_car",
            "aDisplay": [
              {
                "display_type": "time",
                "display_label": "Pick-Up Time",
                "display_value": "11:30:00"
              },
              {
                "display_type": "string",
                "display_label": "Pick-Up Location",
                "display_value": "AUCKLAND AIRPORT"
              }
            ],
            "agent_price": 107.8
          },
          {
            "id": 9,
            "parent_id": 0,
            "SessionId": "",
            "search_index": "6797466c7c9efbaafac9fe95",
            "package_id": "67972042045444f07263651a",
            "HotelCode": "",
            "category_id": 2,
            "service_category": "Accommodation",
            "supplier_id": 176,
            "supplier_name": "",
            "supplier_service_name": "Heritage Queenstown",
            "room_name": [
              "Family Deluxe Room Non-Lakeview"
            ],
            "aInclusion": [
              "Room Only"
            ],
            "service_day": 1,
            "service_start_day": 1,
            "number_of_nights": 2,
            "day_highlight": "",
            "start_city": 14,
            "start_city_name": "Queenstown",
            "service_latitude": "-45.037844",
            "service_longitude": "168.642835",
            "start_date": "2025-03-09",
            "end_date": "2025-03-11",
            "start_time": "14:00",
            "end_time": "10:00",
            "service_time": "14:00",
            "display_type": "",
            "display_value": "",
            "display_label": "",
            "none_refundable": 0,
            "price": 1255.254,
            "service_description": "Property Location With a stay at Heritage Queenstown, you'll be centrally located in Queenstown, within a 10-minute drive of Lake Wakatipu and CaddyShack City Mini Golf. This 4.5-star",
            "service_image": "https://api.tbotechnology.in/imageresource.aspx?img=9eMP+0FIICgCIk6ZClzZH9Cs+1gwAq6BFWcc22yNLMF/UJIXMdxPdRpAyYgh22RZU80KsHGejZQWaJDdqHfdO7afCz6iqXiN9ge4CiGQhiRdDvSeJgYQan7iDathr0XDAyEfbleqjh+aMp9fXVIXjQk3zvlIppm/",
            "vendor_name": "EXPEDIA",
            "service_not_available": false,
            "accommodation_availability_id": "ZcBheVAbJvwxIOXwPy3iFjfMpeJ9Blpu",
            "room_available_id": "iWzJPLAdk6LxI1wV",
            "country_code": "",
            "currency": "",
            "is_checkout_date": 0,
            "category_key": "accommodation",
            "aDisplay": [
              {
                "display_type": "time",
                "display_label": "Check-In Time",
                "display_value": "14:00"
              }
            ],
            "agent_price": 1195.48
          }
        ],
        "booking_date": "2025-03-09",
        "booking_end_date": "2025-03-11",
        "display_city": "Arrival in Queenstown",
        "start_city": 14
      },
      "2": {
        "services": [
          {
            "id": 5,
            "parent_id": 0,
            "package_id": "67972042045444f07263651a",
            "supplier_id": 118,
            "supplier_service_id": 17225,
            "product_reference_id": "17225",
            "supplier_name": "",
            "supplier_service_name": "Wellington, Interisland, Coastal Pacific Christchurch",
            "category_id": 26,
            "service_category": "Ferry",
            "service_day": 2,
            "start_city": 24,
            "start_city_name": "Wellington",
            "service_latitude": "",
            "service_longitude": "",
            "dropoff_city": 23,
            "drop_city_name": "",
            "drop_latitude": "",
            "drop_longitude": "",
            "start_date": "2025-03-10",
            "start_time": "08:00:00",
            "end_time": "11:30:00",
            "service_time": "08:00:00",
            "service_description": "The journey across the Cook Strait takes 3 to 3.5 hours then connects with Coastal Pacific train (only on operational days) to Christchurch 7.30pm\r\n\r\nDEPARTS: 9:00 AM\r\nARRIVES : 7:30 PM",
            "service_image": "https://vyoms3.s3.ap-southeast-2.amazonaws.com/nzplanner/assets/data/service-image/17225_doc_1665789027-0.jpg",
            "vendor_name": "VYOM",
            "price": 347.655,
            "adult_total_price": "209.06",
            "child_total_price": "138.60",
            "infant_price": 0,
            "none_refundable": "",
            "aProductOptions": [
              {
                "product_id": "Adult",
                "parent_product_id": "17225",
                "fareLabelAdult": "Adult",
                "label": "Adult",
                "paxAges": [],
                "total_unit": 1
              },
              {
                "product_id": "Child",
                "parent_product_id": "17225",
                "fareLabelAdult": "Child",
                "label": "Child",
                "paxAges": [],
                "total_unit": 1
              }
            ],
            "productPax": {
              "Adult": 1,
              "Child": 1
            },
            "total_adult": 1,
            "total_child": 1,
            "service_not_available": false,
            "day_highlight": "",
            "country_code": "",
            "currency": "",
            "included": 1,
            "category_key": "ferry",
            "aDisplay": [
              {
                "display_type": "time",
                "display_label": "Start Time",
                "display_value": "08:00:00"
              },
              {
                "display_type": "time",
                "display_label": "End Time",
                "display_value": "11:30:00"
              },
              {
                "display_type": "string",
                "display_label": "Start City",
                "display_value": "Wellington"
              }
            ],
            "agent_price": 331.1
          }
        ],
        "package_availability_id": "67974e5f7c9efbaafaca00c3"
      }
    }
  }
}

```

To Add activity into a package .
First  city api call.

### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/master/city?category_key=activities&country_code=NZ`
### Payload:

```json
{

  "category_key": "activities",
  "country_code": "NZ"
}
```

Step 1. Get Activity search:
Search for the activities on the day you wish to book in the package.

### ApiName:activities/search
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/activities/search
### Payload:


```json
{

  "adult": 2,
  "booking_start_date": "2025-03-09",
  "city": 14,
  "country_code": "NZ",
  "get_live_data": 1,
  "guest_count": [
    {
      "adult": 2,
      "child": 0,
      "child_age": []
    }
  ],
  "offset": 0,
  "open_search": null,
  "sort_order": "price_asc",
  "supplier_id": null
}
```

Response:

Step 4.Get activity option.
### ApiName: activities/getActivitiesOptions
### Endpoint `https://apiuat.makebookingsonline.com/api/v1/activities/getActivitiesOptions
### Payload:


```json
{
    "supplier_id":1313,
    "search_index": "679752127c9efbaafaca00ed",
    "product_id": "13256",
    "vendor_name": "VYOM_ACTIVITY"
}
```

Note:
1. supplier_id,search_index,product_id,vendor_name these fields are getting from activity search api response.

### Response:

```json
{

    "status": 200,
    "type": "success",
    "aOptionList": {
        "adult": {
            "product_id": 13256,
            "fareLabelAdult": "Adult",
            "label": "Adult",
            "label_note": "Adult",
            "unit_consumed_pax": 1,
            "booking_unit_label": "Adult",
            "selected_unit": 2,
            "age_limit_label": "Adult",
            "min_age": 12
        },
        "child": {
            "product_id": 13256,
            "fareLabelAdult": "Child",
            "label": "Child",
            "label_note": "",
            "unit_consumed_pax": 1,
            "booking_unit_label": "Child",
            "selected_unit": 0,
            "age_limit_label": "Child (Age should be less than 12)",
            "max_age": 12,
            "min_age": 4
        }
    },
    "activities_availability_id": "6BqyjMbOWCF73VHd1TzDVFeS4LS5iSF5"
}
```

Step 4.Get getUpdatedPrice : Vyom

### ApiName:activities/getUpdatedPrice
### Endpoint `https://apiuat.makebookingsonline.com/api/v1/activities/getUpdatedPrice
### Payload:

```json
{
     "itinerary_id": 0,
     "activities_availability_id":"6BqyjMbOWCF73VHd1TzDVFeS4LS5iSF5",
     "start_date": "2025-03-09",
    "booking_time": "08:30:00 - 12:00:00",
    "productPax": {
    "adult": 2,
    "child": 0,
    "infant": 0
  },
    "paxAges": {
    "child": [0],
    "infant": [0]
  }
 
}
```

Note:
1. This api used to get the update price number of pax .

### Response:

```json
{

    "status": 200,
    "type": "success",
    "message": "price updated.",
    "aPrice": {
        "total_price": "84.89"
    }
}
```

Get getUpdatedPrice.(Redzy)

### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/activities/getUpdatedPrice
### Payload:


```json
{

 "itinerary_id": 0,
 "activities_availability_id":"NJdVg0KjBuDehUcfNYm13tu4xo1zTo9f",
"booking_date": "2025-03-09T09:30:00.000Z",
"available_start_date": "2025-03-09",
"start_time": "09:00:00-09:00:00",
"productPax": {
"adult":2,
"option1padiopenwaterdiver":1
},
"aExtras": {
"t-shirt": "1"
}
}
```

Get getUpdatedPrice.(Livn)
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/activities/getUpdatedPrice`
### Payload:


```json
{

  "activities_availability_id": "jPGJz5TJEGoyVkCMY7L9xvVuAreh4wAN",
  "flow_id": 3026639,
  "itinerary_id": 0,
  "paxAges": {
    "00040954-0009-0003-0001-000000000000": [25, 25]
  },
  "productPax": {
    "00040954-0009-0003-0001-000000000000": 2,
    "00040954-0009-0003-0001-000000000001": 0
  },
  "start_date": "2025-03-09",
  "steps_id": 3202354
}
```



To Add activities into Package:
### ApiName:activities/addService
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/packages/activities/addService`
### Payload:


```json
{

   {
    "package_availability_id": "67974e5f7c9efbaafaca00c3",
    "activities_availability_id" : "6BqyjMbOWCF73VHd1TzDVFeS4LS5iSF5",
    "service_day":1,
    "service_mode": "add",
    "start_time": "08:00:00 - 12:00:00",
     "package_service_id":0
  }
}
```


Note:
1. Get package_availability_id from package checkAvailability api.
2. Get activities_availability_id from  activity getActivitiesOptions api.
3. service_day,service_mode are mandatory .
4. service_mode must be “add” Or “edit”.
5. if service_mode is “edit” then package_service_id is required.

Response:


Edit activities
### ApiName:activities/addService
### Endpoint `https://apiuat.makebookingsonline.com/api/v1/packages/activities/addService`
### Payload:

```json
{

    "package_availability_id": "67974e5f7c9efbaafaca00c3",
    "activities_availability_id" : "DxVSId3VhyuV0HZh2JefS5lO3fRtG9qk",
    "service_day":1,
    "service_mode": "edit",
    "start_time": "14:00:00 - 14:30:00",
     "package_service_id":3
}
```

Note:
Step 1.For edit services use the same above api.
Step 2.if service_mode is “edit” then package_service_id is required.
Response:


Add accomodation into a package:
First Call city api.
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/master/city?category_key=accomodation&country_code=NZ
### Payload:

```json
{

 "category_key": "accomodation",
 "country_code": "NZ"
}
```

Step 1.Get accommodation  search:
Search for the accommodation on the day you wish to book into the package.

### ApiName:accomodation/v2/search
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/accomodation/v2/search
### Payload:

```json
{

    "check_in_date":"2025-03-09",
    "check_out_date":"2025-03-11",
    "city":"Queenstown",
    "vendor_name":[],
    "supplier_id":0,
    "sort_by":"price_asc",
    "get_live_data":1,
    "accomodation_no_of_nights":2,
    "country_code":"NZ",
    "guest_count":[{"adult":2,"child":0,"child_age":[]}],
    "offset":0,
    "limit":30
    }
```

Response:


   
Step 2.
### ApiName:accom/getRoomType
### Endpoint `https://apiuat.makebookingsonline.com/api/v1/accom/getRoomType`
### Payload:

```json
{

    "search_index":"67975f7f7c9efbaafaca01e8",
    "supplier_id":48
}
```

Note:
1. Get search_index and supplier_id from accommodation search response api.
2. getRoomType api return room_available_id and accommodation_availability_id.

Response:


Step 3.add accommodation  into package.
### ApiName:accom/addService
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/packages/accom/addService`
### Payload:

```json
{

    "package_availability_id": "67975cbd7c9efbaafaca0194",
    "accommodation_availability_id":"Yck0YDLeOYQ6YZZzBOR7KN9q9kwGn7eo",
    "room_available_id":"qzyfLqExa1CR3bzm",
    "service_day":1,
    "service_mode": "add",
    "number_of_nights":2,
    "package_service_id":0
}
```

Note:
1. package_availability_id is getting from package availability api.
2. accommodation_availability_id,room_available_id are getting from getRoomType api from accommodation.
3. service_day and service_mode are mandatory.
4. Service_mode Must be “add “OR “edit”.
5. if service_mode is “edit” then package_service_id is required .
6. number_of_nights is mandatory.

Response:


Edit accommodation:
### ApiName:accom/addService
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/packages/accom/addService`
### Payload:

```json
{

    "package_availability_id": "67975cbd7c9efbaafaca0194",
    "accommodation_availability_id":"Yck0YDLeOYQ6YZZzBOR7KN9q9kwGn7eo",
    "room_available_id":"6bOe8VjQYnGnuCRM",
    "service_day":1,
    "service_mode": "edit",
    "number_of_nights":2,
    "package_service_id":3904
}
```


Note:
Step 1. Use the above api for edit accommodation .
Step 2. if service_mode is “edit” then package_service_id is required .

Response:


Add Rental into a package:
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/master/city?category_key=rental_cars&country_code=NZ`
### ApiName:rental/quotes

Search for the rental on the day you wish to book into the package.
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/rental/quotes`
### Payload:

```json
{
  "pick_city": 14,
  "drop_city": 14,
  "booking_start_date": "2025-03-09",
  "booking_end_date": "2025-03-11",
  "country_code": "NZ",
  "get_live_data": 1,
  "rental_number_of_days": 2,
  "coverage_type": "",
  "offset": 0,
  "vendor_name": [
    "HERTZ",
    "THRIFTY",
    "DOLLAR",
    "GO_RENTAL",
    "EUROPCAR"
  ],
  "seating_capacity": {
    "min": 1,
    "max": 5
  },
  "sort_order": "price_asc"
}
```

Note:
1. Rental quotes Api will return list of car vendor wise according to search parameter.
2. if coverage_type is selected as a blank then it will return all types of coverage type.
3. If vendor_name is selected as a blank then it will return all vendor data .
4. if seating_capacity is selected as a blank then it will return all seating data .
5. Rental_number_of_days is mandatory .

Response:
=
Step 2.
### ApiName:rental/pick-and-drop-time
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/rental/pick-and-drop-time`
### Payload:

```json
{

    "location_id": 4860,
    "service_date": "2025-03-09"
}
```

Note:
1. Location_id and service_date are getting from quotes api response.
2. Here service_date is booking date .
3. Location_id and service_date both are mandatory .

Response:

Step 3.get a single quotes
### ApiName:rental/single-quotes
### Endpoint `https://apiuat.makebookingsonline.com/api/v1/rental/single-quotes`
### Payload:

```json
{

    "requirement_id": "679767d27c9efbaafaca056f",
    "vendor_slug": "hertz",
    "start_date": "2025-03-09",
    "end_date": "2025-03-11",
    "pickup_time": "09:00:00",
    "dropoff_time": "09:00:00",
    "pickup_location": 4860,
    "dropoff_location": 4860,
    "itinerary_id": 0,
    "supplier_id": 7,
    "sipp_code": "EDAR",
    "vehicle_itcode": "ITNZ2693",
    "option": [],
    "option_quantity": [],    
       "coverage_type": 240,
    "driver_age": 25
}
```

Note:
1. get the requirement_id from quotes api response.
2. vendor_slug,start_date,end_date,pickup_time,dropoff_time,pickup_location,dropoff_location,supplier_id,sipp_code,coverage_type, driver_age these are the mandatory fields.

Response:

Step 4.to add rental into package.
### ApiName:rental/addservice
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/packages/rental/addservice`
### Payload:

```json
{

    "package_availability_id":"679767bc7c9efbaafaca0509",
    "quote_ref_id":"679768567c9efbaafaca059d",
    "service_day":1,
    "service_mode":"add",
    "rental_number_of_days":2,
    "package_service_id":0
}
```


Note:
1. Taken the quote_ref_id from the single quotes api.
2. Taken the package_availability_id from package checkAvailability  api.
3. service_day and service_mode are mandatory.
4. Service_mode Must be “add “OR “edit”.
5. if service_mode is “edit” then package_service_id is required .
6. rental_number_of_days is mandatory.

Response:


Package Remove service:
### Endpoint `https://apiuat.makebookingsonline.com/api/v1/packages/removeService`
### ApiName:packages/removeService
### Payload:

```json
{

    "service_day": 1,
    "package_service_id": 1,
    "package_availability_id": "679767bc7c9efbaafaca0509"
}
```

Note:packages/removeService api is used to remove services from the package.

Response:


Add to cart:
### ApiName:packages/addToCart
### Endpoint `https://apiuat.makebookingsonline.com/api/v1/packages/addToCart`
### Payload:

```json
{

    "reference_number" : "1299",
    "reference_name" : "package add ",
    "package_id": "678ded6b76d1701e9b0254f4",
    "itinerary_id": 0,
    "package_availability_id": "678f5229ae921ced4b3ec214"
}
```


Add guest details.
### ApiName:getGuestDetails
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/common/getGuestDetails`

### Payload:

```json
{

 "booking_id": [],
 "itinerary_id": 7279
}
```

Save guest details:
### ApiName:saveGuestDetails
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/common/saveGuestDetails`

### Payload:

```json
{

  "booking_id": [6799],
  "changeover": {},
  "guest": {
    "6799": [
      {
        "salutation": "Miss",
        "name": "test",
        "surname": "testing",
        "email": "A@gmail.com",
        "phone": "+988888888"
      }
    ]
  },
  "itinerary_id": 7279
}
```

packages/confirm
### ApiName: packages/confirm
### Endpoint `https://apiuat.makebookingsonline.com/api/v1/packages/confirm`
### Payload:

```json
{
  "booking_id": [],
  "booking_reference_number": "can",
  "itinerary_id": 7279
  }
```

Download_itinerary
### ApiName:download_itinerary?itinerary_id=7279&with_image=1&type=pdf
### Endpoint: `https://apiuat.makebookingsonline.com/api/v1/booking/download_itinerary?itinerary_id=7279&with_image=1&type=pdf`
### Payload:

```json
{

  "itinerary_id": 7279,
  "with_image": 1,
  "type": "pdf"
}
```

