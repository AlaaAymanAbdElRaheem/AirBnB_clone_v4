#!/usr/bin/node

$(document).ready(function () {
  const url = 'http://localhost:5001/api/v1/status/';
  $.get(url, function (response) {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  }).fail(function () {
    // Handle error here
    console.error('Error occurred while fetching API status.');
  }
  );

  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: addPlaces
  });

  // states and cities check
  const states = {};
  $('.states_checkbox').change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if ($(this).prop('checked')) {
      states[id] = name;
    } else {
      delete states[id];
    }
    updateLocationsUI();
  });

  const cities = {};
  $('.cities_checkbox').change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if ($(this).prop('checked')) {
      cities[id] = name;
    } else {
      delete cities[id];
    }
    updateLocationsUI();
  });

  function updateLocationsUI () {
    const stateCities = Object.assign({}, states, cities); // Create a new object to avoid modifying states and cities directly

    if (Object.keys(stateCities).length === 0) {
      $('.locations h4').html('&nbsp;');
    } else {
      $('.locations h4').text(Object.values(stateCities).join(', '));
    }
  }

  const selectAmenity = {};
  $('.amenity-checkbox').change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if ($(this).prop('checked')) {
      selectAmenity[id] = name;
    } else {
      delete selectAmenity[id];
    }

    if (Object.keys(selectAmenity).length >= 0) {
      $('#amenities_h4').text(Object.values(selectAmenity).join(', '));
    }

    const url = 'http://localhost:5001/api/v1/status/';
    $.get(url, function (response) {
      if (response.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    }).fail(function () {
      // Handle error here
      console.error('Error occurred while fetching API status.');
    });
  });

  // search button
  $('button').click(function () {
    const amenityList = Object.keys(selectAmenity);
    const stateList = Object.keys(states);
    const cityList = Object.keys(cities);
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify({
        amenities: amenityList,
        states: stateList,
        cities: cityList
      }),
      contentType: 'application/json',
      dataType: 'json',
      success: addPlaces
    });
  });
});

function addPlaces (data) {
  $('SECTION.places').empty();
  $('SECTION.places').append(data.map(place => {
    return `<article>
    <div class="title_box">
      <h2>${place.name}</h2>
      <div class="price_by_night">
        ${place.price_by_night}
      </div>
    </div>
    <div class="information">
      <div class="max_guest">
        <i class="fa fa-users fa-3x" aria-hidden="true"></i>
        <br />
        ${place.max_guest} Guests
      </div>
      <div class="number_rooms">
        <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
        <br />
        ${place.number_rooms} Bedrooms
      </div>
      <div class="number_bathrooms">
        <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
        <br />
        ${place.number_bathrooms} Bathroom
      </div>
    </div>
    <div class="description">
      ${place.description}
    </div>
  </article>`;
  }));
}
