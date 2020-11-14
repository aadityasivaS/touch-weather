import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'esri-leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import * as locate from 'leaflet.locatecontrol';
import 'leaflet-defaulticon-compatibility';
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
        L.control.locate().addTo(this.map);
        this.marker = this.touchPos === null ? null : this.touchPos;
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