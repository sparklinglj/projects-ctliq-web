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
            console.log('list: ', list);
            for (const item of list) {
              if (item.cvtMovingSite?.posLongitude && item.cvtMovingSite?.posLatitude) {
                console.log('item: ', item);

                const el = document.createElement('label');
                el.className = 'siteItem';
                el.textContent = item.movingSiteVagon;
                const marker = new Marker({
                  element: el,
                }).setLnglat({
                  lng: item.cvtMovingSite.posLongitude,
                  lat: item.cvtMovingSite.posLatitude,
                });
                scene.addMarker(marker);
              }
            }
          });
        }}
      />
    </>
  );
}
