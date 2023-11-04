#!/usr/bin/node

$(document).ready(function(){
  selected_amenity={}

  $('.amenity-checkbox').change(function(){
    let id = $(this).attr('data-id');
    let name = $(this).attr('data-name');
    console.log('ID:', id, 'Name:', name);
    if ($(this).prop('checked')){
      selected_amenity[id] = name;
    }else{
      delete selected_amenity[id];
    }

    if(Object.keys(selected_amenity).length > 0){
      $('#amenities_h4').text(Object.values(selected_amenity).join(', '));
    }

  });
});
