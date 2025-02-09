const HeroDetailItem = ({
  mainText,
  subText,
}: {
  mainText: string;
  subText: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <h6 className="text-2xl font-semibold">{mainText}</h6>
      </div>
      <div>
        <p className="text-base font-semibold">{subText}</p>
      </div>
    </div>
  );
};

export default HeroDetailItem;
