import { Locale } from '@/i18n/routing';
import React from 'react';
import ModelDetailHeroSection from '../../components/model-details/hero/model-details-hero/ModelDetailHeroSection';
import { getModelDetailContent } from '@/api/services';
import ModelSpecifications from '../../components/model-details/model-specifications/ModelSpecifications';
import ModelOverview from '../../components/model-details/model-overview/ModelOverview';

interface PageProps {
  params: Promise<{ id: string; locale: Locale }>;
}

export default async function ModelDesign({ params }: PageProps) {
  const { id } = await params;
  const { locale } = await params;

  const modelDetail = await getModelDetailContent(id, locale);

  return (
    <main className="flex flex-col flex-grow">
      <ModelDetailHeroSection modelDetail={modelDetail} />
      <ModelSpecifications modelDetail={modelDetail} />
      <ModelOverview modelDetail={modelDetail} />
    </main>
  );
}
