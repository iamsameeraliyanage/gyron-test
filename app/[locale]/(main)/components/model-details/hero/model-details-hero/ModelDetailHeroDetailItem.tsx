const ModelDetailHeroItem = ({
  mainText,
  subText,
}: {
  mainText: string;
  subText: string;
}) => {
  return (
    <div className="flex flex-col lg:items-center">
      <div>
        <h6 className="text-xl md:text-2xl font-semibold">{mainText}</h6>
      </div>
      <div>
        <p className="text-sm md:text-base font-semibold">{subText}</p>
      </div>
    </div>
  );
};

export default ModelDetailHeroItem;
