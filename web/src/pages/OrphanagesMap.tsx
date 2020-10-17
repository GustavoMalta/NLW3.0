import React,{ useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import '../styles/pages/orphanages-map.css';
import mapMarker from "../images/map-marker.svg";
import { FiPlus, FiArrowRight } from "react-icons/fi";

import MapIcon from  "../utils/mapIcon";
import api from "../services/api"

interface Orphanage {
  id: number
  latitude: number
  longitude: number
  name: string
}

function OrphanagesMap() {

  const [orphanages,setOrphanages] = useState<Orphanage[]>([])
  
  useEffect(()=>{
    api.get('/orphanages').then(res=>{
      setOrphanages(res.data);       
    })
  },[])


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
          center={[-20.5374829,-47.3948139]}
          zoom={14.2}
          style={{width:'100%', height:'100%'}}

        >
          <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          
        {orphanages.map(orphanage=>{
          return(
            <Marker
              key={orphanage.id}
              position={[orphanage.latitude,orphanage.longitude]}
              icon={MapIcon}
              >
              <Popup closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup">
                  {orphanage.name}
                <Link to= {`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color="#fff"/>
                </Link>
              </Popup>
            </Marker>
          )
         
        })}
        </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff"/>
      </Link>
    </div>
  );
}

export default OrphanagesMap;
