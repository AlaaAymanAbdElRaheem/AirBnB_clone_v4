#!/usr/bin/node

$(document).ready(function(){
  selected_amenity={}

  $('.amenity-checkbox').change(function(){
    let id = $(this).attr('data-id');
    let name = $(this).attr('data-name');
    if ($(this).prop('checked')){
      selected_amenity[id] = name;
    }else{
      delete selected_amenity[id];
    }

    if(Object.keys(selected_amenity).length > 0){
      $('#amenities_h4').text(Object.values(selected_amenity).join(', '));
    }

    $.get("http://localhost:5001/api/v1/status/", function(data){
      console.log(data);
      if(data.status == 'OK'){
        $('#api_status').addClass('available');
      }else{
        $('#api_status').removeClass('available');
      }
    }).fail(function() {
      // Handle error here
      console.error('Error occurred while fetching API status.');
  });
  });
});
