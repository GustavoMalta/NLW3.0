import React from 'react';
import { Link } from "react-router-dom";
import { Map, TileLayer } from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import '../styles/pages/orphanages-map.css';
import mapMarker from "../images/map-marker.svg";
import { FiPlus } from "react-icons/fi";

function OrphanagesMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="mapa"/>
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>
            Franca
          </strong>
          <span>São Paulo</span>
        </footer>
      </aside>

        <Map
          center={[-20.5185528,-47.4034215]}
          zoom={15}
          style={{width:'100%', height:'100%'}}

        >
          <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        </Map>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#fff"/>
      </Link>
    </div>
  );
}

export default OrphanagesMap;
