import { HiOutlineInformationCircle } from 'react-icons/hi';
function SubConfigViewParentWrapper({
  title,
  tooltip,
  children,
}: {
  title: string;
  tooltip?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center mb-4" title={tooltip}>
        <h2 className="text-lg font-bold  text-gray-600">{title}</h2>
        {tooltip && (
          <div className="text-gray-600">
            <HiOutlineInformationCircle />
          </div>
        )}
      </div>

      <div className="flex flex-col">{children}</div>
    </div>
  );
}

export default SubConfigViewParentWrapper;
