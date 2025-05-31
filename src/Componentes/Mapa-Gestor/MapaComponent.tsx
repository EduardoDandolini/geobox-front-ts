interface MapContainerProps {
  children: React.ReactNode;
}

export default function MapContainer({ children }: MapContainerProps) {
  return (
    <div className="map-wrapper">
      {children}
    </div>
  );
}
