import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'esri-leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import 'leaflet.locatecontrol';
import 'leaflet-defaulticon-compatibility';
function onClick(e, map) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng.lat}&lon=${e.latlng.lng}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data !== null) {
                L.popup()
                    .setLatLng(e.latlng)
                    .setContent(`<h1>${data.name}</h1><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="weather-icon"/><h2>${data.main.temp}&degC</h2>`)
                    .openOn(map);
            }
        });


}
class Map extends React.Component {
    componentDidMount() {
        this.touchPos = null;
        this.map = L.map('map').setView([20, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        const searchControl = new ELG.Geosearch().addTo(this.map);
        const results = new L.LayerGroup().addTo(this.map);

        searchControl.on('results', function (data) {
            results.clearLayers();
            for (let i = data.results.length - 1; i >= 0; i--) {
                results.addLayer(L.marker(data.results[i].latlng));
            }
        });
        this.marker = this.touchPos === null ? null : this.touchPos;
        L.control.locate({ flyTo: true, cacheLocation: true, strings: {}, showPopup: false }).addTo(this.map);

        this.map.on('click', (e) => {
            onClick(e, this.map);
        });
    }
    componentDidUpdate({ markerPosition }) {
        if (this.touchPos !== markerPosition) {
            this.marker.setLatLng(this.this.touchPos);
        }
    }
    render() {
        return <div id="map"></div>
    }
}

export default Map;