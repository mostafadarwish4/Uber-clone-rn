export function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  const time=d/100;
  const [min,hours]=[time.toFixed(2).toString().split('.')[1],Math.round(time.toFixed(2))]
  //console.log(min,hours)
  return({
      distance:{
          text:`${(d*0.621371).toFixed(2)} mils`,
          value:Math.round(d)
      },
      duration:{
          value:time.toFixed(2),
          text:`${hours}hours and ${Math.round(min*.6)}mins`
        
      }
  })
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}