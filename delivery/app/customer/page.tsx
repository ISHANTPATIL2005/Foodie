"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

type Location = {
  lat: number;
  lng: number;
};

const containerStyle = {
  width: "100%",
  height: "500px"
};

const defaultCenter = {
  lat: 19.0760,   // Mumbai default
  lng: 72.8777
};

export default function CustomerPage() {
  const wsRef = useRef<WebSocket | null>(null);
  const [location, setLocation] = useState<Location | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!
  });

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLocation({ lat: data.lat, lng: data.lng });
    };

    return () => ws.close();
  }, []);

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>📦 Live Delivery Tracking</h1>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location || defaultCenter}
        zoom={15}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
    </div>
  );
}
