#!/usr/bin/node
$(document).ready(function () {
  const selectedAmenity = {};

  $('.amenity-checkbox').change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if ($(this).prop('checked')) {
      selectedAmenity[id] = name;
    } else {
      delete selectedAmenity[id];
    }

    if (Object.keys(selectedAmenity).length > 0) {
      $('#amenities_h4').text(Object.values(selectedAmenity).join(', '));
    } else if (Object.keys(selectedAmenity).length === 0) {
      $('#amenities_h4').html('&nbsp;');
    }
  });
});
