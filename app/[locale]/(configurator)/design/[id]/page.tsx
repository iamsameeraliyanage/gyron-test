import { Locale } from '@/i18n/routing';
import { getModelDetailContent } from '@/api/services';
import ConfiguratorForm from '../../components/configurator-form-body/ConfiguratorForm';

export default async function ModelDesign({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;

  const modelDetail = await getModelDetailContent(id, locale);

  // console.log(modelDetail);

  const configurationModal = modelDetail;

  if (!configurationModal) {
    return (
      <div className="bg-white h-full">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 h-full">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Coudnt find configuration details
          </h2>
        </div>
      </div>
    );
  }

  return <ConfiguratorForm configurationModal={configurationModal} />;
}
