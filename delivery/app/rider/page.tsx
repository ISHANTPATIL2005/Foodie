"use client";

import { useEffect, useRef, useState } from "react";

export default function RiderPage() {
  const wsRef = useRef<WebSocket | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const [status, setStatus] = useState("Idle");

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("🟢 Connected to WebSocket");
      setStatus("Connected");
    };

    ws.onclose = () => {
      console.log("🔴 WebSocket disconnected");
      setStatus("Disconnected");
    };

    return () => {
      ws.close();
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const startSendingLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setStatus("Sending location...");

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const data = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now()
        };

        wsRef.current?.send(JSON.stringify(data));
        console.log("📍 Sent:", data);
      },
      (error) => {
        console.error("GPS error:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🚴 Rider App</h1>

      <p>Status: <b>{status}</b></p>

      <button
        onClick={startSendingLocation}
        style={{
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        Start Sending Location
      </button>
    </div>
  );
}
