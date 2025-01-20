document.addEventListener('DOMContentLoaded', function(){

//think about to test cases and make correction where necessary
  document.querySelector("button").addEventListener('click', getIPLocation)

  async function getIPLocation(){
    const ipInput = document.querySelector("input").value.trim()
    document.querySelector("input").classList.toggle("disabled")
    const enter = document.querySelector("#enter")
    enter.src = "images/icons8-loading.gif"

    const api_token = "770516ba25bc96"

    if (ipInput.length != 0){
     try{
      const response = await fetch(`https://ipinfo.io/${ipInput}?token=${api_token}`)
      if (!response.ok){
        throw new Error(`API Error: ${response.status} \n
          There might be an issue with your IP address`)
      }else{
      const stream =  await response.text()
      const data = JSON.parse(stream)
      
      if (data.loc != undefined){
        const [lat, lng] = data.loc.split(",").map((coord) => parseFloat(coord))
        map.panTo([lat, lng]);
        marker.setLatLng([lat, lng]);
        marker.bindPopup(`${lat}, ${lng}`).openPopup();
         //injecting some values into the main html file
      
          (document.querySelector('#ip')).textContent = data.ip;
          (document.querySelector('#loc')).textContent = data.country;
          (document.querySelector('#post')).textContent = data.postal;
          (document.querySelector('#zone')).textContent = data.timezone
      }else{
        alert("No location data available for this IP.")
      }
      }
     } catch (err){
      alert("There might be an issue with this IP Address")
      console.log(`ERROR:${err} \nThere might be an issue with your IP address or your internet connection`);
     }finally{
       document.querySelector("input").classList.toggle("disabled");
        enter.src = "images/icon-arrow.svg"
     }}
  }
    

    const map = L.map('map').setView([9.0820, 8.6753], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

    const marker = L.marker([9.0820, 8.6753]).addTo(map);

    //was messing around with the geolocation API but I don't think we need it again

//     if (navigator.geolocation){
//     navigator.geolocation.getCurrentPosition((coordinates)=>{
//     const abb = coordinates.coords
//     const lat = abb.latitude
//     const long = abb.longitude
    
//     map.panTo([lat, long]);
//     marker.setLatLng([lat, long]);
//     marker.bindPopup(`${lat}, ${long}`).openPopup();
    
//   },
//   (err)=>{
//     alert("You have restricted access to your location. \nCheck your permissions settings to change this.")
//     console.warn(`Geolocation error ${err.code} : ${err.message}`)
//   }, {timeout: 1000}
// )
// }
  }

// The next will be tracking down IPs then adding 3d functionality to the map
)