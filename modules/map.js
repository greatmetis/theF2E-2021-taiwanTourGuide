let mapData =[];
export function addGeoData(){
    scenicSpotData.forEach(i=>{
        let tempGeoData = {}
        tempGeoData.lat = i.Position.PositionLat
        tempGeoData.lon = i.Position.PositionLon
        tempGeoData.name=i.Name
        mapData.push(tempGeoData)
        return mapData
    })
    console.log(mapData)
}
export function get_leaflet(){
    let map = new L.Map('map', {
    preferCanvas:true,
    center: [mapData[0].lat,mapData[0].lon],
    zoom: 15,
    zoomSnap:0.25,
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    // add markers for each card
    for(var i =0;i<mapData.length;i++){
    let tempMark = L.marker([mapData[i].lat,mapData[i].lon]).addTo(map).bindPopup(`${mapData[i].name}`);
    }
}
