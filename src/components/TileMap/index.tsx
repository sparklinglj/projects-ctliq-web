import { MAP_TILE_URL } from '@/constants';
import { RasterLayer, Scene } from '@antv/l7';
import { Mapbox } from '@antv/l7-maps';
import { useEffect, useRef } from 'react';

interface TileMapProps {
  center?: [number, number];
  zoom?: number;
  minZoom?: number;
  className?: string;
  style?: React.CSSProperties;
  onLoaded?: (scene: Scene) => void;
}

export default function TileMap({
  className,
  style,
  center = [121.4316962, 31.26082325],
  zoom = 4,
  minZoom = 4,
  onLoaded,
}: TileMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const scene = new Scene({
      id: container,
      logoVisible: false,
      map: new Mapbox({
        style: 'blank',
        center,
        zoom,
        minZoom,
      }),
    });
    const tileLayer = new RasterLayer({
      zIndex: 1,
    }).source(MAP_TILE_URL, {
      parser: {
        type: 'rasterTile',
        tileSize: 256,
        zoomOffset: 0,
      },
    });

    scene.addLayer(tileLayer);

    scene.on('loaded', () => {
      onLoaded?.(scene);
    });
    return () => {
      scene.destroy();
    };
  }, []);
  return (
    <>
      <div className={className} style={style}>
        <div ref={containerRef}></div>
      </div>
    </>
  );
}
