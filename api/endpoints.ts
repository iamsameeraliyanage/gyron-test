export const API_ENDPOINTS = {
  GLOBAL_CONTENT: '/global?populate[0]=navbar&populate[1]=footer',
  HOME_CONTENT:
    '/home?populate[0]=seoSection&populate[1]=videoSection&populate[2]=videoSection.video&populate[3]=models&populate[4]=models.images&populate[5]=contactUseSection&status=published',
  CONFIGURATOR_CONTENT:
    '/configurator?populate[0]=models&populate[1]=models.configurationGroups&populate[2]=models.configurationGroups.subConfigurationGroups&populate[3]=models.configurationGroups.subConfigurationGroups.models&populate[4]=models.configurationGroups.subConfigurationGroups.models.image&populate[5]=models.configurationGroups.models&populate[6]=models.configurationGroups.models.image&status=published',
  MODELS: '/models',
  MODELS_POPULATE:
    '?models?populate[0]=specification&populate[1]=specification.distance&populate[2]=specification.acceleration&populate[3]=specification.speed&populate[4]=specification.power&populate[5]=specification.lorem&populate[6]=specification.loremTwo&populate[7]=specification.loremThree&populate[8]=specification.loremFour&populate[9]=specification.loremFive&populate[10]=specification.loremSix&populate[11]=specification.loremSeven&status=published',
  MODEL_DETAIL_POPULATE:
    '?populate[0]=specification.distance&populate[1]=specification.acceleration&populate[2]=specification.speed&populate[3]=specification.power&populate[4]=specification.lorem&populate[5]=specification.loremTwo&populate[6]=specification.loremThree&populate[7]=specification.loremFour&populate[8]=specification.loremFive&populate[9]=specification.loremSix&populate[10]=specification.loremSeven&populate[11]=configurationGroups&populate[12]=configurationGroups.optionCategories&populate[13]=configurationGroups.optionCategories.options&populate[14]=configurationGroups.options&populate[15]=configurationGroups.optionCategories.options.image&populate[16]=configurationGroups.options.image&populate[17]=image&populate[18]=specs&populate[19]=heroSection&status=published',
};

export const STRAPI_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const STRAPI_VIDEO_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
