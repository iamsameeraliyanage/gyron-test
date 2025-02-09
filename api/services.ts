/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetcher } from './client';
import { API_ENDPOINTS } from './endpoints';
import {
  GlobalContent,
  GyroSpecificationModel,
  HomePageContent,
  StrapiResponse,
} from './types';

export const getGlobalContent = async (
  locale: string
): Promise<StrapiResponse<GlobalContent>> => {
  return fetcher<StrapiResponse<GlobalContent>>(
    API_ENDPOINTS.GLOBAL_CONTENT,
    locale
  );
};

export const getHomeContent = async (
  locale: string
): Promise<StrapiResponse<HomePageContent>> => {
  return fetcher<StrapiResponse<HomePageContent>>(
    API_ENDPOINTS.HOME_CONTENT,
    locale
  );
};

export const getModelsContent = async (
  locale: string
): Promise<GyroSpecificationModel[]> => {
  const FULL_ENDPOINT = API_ENDPOINTS.MODELS + API_ENDPOINTS.MODELS_POPULATE;
  return fetcher<GyroSpecificationModel[]>(FULL_ENDPOINT, locale);
};

export const getModelDetailContent = async (
  modelSlug: string,
  locale: string
): Promise<GyroSpecificationModel> => {
  const FULL_ENDPOINT = `${API_ENDPOINTS.MODELS}/${modelSlug}${API_ENDPOINTS.MODEL_DETAIL_POPULATE}`;

  return fetcher<GyroSpecificationModel>(FULL_ENDPOINT, locale);
};
