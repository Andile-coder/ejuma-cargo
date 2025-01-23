import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./mapContainer.css";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useSelector } from "react-redux";

const MapContainerCont = () => {
  const mapContainer = useRef(null);
  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const map = useRef(null);
  const center = { lng: 13.338414, lat: 52.507932 };
  const [zoom] = useState(12);

  const handleWarehouseAddresses = async (provider) => {
    try {
      const warehouseAddresses = await Promise.all(
        warehouses.map(async (wh) => {
          const query = `${wh.address} ${wh.town} ${wh.zip}`;
          console.log("query", query);

          if (query.trim() !== "") {
            const results = await provider.search({
              query: `${query}`,
            });

            // Return warehouse data with results
            if (results.length > 0) {
              return { warehouse: wh, lat: results[0].y, lng: results[0].x };
            }
          }
          return null; // Handle cases where no results are found
        })
      );

      // Filter out null results
      return warehouseAddresses.filter((item) => item !== null);
    } catch (error) {
      console.error("Error fetching warehouse addresses:", error);
    }
  };

  useEffect(() => {
    if (map.current) return; // Stops map from initializing more than once
    const provider = new OpenStreetMapProvider();

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">EjumaCargo</a>',
    }).addTo(map.current);

    // Fetch warehouse addresses and add markers
    handleWarehouseAddresses(provider).then((warehouseAddresses) => {
      console.log("Warehouse Addresses:", warehouseAddresses);

      warehouseAddresses.forEach((wh) => {
        const marker = L.marker([wh.lat, wh.lng])
          .addTo(map.current)
          .bindPopup(
            `<b>${wh.warehouse.ref}</b><br>${wh.warehouse.address}, ${wh.warehouse.town}`
          );

        marker.on("click", () => {
          console.log(`Marker clicked for warehouse: ${wh.warehouse.name}`);
        });
      });
    });

    const searchControl = new GeoSearchControl({
      provider: provider,
    });

    map.current.addControl(searchControl);

    map.current.on("geosearch/showlocation", (e) =>
      console.log("Location clicked:", e)
    );
  }, [center.lng, center.lat, zoom, warehouses]);

  return (
    <div className="map-cont">
      <div className="map-wrap">
        <div ref={mapContainer} className="map" />
      </div>
    </div>
  );
};

export default MapContainerCont;
