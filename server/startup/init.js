import { Reaction, Logger } from "/server/api";
import LoadData from "./load-data";
import { Hooks } from "/server/api";
import { Products, Media } from "/lib/collections";

/*
 * Execute start up fixtures
 */

export default function () {
  // load fixture data
  LoadData();
  // initialize Reaction
  Reaction.init();
  // we've finished all reaction core initialization
  Logger.info("Reaction initialization finished.");
}

// function getTopVariant(productId) {
//   const topVariant = Products.findOne({
//     "ancestors": { $in: [productId] },
//     "ancestors.1": { $exists: false }
//   });
//   Logger.info("Inside getTopVariant " + JSON.stringify(topVariant.sku, null, 2));
//   return topVariant;
// }

// Hooks.Events.add("afterCoreInit", () => {
//   const products = Products.find({}).fetch();
//   const simpleProducts = products.filter(product => (product.type === "simple"));
//   const variantProducts = products.filter(product => (product.type === "variant"));
//   const variantBySimple = new Map();
//   const shopId = products[0].shopId;
//   simpleProducts.forEach((simpleProduct) => {
//     variantBySimple.set(simpleProduct._id, variantProducts.filter(variant => variant.ancestors.includes(simpleProduct._id)));
//   });
//   variantBySimple.forEach((variants, key) => {
//     const productId = key;
//     if (!Media.findOne({ "metadata.productId": productId })) {
//       let fileObj = undefined;
//       variants.forEach((variant) => {
//         const filepath = "data/product-images/" + variant.sku + ".jpeg";
//         let binary = undefined;
//         try {
//           Logger.info("filepath " + variant.sku + " " + filepath);
//           binary = Assets.getBinary(filepath);
//           if (!fileObj) {
//             fileObj = new FS.File();
//             const fileName = `${productId}.jpeg`;
//             fileObj.attachData(binary, { type: "image/jpeg", name: fileName });
//             fileObj.metadata = {
//               productId: productId,
//               toGrid: 1,
//               shopId: shopId,
//               priority: 0,
//               workflow: "published"
//             };
//             Media.insert(fileObj);
//           }
//           const variantFileObj = new FS.File();
//           variantFileObj.attachData(binary, { type: "image/jpeg", name: `${productId}.jpeg` });
//           variantFileObj.metadata = {
//             productId: productId,
//             variantId: variant._id,
//             toGrid: 1,
//             shopId: shopId,
//             priority: 0,
//             workflow: "published"
//           };
//           Logger.info("VariantMedia  " + JSON.stringify(variantFileObj.metadata, null, 2));
//           Media.insert(variantFileObj);
//         } catch (error) {
//           Logger.warn("image not available " +  variant.sku);
//         }
//       });
//     }
//   });
// });
