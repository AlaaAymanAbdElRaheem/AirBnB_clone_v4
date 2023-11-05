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
});
