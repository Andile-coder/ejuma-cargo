import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "./mapContainer.css";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useSelector } from "react-redux";

const MapContainerCont = () => {
  const mapContainer = useRef(null);
  const map = useRef(null); // Map reference
  const userMarkerRef = useRef(null); // Reference for user location marker
  const warehouseMarkersRef = useRef([]); // Reference for warehouse markers
  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const userLocation = useSelector((state) => state.common?.userLocation);
  const center = { lng: 13.338414, lat: 52.507932 };
  const zoom = 12;

  const handleWarehouseMarkers = async (provider) => {
    try {
      const warehouseAddresses = await Promise.all(
        warehouses.map(async (wh) => {
          const query = `${wh.address} ${wh.town} ${wh.zip}`;
          console.log("Querying warehouse:", query);

          if (query.trim() !== "") {
            const results = await provider.search({ query });
            if (results.length > 0) {
              return { warehouse: wh, lat: results[0].y, lng: results[0].x };
            }
          }
          return null; // Handle no results
        })
      );

      // Filter valid results
      const validAddresses = warehouseAddresses.filter((addr) => addr !== null);

      // Clear existing markers
      warehouseMarkersRef.current.forEach((marker) =>
        map.current.removeLayer(marker)
      );
      warehouseMarkersRef.current = [];

      // Add new warehouse markers
      validAddresses.forEach((wh) => {
        const marker = L.marker([wh.lat, wh.lng])
          .addTo(map.current)
          .bindPopup(
            `<b>${wh.warehouse.ref}</b><br>${wh.warehouse.address}, ${wh.warehouse.town}`
          );

        marker.on("click", () => {
          console.log(`Warehouse marker clicked: ${wh.warehouse.name}`);
        });

        warehouseMarkersRef.current.push(marker); // Track the marker
      });
    } catch (error) {
      console.error("Error handling warehouse markers:", error);
    }
  };

  const handleUserMarker = () => {
    if (userLocation && userLocation.length > 0) {
      console.log("User location:", userLocation);

      // Remove the previous user marker if it exists
      if (userMarkerRef.current) {
        map.current.removeLayer(userMarkerRef.current);
      }

      // Add new user marker
      userMarkerRef.current = L.marker(userLocation)
        .addTo(map.current)
        .bindPopup("You are here!");
      userMarkerRef.current.openPopup();

      // Center the map on the user's location
      map.current.setView(userLocation, 14);
    }
  };

  useEffect(() => {
    if (map.current) return; // Prevent multiple map initializations

    const provider = new OpenStreetMapProvider();

    // Initialize map
    map.current = L.map(mapContainer.current, {
      center: [center.lat, center.lng],
      zoom: zoom,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">EjumaCargo</a>',
    }).addTo(map.current);

    // Add search control
    const searchControl = new GeoSearchControl({ provider });
    map.current.addControl(searchControl);

    map.current.on("geosearch/showlocation", (e) =>
      console.log("Search location selected:", e.location)
    );

    // Add warehouse markers initially
    handleWarehouseMarkers(provider);

    // Add user marker initially
    handleUserMarker();
  }, [center.lat, center.lng, zoom]);

  // Refresh warehouse markers whenever warehouses data changes
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    handleWarehouseMarkers(provider);
  }, [warehouses]);

  // Refresh user marker whenever user location changes
  useEffect(() => {
    handleUserMarker();
  }, [userLocation]);

  return (
    <div className="map-cont">
      <div className="map-wrap">
        <div ref={mapContainer} className="map" />
      </div>
    </div>
  );
};

export default MapContainerCont;
