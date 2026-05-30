import heroImg from '../src/assets/transformer-voltage-main.jpg'
import transformerQualityImg from '../src/assets/Transformer_Quality.jpeg'
import electric3DTransformerImg from '../src/assets/Electric_3D_Transformer.jpeg'
import distributionImg from '../src/assets/Cinematic_close-up.jpeg'
import lineImg from '../src/assets/Line.jpg'
import solarImg from '../src/assets/Solar.jpg'
import solarPanelImg from '../src/assets/SolarPanel.jpg'
import qualityLabImg from '../src/assets/qualityLab.jpg'
import industrialImg from '../src/assets/Industrial.jpg'
import commercialImg from '../src/assets/Commercial.jpeg'
import logoImg from '../src/assets/Logo.jpg'
import adobeImg from '../src/assets/Ultra-cinematic_aerial_view.jpeg'
import ultraCinematicImg from '../src/assets/Ultra-cinematic_aerial_view.jpeg'

// New Canva-generated images
import factoryInteriorImg from '../src/assets/Cinematic_close-up_of_a_large.jpeg'
import qualityTestingImg from '../src/assets/quality-testing.jpg'
import aerialSubstationImg from '../src/assets/aerial-substation.jpg'
import copperWindingsImg from '../src/assets/Coils_image.png'
import solarFarmImg from '../src/assets/SOLAR_Image.png'
import htTowerImg from '../src/assets/ht-tower.jpg'

export const seedImages = {
  // Core
  hero: heroImg,
  logo: logoImg,

  // Products
  productYard: distributionImg,
  productDryType: lineImg,
  productSpecial: adobeImg,

  // Quality
  qualityLab: qualityTestingImg,
  qualityInspection: copperWindingsImg,
  qualityDocs: qualityLabImg,

  // Solar
  solarPanel: solarFarmImg,
  solarPanelOriginal: solarPanelImg,

  // Industries
  industriesGrid: aerialSubstationImg,
  industriesRenewable: solarFarmImg,
  industriesIndustrial: industrialImg,
  industriesInfra: commercialImg,

  // Services & Factory
  servicesTechnician: htTowerImg,
  factoryHistoric: adobeImg,
  factoryInterior: factoryInteriorImg,
  rdTeam: copperWindingsImg,
  warehouse: distributionImg,

  // Pages
  careersHero: factoryInteriorImg,
  contactMap: aerialSubstationImg,

  // 3D render
  electric3DTransformer: electric3DTransformerImg,
  transformerQuality: transformerQualityImg,

  // Video (placeholder)
  productLoop: {
    mp4: '',
    webp: '',
  },
}
