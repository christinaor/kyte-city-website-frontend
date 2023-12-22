import Image from "next/image";

import CheckmarkIcon from "public/icons/checkmark-circle-dark.svg";

type InfoTextProps = {
  text: string;
  styles?: string;
}

const InfoText: React.FC<InfoTextProps> = ({
  text,
  styles,
}) => {
  return (
    <div className={`flex items-start gap-1 ${styles}`}>
      <Image
        src={CheckmarkIcon}
        alt="checkmark icon"
        width={12}
        height={12}
      />

      <p className="caption1-mobile-light-italic text-success-3">{text}</p>
    </div>
  );
};

export default InfoText;