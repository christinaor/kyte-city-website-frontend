type TitleWithSubtextProps = {
  title: string;
  subtext: string;
}

const TitleWithSubtext: React.FC<TitleWithSubtextProps> = ({
  title,
  subtext,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h5 className="h5-mobile-semi capitalize">{title}</h5>
      
      <p className="text-start caption1-mobile-light-italic">{subtext}</p>
    </div>
  );
};

export default TitleWithSubtext;