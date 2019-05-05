import React from 'react';
import { Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends React.Component {
    // travel modes:
    //  - driving
    //  - bicycling
    //  - transit
    //  - walking

    onReady(mapProps, map) {
        const origin = this.props.origin;
        const destination = this.props.destination;
        const { google } = mapProps;
        const DirectionsService = new google.maps.DirectionsService();
        const DirectionsDisplay = new google.maps.DirectionsRenderer();
        DirectionsDisplay.setMap(map);
        DirectionsDisplay.setPanel(document.getElementById('DirectionsPanel'));

        var transitPromise = getFootprint('TRANSIT');
        var drivingPromise = getFootprint('DRIVING');

        Promise.all([transitPromise, drivingPromise])
        .then((arr) => {
            console.log(arr);
            var bestRoute = arr.reduce((acc, curr, idx, self) => {
                if ((typeof acc.footprint === 'undefined') || (curr.footprint < acc.footprint)) {
                    return {footprint: curr.footprint, response: curr.response};
                } else {
                    return acc;
                }
            }, {footprint: undefined, response: {}});
            console.log(bestRoute);
            DirectionsDisplay.setDirections(bestRoute.response);
        });

        function getFootprint(travelMode) {
            return new Promise((resolve, reject) => {

                DirectionsService.route({
                    origin: origin,
                    destination: destination,
                    travelMode: travelMode,
                    provideRouteAlternatives: true,
                    transitOptions: {
                        departureTime: new Date()
                    }
                }, (response, status) => {
                    if (status === 'OK') {
                        const distances = response.routes.map(route => {
                            return parseFloat(route.legs[0].distance.text.split(' ')[0], 10);
                        });
                        const durations = response.routes.map(route => {
                            var hours = parseFloat((route.legs[0].duration.text.match(/[\d]+ hours/) || [0])[0], 10);
                            
                            var minutes = parseFloat((route.legs[0].duration.text.match(/[\d]+ mins/) || [0])[0], 10);
                            
                            var total = hours*60 + minutes;
                            return total;
                        });

                        const minDistance = Math.min(...distances);
                        const minDuration = Math.min(...durations);
                        var carbonEmissionInKg;
                        if (travelMode === 'DRIVING') {
                            carbonEmissionInKg = 0.251 * minDistance;
                        } else {
                            // TRANSIT
                            carbonEmissionInKg = 0.200 * minDistance;
                        }

                        var footprintInfo = {
                            travelMode: travelMode,
                            duration: minDuration,
                            distance: minDistance,
                            footprint: carbonEmissionInKg,
                            response: response
                        };
                        resolve(footprintInfo);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                        reject('Directions request failed due to ' + status);
                    }
                });
            })
        }
    }

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
                onReady={this.onReady.bind(this)}
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