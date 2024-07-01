import TileMap from '@/components/TileMap';
import { Marker } from '@antv/l7';
import styles from './index.module.less';
import { getListApi } from './module';

export default function MapPage() {
  return (
    <>
      <TileMap
        className={styles.mapContainer}
        onLoaded={(scene) => {
          getListApi().then((res) => {
            const list = res.data.data.records;
            for (const item of list) {
              const el = document.createElement('label');
              el.className = 'siteItem';
              el.textContent = item.fixedSiteName;
              const marker = new Marker({
                element: el,
              }).setLnglat({ lng: item.fixedSiteLongitude, lat: item.fixedSiteLatitude });
              scene.addMarker(marker);
            }
          });
        }}
      />
    </>
  );
}
