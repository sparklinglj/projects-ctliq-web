const http = require('http');
const fs = require('fs');
const path = require('path');

http
  .get(`http://10.0.0.99:8500/v3/api-docs`, (response) => {
    let dataStr = '';

    response.on('data', (chunk) => {
      dataStr += chunk;
    });

    response.on('end', () => {
      console.log('dataStr: ', dataStr);
      const data = JSON.parse(dataStr);
      console.log('data: ', data);
      const res = Object.entries(data.paths).map(([key, value]) => {
        return {
          url: key,
          key: key
            .replace(/\/api\//, '')
            .replace(/\//g, '_')
            .toLocaleUpperCase(),
          label: value.post.summary,
        };
      });
      console.log('res: ', res);

      const codeResult = [];
      const mapResult = [];
      res.forEach((item) => {
        codeResult.push(`${item.key}: "${item.url}"`);
        mapResult.push(`[PERMISSION_CODE.${item.key}]: { label: "${item.label}"}`);
      });
      template(codeResult.join(), mapResult.join());
      // console.log(data.data);
    });
  })
  .on('error', (error) => {
    console.log('Error: ' + error.message);
  });

function template(codeResult, mapResult) {
  const result = `export const PERMISSION_CODE = {
${codeResult}} as const;
  
export const PERMISSION_MAP = {
${mapResult}} as const;
`;

  console.log(result);
  fs.writeFileSync(path.join(__dirname, '../src/pages/adminRole/module/codes.ts'), result);
}
