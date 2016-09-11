export function geoFindMe() {
  function success(position) {
    var latitude  = position.coords.latitude
    var longitude = position.coords.longitude
  }

  function error() {
    console.log('Unable to retrieve your location')
  }

  navigator.geolocation.getCurrentPosition(success, error)
}
