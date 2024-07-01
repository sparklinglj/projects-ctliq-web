import TileMap from '@/components/TileMap';
import { Marker } from '@antv/l7';
import { getListApi as getCarListApi } from '../car/module';
import { getListApi as getSiteListApi } from '../site/module';
import styles from './index.module.less';

const POSITION_MARKER = `<svg display="block" height="48px" width="48px" viewBox="0 0 1024 1024"><path d="M512 490.666667C453.12 490.666667 405.333333 442.88 405.333333 384 405.333333 325.12 453.12 277.333333 512 277.333333 570.88 277.333333 618.666667 325.12 618.666667 384 618.666667 442.88 570.88 490.666667 512 490.666667M512 85.333333C346.88 85.333333 213.333333 218.88 213.333333 384 213.333333 608 512 938.666667 512 938.666667 512 938.666667 810.666667 608 810.666667 384 810.666667 218.88 677.12 85.333333 512 85.333333Z" fill="#5B8FF9"></path></svg>`;

export default function MapPage() {
  return (
    <>
      <TileMap
        className={styles.mapContainer}
        zoom={11}
        minZoom={9}
        onLoaded={(scene) => {
          getSiteListApi().then((res) => {
            const list = res.data.data.records;
            for (const item of list) {
              const el = document.createElement('div');
              el.innerHTML = `${POSITION_MARKER}<div class="text">${item.fixedSiteName}</div>`;
              el.className = 'siteItem';

              const marker = new Marker({ element: el }).setLnglat({
                lng: item.fixedSiteLongitude,
                lat: item.fixedSiteLatitude,
              });

              scene.addMarker(marker);
            }
            const z = list.find((l) => l.fixedSiteLongitude && l.fixedSiteLatitude);
            if (z) {
              scene.setCenter([z.fixedSiteLongitude, z.fixedSiteLatitude]);
            }
            // const circleLayer = new BaseLayer({
            //   shape: 'circle',
            //   zIndex: 2,
            // })
            //   .source(
            //     list.filter((l) => l.fixedSiteLongitude && l.fixedSiteLatitude),
            //     {
            //       parser: {
            //         type: 'json',
            //         x: 'fixedSiteLongitude',
            //         y: 'fixedSiteLatitude',
            //       },
            //     },
            //   )
            //   .color('red')
            //   .style({
            //     opacity: 0.6,
            //     strokeWidth: 3,
            //   })
            //   .size(3000);
            // scene.addLayer(circleLayer);
          });
          getCarListApi().then((res) => {
            const list = res.data.data.records;
            for (const item of list) {
              if (item.cvtMovingSite?.posLongitude && item.cvtMovingSite?.posLatitude) {
                const el = document.createElement('label');
                el.className = 'carItem';
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
