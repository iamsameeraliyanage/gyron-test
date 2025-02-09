const ConfigurationViewWrapper = ({
  children,
  title,
  isOptional,
}: {
  children: React.ReactNode;
  title: string;
  isOptional?: boolean;
}) => {
  return (
    <div className="flex flex-col ">
      <div className="flex gap-2 mb-4 items-center">
        <h3 className="text-md font-medium capitalize">{title}</h3>
        <h6 className="text-sm font-light text-slate-400">
          ({isOptional ? 'Optional' : 'Required'})
        </h6>
      </div>

      <div className="bg-white p-4 shadow-md rounded-lg">{children}</div>
    </div>
  );
};

export default ConfigurationViewWrapper;
