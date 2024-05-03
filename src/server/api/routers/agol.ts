import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { queryFeatures } from "@esri/arcgis-rest-feature-service";
import { ApplicationCredentialsManager } from "@esri/arcgis-rest-request";

import proj4 from "proj4";

// Define the projection string for SRID 2277
const SRID2277 =
  "+proj=lcc +lat_0=29.6666666666667 +lon_0=-100.333333333333 +lat_1=31.8833333333333 +lat_2=30.1166666666667 +x_0=699999.9998984 +y_0=3000000 +datum=NAD83 +units=us-ft +no_defs +type=crs";

// Register the projection with Proj4
proj4.defs("EPSG:2277", SRID2277);

export const agolRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ bbox: z.string() }))
    .query(({ input }) => {
      const options = {
        url: `https://services.arcgis.com/0L95CJ0VTaxqcmED/arcgis/rest/services/Sign_Assets_Maint_Public_View/FeatureServer/0`,
        // where: "Species = 'Oak'",
        authentication:
          "3NKHt6i2urmWtqOuugvr9UIto8Oz7hcsejBz2Sa0ourmhEbBnM3kkXiFPFRkxyEfR8-VV5eTKpCotQTJrgCyrPVw0ET6ABv2oky_J-LpMcLxX7foE0HrnwMA2VOI2VvRAOAv1Fna9xSf4rNy6Jq4G0BicgeZIgDNQJq17pj4D9y4BRyPImfIsHLgx2QyiGP3eJ4Bep6-wumqoQllDmAlI7sIOeFxmFQ76X1zLQ3XgfxQXFCNrEDHpUuqL2PL9iBdqjjgJflMBMo_nM7i2AhvcduZCNswrzJh5TPtDxGkn4LVhNj6VYGpvy-6EL2jOhTzec1Swlly5B2mJH6FaDmIQQ",
      };

      // Define your source and destination projections
      const sourceProjection = "EPSG:2277";
      const destinationProjection = "EPSG:4326";

      queryFeatures(options).then((response) => {
        const features = response.features.map((feature) => {
          const point = [feature.geometry["x"], feature.geometry["y"]];
          const reprojectedPoint = proj4(
            sourceProjection,
            destinationProjection,
            point,
          );
          return {
            ...feature.attributes,
            geometry: { x: reprojectedPoint[0], y: reprojectedPoint[1] },
          };
        });
        return features;
      });
    }),
});

// https://services.arcgis.com/0L95CJ0VTaxqcmED/arcgis/rest/services/Sign_Assets_Maint_Public_View/FeatureServer
