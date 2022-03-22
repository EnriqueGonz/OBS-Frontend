import React from "react";
import { MapContainer, TileLayer, MapConsumer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png"
});


const Maps = () => {

  return (
    <MapContainer
      center={[19.3834533, -99.1068009,10.28]} // MX
      zoom={6}
      style={{ height: "100%", width:"100%" }}
       whenReady={(map) => {
         map.target.on("click", function (e) {
           const { lat, lng } = e.latlng;
           L.marker([lat, lng], { icon }).addTo(map.target);
         });
       }}
    >
      
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      
      <MapConsumer>
        {(map) => {
          console.log("map center:", map.getCenter());
          map.on("click", function (e) {
            //console.log('LatLng: ', e.latlng)
            const { lat, lng } = e.latlng;
            L.marker([lat, lng], { icon }).addTo(map);
          });
          return null;
        }}
      </MapConsumer>
    </MapContainer>
  );
}

export default Maps