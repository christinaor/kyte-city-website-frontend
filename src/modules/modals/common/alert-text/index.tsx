import Image from "next/image";

import AlertCircleIcon from "public/icons/alert-circle-rounded.svg";

type AlertTextProps = {
  text: string;
  styles?: string;
}

const AlertText: React.FC<AlertTextProps> = ({
  text,
  styles,
}) => {
  return (
    <div className={`flex items-start gap-1 ${styles}`}>
      <Image
        src={AlertCircleIcon}
        alt="alert icon"
        width={12}
        height={12}
      />

      <p className="caption1-mobile-light-italic text-error-3">{text}</p>
    </div>
  );
};

export default AlertText;