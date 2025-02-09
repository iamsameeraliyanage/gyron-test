export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiBasics {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface GlobalContent extends StrapiBasics {
  navbar: NavBarLink[];
  footer: {
    id: number;
    name: string;
    description: string;
  };
}

export interface NavBarLink {
  id: number;
  name: string;
  link: string;
  idn: number;
}

export interface StrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    small?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Home Page Content - start
export interface GyroModel {
  id: number;
  name: string;
  description: string;
  slug: string;
  images: StrapiImage[];
}

export interface HomePageContent extends StrapiBasics {
  models: GyroModel[];
  seoSection: {
    id: number;
    name: string;
    description: string;
  };
  videoSection: {
    id: number;
    heading: string;
    video: {
      id: number;
      documentId: string;
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: string | null;
      height: string | null;
      formats: string | null;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
  contactUseSection: {
    id: number;
    location: string;
    contactNumber: string;
    email: string;
  };
}

// Home Page Content - end

// Models - Start
export interface SpecificationItem {
  key: string;
  value: string;
}

export interface SpecItem {
  category: string;
  id: number;
  name: string;
  value: string;
}

export interface Specification {
  [key: string]: SpecificationItem;
}

export interface GyroSpecificationModel extends StrapiBasics {
  name: string;
  slug: string;
  weight: number;
  partId: string;
  isDefault: boolean;
  cost: number;
  availability: string;
  publishedAt: string;
  description: string;
  specification: Specification;
  specs: SpecItem[];
  heroSection: SpecItem[];
  image: StrapiImage;
  configurationGroups: ConfigurationGroup[];
}

// Models - End

export interface ConfigurationGroup {
  order: number;
  id: number;
  category: string;
  isOptional: boolean;
  imageId: string;
  hasSubGroups: boolean;
  selectType: ConfiguratorOptionType;
  description: string;
  tooltip: string;
  visualization: ConfigurationVisualization;
  options: ConfiguratorOption[];
  optionCategories: SubConfigurationGroup[];
  fieldName?: string; // only for frontend
}

export interface SubConfigurationGroup {
  order: number;
  id: number;
  category: string;
  imageId: string;
  selectType: ConfiguratorOptionType;
  isOptional: boolean;
  visualization: ConfigurationVisualization;
  options: ConfiguratorSubModel[];
  fieldName?: string; // only for frontend
}

export interface ConfiguratorOption {
  id: number;
  name: string;
  description: string;
  weight: number;
  partId: string;
  price: number;
  isDefault: boolean;
  isDisabled: boolean;
  availability: ConfigurationModelAvailability;
  rgb: string | null;
  details: Record<string, string> | null;
  image: StrapiImage | null;
}

export interface ConfiguratorSubModel {
  id: number;
  name: string;
  description: string;
  weight: number;
  partId: string;
  price: number;
  isDefault: boolean;
  isDisabled: boolean;
  availability: ConfigurationModelAvailability;
  rgb: string | null;
  details: Record<string, string> | null;
  image: StrapiImage | null;
}

export type ConfiguratorOptionType = 'SINGLE_SELECT' | 'MULTI_SELECT';

export type ConfigurationModelAvailability = 'AVAILABLE' | 'COMING_SOON';

export enum ConfigurationVisualization {
  DEFAULT_CARD = 'DEFAULT_CARD',
  TWO_COLUMN_CARD = 'TWO_COLUMN_CARD',
  NUMBER_CARD = 'NUMBER_CARD',
  IMAGE_CARD = 'IMAGE_CARD',
  COLOR_CARD = 'COLOR_CARD',
}
