
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Row, Col } from 'reactstrap';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: null,
      markerPosition: null,
      currentLocation: null // new state variable for the current location
    };
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  componentDidMount() {
    // get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.setState({ currentLocation });

      });
    }
  }

  onMapClicked(mapProps, map, clickEvent) {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    this.setState({
      selectedPlace: null,
      markerPosition: { lat, lng }
    });
    this.props.onLocationSelect({ lat, lng });
    // Send lat and lng to backend API to store in database
    // e.g. fetch('api/saveLocation', { method: 'POST', body: { lat, lng } });
  }

  render() {
    const { currentLocation } = this.state;
    /* const mapStyles = {
      maxWidth: 'calc(100vw - 500px)',
      maxHeight: 'calc(100vh - 700px)',
    }; */
    const mapStyles = {
      width: "100%",
      height: "100%",
    };

    return (
      <Row md={12} xs={12}>

        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{ lat: 18.7883, lng: 98.9867 }} // set initialCenter to current location or default location
          onClick={this.onMapClicked}
        >
          {this.state.markerPosition && (
            <Marker position={this.state.markerPosition} />
          )}
        </Map>


      </Row>


    );
  }
}




export default GoogleApiWrapper({
  apiKey: 'APIkey'
})(MapContainer);