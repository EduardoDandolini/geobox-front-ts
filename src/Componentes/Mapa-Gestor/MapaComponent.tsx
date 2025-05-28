interface MapContainerProps {
  children: React.ReactNode;
}

export default function MapContainer({ children }: MapContainerProps) {
  return (
    <div className="map-container-wrapper">
      {children}
    </div>
  );
}
