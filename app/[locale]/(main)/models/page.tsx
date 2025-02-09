import { getModelsContent } from '@/api/services';
import ModelsHero from '../components/models/models-hero/ModelsHero';
import ModelsSection from '../components/models/models-section/ModelsSection';
import { Locale } from '@/i18n/routing';

export default async function Model({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const models = await getModelsContent(locale);

  return (
    <main className="flex flex-col flex-grow">
      <ModelsHero models={models} />
      {models.map((model, index) => {
        return <ModelsSection model={model} key={model.id} index={index} />;
      })}
    </main>
  );
}
