import React from 'react';
import { Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends React.Component {
    // travel modes:
    //  - driving
    //  - bicycling
    //  - transit
    //  - walking

    onMapClicked(mapProps) {
        const { google } = mapProps;
        const origin = this.props.origin;
        const destination = this.props.destination;
        const DirectionsService = new google.maps.DirectionsService();
        const DirectionsDisplay = this.directionsDisplay;
    
        var footprintPromises = [
            getFootprint('TRANSIT'),
            getFootprint('DRIVING'),
            getFootprint('WALKING'),
            getFootprint('BICYCLING')
        ];

        Promise.all(footprintPromises)
            .then((arr) => {
                console.log(arr);

                var footprints = arr.reduce((acc, curr) => {
                    acc[curr.travelMode] = curr;
                    return acc;
                }, {});

                var bestRoute = footprints['DRIVING'];

                // if walking to feasible
                if (footprints['WALKING'].duration < 30) {
                    bestRoute = footprints['WALKING'];
                } else {
                    if (footprints['BICYCLING'].duration < 45) {
                        bestRoute = footprints['BICYCLING'];
                    } else {
                        if ((footprints['TRANSIT'].footprint <= footprints['DRIVING'].footprint)
                        && ((footprints['TRANSIT'].duration - footprints['DRIVING'].duration) < 30)) {
                            bestRoute = footprints['TRANSIT'];
                        }
                    }
                }

                console.log(bestRoute);
                DirectionsDisplay.setDirections(bestRoute.response);
                window.alert(`${bestRoute.travelMode}: footprint: ${bestRoute.footprint}kg`);
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
                            var hours = parseFloat((route.legs[0].duration.text.match(/[\d]+ hour/) || [0])[0], 10);

                            var minutes = parseFloat((route.legs[0].duration.text.match(/[\d]+ min/) || [0])[0], 10);

                            var total = hours * 60 + minutes;
                            return total;
                        });

                        const minDistance = Math.min(...distances);
                        const minDuration = Math.min(...durations);
                        var carbonEmissionInKg;

                        switch (travelMode) {
                            case 'DRIVING':
                                carbonEmissionInKg = 0.251 * minDistance;
                                break;
                            case 'TRANSIT':
                                carbonEmissionInKg = 0.129 * minDistance;
                                break;
                            default:
                                carbonEmissionInKg = 0;
                                break;
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

    onReady(mapProps, map) {
        // const origin = this.props.origin;
        // const destination = this.props.destination;
        const { google } = mapProps;
        // const DirectionsService = new google.maps.DirectionsService();
        const DirectionsDisplay = new google.maps.DirectionsRenderer();
        DirectionsDisplay.setMap(map);
        DirectionsDisplay.setPanel(document.getElementById('DirectionsPanel'));

        this['directionsDisplay'] = DirectionsDisplay;

        // var footprintPromises = [
        //     getFootprint('TRANSIT'),
        //     getFootprint('DRIVING'),
        //     getFootprint('WALKING'),
        //     getFootprint('BICYCLING')
        // ];

        // Promise.all(footprintPromises)
        //     .then((arr) => {
        //         console.log(arr);

        //         var footprints = arr.reduce((acc, curr) => {
        //             acc[curr.travelMode] = curr;
        //             return acc;
        //         }, {});

        //         var bestRoute = footprints['DRIVING'];

        //         // if walking to feasible
        //         if (footprints['WALKING'].duration < 30) {
        //             bestRoute = footprints['WALKING'];
        //         } else {
        //             if (footprints['BICYCLING'].duration < 45) {
        //                 bestRoute = footprints['BICYCLING'];
        //             } else {
        //                 if ((footprints['TRANSIT'].footprint <= footprints['DRIVING'].footprint)
        //                 && ((footprints['TRANSIT'].duration - footprints['DRIVING'].duration) < 30)) {
        //                     bestRoute = footprints['TRANSIT'];
        //                 }
        //             }
        //         }

        //         console.log(bestRoute);
        //         DirectionsDisplay.setDirections(bestRoute.response);
        //         // window.alert(`${bestRoute.travelMode}: footprint: ${bestRoute.footprint}kg`);
        //     });

        // function getFootprint(travelMode) {
        //     return new Promise((resolve, reject) => {

        //         DirectionsService.route({
        //             origin: origin,
        //             destination: destination,
        //             travelMode: travelMode,
        //             provideRouteAlternatives: true,
        //             transitOptions: {
        //                 departureTime: new Date()
        //             }
        //         }, (response, status) => {
        //             if (status === 'OK') {
        //                 const distances = response.routes.map(route => {
        //                     return parseFloat(route.legs[0].distance.text.split(' ')[0], 10);
        //                 });
        //                 const durations = response.routes.map(route => {
        //                     var hours = parseFloat((route.legs[0].duration.text.match(/[\d]+ hour/) || [0])[0], 10);

        //                     var minutes = parseFloat((route.legs[0].duration.text.match(/[\d]+ min/) || [0])[0], 10);

        //                     var total = hours * 60 + minutes;
        //                     return total;
        //                 });

        //                 const minDistance = Math.min(...distances);
        //                 const minDuration = Math.min(...durations);
        //                 var carbonEmissionInKg;

        //                 switch (travelMode) {
        //                     case 'DRIVING':
        //                         carbonEmissionInKg = 0.251 * minDistance;
        //                         break;
        //                     case 'TRANSIT':
        //                         carbonEmissionInKg = 0.129 * minDistance;
        //                         break;
        //                     default:
        //                         carbonEmissionInKg = 0;
        //                         break;
        //                 }

        //                 var footprintInfo = {
        //                     travelMode: travelMode,
        //                     duration: minDuration,
        //                     distance: minDistance,
        //                     footprint: carbonEmissionInKg,
        //                     response: response
        //                 };
        //                 resolve(footprintInfo);
        //             } else {
        //                 window.alert('Directions request failed due to ' + status);
        //                 reject('Directions request failed due to ' + status);
        //             }
        //         });
        //     })
        // }
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
                onClick={this.onMapClicked.bind(this)}
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