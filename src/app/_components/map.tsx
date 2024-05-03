"use client";

import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapView() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  return (
    <div className="h-screen w-screen bg-slate-500">
      <Map
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        initialViewState={{
          latitude: 30.344688,
          longitude: -97.677875,
          zoom: 18,
        }}
      ></Map>
    </div>
  );
}
