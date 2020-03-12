import React, { Component } from "react";
import { MapWithAMarker } from "../GoogleMap/GoogleMap";

class RentalMap extends Component {
  render() {
    const { location } = this.props;

    return (
      <div>
        <MapWithAMarker
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCUedWvtn21AhooPEll1tYtm6F3LZzufYc&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `360px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          location={location}
        />
      </div>
    );
  }
}

export default RentalMap;
