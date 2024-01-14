$(document).ready(function () {
  const apiUrl = 'http://0.0.0.0:5001/api/v1/status/';
  const placesApiUrl = 'http://0.0.0.0:5001/api/v1/places_search/';

  function updatedApiStatus () {
    $.get(apiUrl, function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

  function displayPlaces (places) {
    const placesSection = $('section.places');
    placesSection.empty();

    places.forEach(function (place) {
      const article = $('<article>');
      article.append('<div class="price_by_night">$' + place.price_by_night + '</div>');
      article.append('<h2>' + place.name + '</h2>');
      article.append('<div class="information"><div class="max_guest">' + place.max_guest + ' guest</div><div class="number_rooms">' + place.number_rooms + ' Rooms</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathrooms</div></div>');
      article.append('<div class="description">' + place.description + '</div>');
      placesSection.append(article);
    });
  }

  function fetchPlaces (amenities) {
    $.ajax({
      type: 'POST',
      url: placesApiUrl,
      contentType: 'application/json',
      data: JSON.stringify({ amenities }),
      success: function (data) {
        displayPlaces(data);
      }
    });
  }

  updatedApiStatus();
  fetchPlaces([]);

  setInterval(updatedApiStatus, 5000);

  setInterval(function () {
    const checkedAmenities = $('input[type="checkbox"]:checked').map(function () {
      return $(this).data('id');
    }).get();
    fetchPlaces(checkedAmenities);
  }, 30000);

  $('button').click(function () {
    const checkedAmenities = $('input[type="checkbox"]:checked').map(function () {
      return $(this).data('id');
    });
    fetchPlaces(checkedAmenities);
  });
});
