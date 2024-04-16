import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "./Map.scss";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { useToastStore } from "../../../stores/ToastStore";
import icon from "../../../assets/locationDot.svg";
import { Icon } from "leaflet";

interface Props {
    clickable: boolean;
    pinpointedLocation?: [number, number];
    setLocation?: React.Dispatch<React.SetStateAction<string>>;
}

const locationDotIcon = new Icon({
    iconUrl: icon,
    iconSize: [35, 35],
    iconAnchor: [20, 44],
});

export const MapWindow: React.FC<Props> = ({ clickable, pinpointedLocation, setLocation }) => {
    const toastSetter = useToastStore((s) => s.setToastText);
    const [position, setPosition] = useState<[number, number] | null>(pinpointedLocation ? pinpointedLocation : null);

    const MapClickHandler = () => {
        useMapEvents({
            click: async (e) => {
                const { lat, lng } = e.latlng;
                try {
                    const address = await getAddressFromCoordinates(lat, lng);
                    console.log(address);
                    setPosition([lat, lng]);
                    if (setLocation && address) {
                        setLocation(address);
                    }
                } catch (error) {
                    toastSetter(error as string);
                }
            },
        });

        return null;
    };

    const getAddressFromCoordinates = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lng}.json?key=g4D7xZDXlt86vi45gqeiaTafQrpzMEcz&radius=100&language=en-US`
            );

            const data = (await response.json()).addresses[0].address;

            const address = `${data.street ? data.street + " " : ""}${data.streetNumber ? data.streetNumber + " " : ""}${data.localName} ${
                data.country
            }`;
            if (address.includes("undefined")) {
                throw ("Location isn't a valid address");
            } else {
                return address;
            }
        } 
        catch (error) {
            throw ("Location isn't a valid address");
        }
    };

    return (
        <div className="map-container">
            <MapContainer center={[42.6977, 23.3219]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {position && <Marker icon={locationDotIcon} position={position} />}
                {clickable && <MapClickHandler />}
            </MapContainer>
        </div>
    );
};
