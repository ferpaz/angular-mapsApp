const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const targetPath = './src/environments';
const envConfigFile = `
export const environment = {
  mapbox_key: "${process.env.MAPBOX_KEY}",
};
`;

// primero creamos la carpeta environments
mkdirSync(targetPath, { recursive: true });

// ahora creamos el archivo con el contenido de la variable envConfigFile
writeFileSync(targetPath + "/environment.ts", envConfigFile);
