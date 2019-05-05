import React from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends React.Component {
    // travel modes:
    //  - driving
    //  - bicycling
    //  - transit
    //  - walking

    onReady(mapProps, map) {
        const {google} = mapProps;
        const DirectionsService = new google.maps.DirectionsService();
        const DirectionsDisplay = new google.maps.DirectionsRenderer();
        DirectionsDisplay.setMap(map);
        DirectionsDisplay.setPanel(document.getElementById('DirectionsPanel'));
        DirectionsService.route({
            origin: 'UBC',
            destination: 'SFU',
            travelMode: 'TRANSIT',
            provideRouteAlternatives: true,
            transitOptions: {
                departureTime: new Date()
            }
        }, (response, status) => {
            if (status === 'OK') {
                DirectionsDisplay.setDirections(response);
                console.log(response.routes.length);
                console.log(response.routes[0].legs[0].distance.text);
                console.log(response.routes[0].legs[0].duration.text);

                const distances = response.routes.map(route => {
                    return parseFloat(route.legs[0].distance.text.split(' ')[0], 10);
                });
                const durations = response.routes.map(route => {
                    return route.legs[0].duration.text;    
                });

                const minDistance = Math.min(...distances);
                const carbonEmissionInKg = 0.251 * minDistance;

                console.log(distances);
                console.log(durations);
                var footprintInfo = {
                    travelMode: "",
                    duration: "",
                    distance: "",
                    footprint: carbonEmissionInKg
                };
                console.log(`${footprintInfo.footprint}kg`);
                debugger;
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    // onMapClicked(mapProps, map, clickEvent){
    //     debugger;
    // }

    // centerMoved(mapProps, map) {
    //     debugger;
    // }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={{
            lat: 49.2606,
            lng: -123.2460
        }}
        onClick={this.onMapClicked}
        onReady={this.onReady}
      >
 
        {/* <Marker onClick={this.onMarkerClick}
                name={'Current location'} /> */}
 
        <InfoWindow onClose={this.onInfoWindowClose}>
        <div></div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDaV21H2rXlro4Dpob6crEO9YbqQxmvV-I'
})(MapContainer)