import React from "react";
import { Cacher } from "../../services/cacher";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
  InfoWindow
} from "react-google-maps";

function MapComponent(props) {
  const { coordinates, isError, isLocationLoaded } = props;
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={coordinates}
      center={coordinates}
      options={{ disableDefaultUI: isError ? true : false }}
    >
      <Circle center={coordinates} radius={500} />
      {isLocationLoaded && isError && (
        <InfoWindow position={coordinates} options={{ maxWidth: 300 }}>
          <div>
            Oups, there is problem to find location on the map, we are trying to
            resolve problem as fast as possible. Contact host for additional
            informations if you are still interested in booking this place. We
            are sorry for inconveniences.
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

function withGeocode(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.cacher = new Cacher();
      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        },
        isError: false,
        isLocationLoaded: false
      };
    }

    componentDidMount() {
      this.getGeocodeLocation();
    }
    updateCoordinates(coordinates) {
      this.setState({ isLocationLoaded: true, coordinates });

      this.setState({
        coordinates,
        isLocationLoaded: true
      });
    }
    geocodeLocation(location) {
      const geocoder = new window.google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: location }, (result, status) => {
          if (status === "OK") {
            const geometry = result[0].geometry.location;
            const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
            this.cacher.cacheValue(location, coordinates);
            resolve(coordinates);
          } else {
            reject("ERROR");
          }
        });
      });
    }
    getGeocodeLocation() {
      const location = this.props.location;

      //if location is cached returned cached value
      if (this.cacher.isValueCached(location)) {
        this.updateCoordinates(this.cacher.getCachedValue(location));
      }
      //else geocode location
      else {
        this.geocodeLocation(location).then(
          coordinates => {
            this.updateCoordinates(coordinates);
          },
          error => {
            console.log(error);
            this.setState({ isLocationLoaded: true, isError: true });
          }
        );
      }
    }

    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
}

export const MapWithAMarker = withScriptjs(
  withGoogleMap(withGeocode(MapComponent))
);
