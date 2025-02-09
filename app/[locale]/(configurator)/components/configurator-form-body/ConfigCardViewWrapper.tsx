import { ConfigurationVisualization } from '@/api/types';

function ConfigCardViewWrapper({
  children,
  visualization,
}: {
  children: React.ReactNode;
  visualization: ConfigurationVisualization;
}) {
  if (visualization === ConfigurationVisualization.COLOR_CARD) {
    return (
      <div
        className={`configCardViewWrapper ${visualization} flex flex-wrap gap-2`}
      >
        {children}
      </div>
    );
  }
  if (visualization === ConfigurationVisualization.TWO_COLUMN_CARD) {
    return (
      <div
        className={`configCardViewWrapper ${visualization} flex flex-wrap gap-2`}
      >
        {children}
      </div>
    );
  }
  if (visualization === ConfigurationVisualization.NUMBER_CARD) {
    return (
      <div
        className={`configCardViewWrapper ${visualization} flex flex-wrap gap-2`}
      >
        {children}
      </div>
    );
  }
  if (visualization === ConfigurationVisualization.IMAGE_CARD) {
    return (
      <div
        className={`configCardViewWrapper flex flex-col gap-2 ${visualization}`}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      className={`configCardViewWrapper flex flex-col gap-2  ${visualization}`}
    >
      {children}
    </div>
  );
}

export default ConfigCardViewWrapper;
