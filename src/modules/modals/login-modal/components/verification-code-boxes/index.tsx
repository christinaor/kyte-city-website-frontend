type VerificationCodeBoxesProps = {
  verificationCode: string[];
  setVerificationCode: (newCode: string[]) => void;
};

const VerificationCodeBoxes: React.FC<VerificationCodeBoxesProps> = ({
  verificationCode,
  setVerificationCode,
}) => {
  const handleInputChange = (index: number, value: string) => {
    const inputNumber = parseInt(value);
    if (!isNaN(inputNumber) && value.length > 0) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value[0];
      setVerificationCode(newVerificationCode);
    } else {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = "";
      setVerificationCode(newVerificationCode);
    }
  };

  return (
    <div className="flex justify-center gap-1 w-full max-w-[248px] h-[48px]">
      {verificationCode.map((code, i) => (
        <div key={`phone-verification-code-${i}`} className={`w-1/6 h-full border border-solid border-primary-5 rounded-sm`}>
          <input
            className="w-full h-full bg-transparent text-center"
            name={`verification-code-${i + 1}`}
            type="text"
            value={code}
            onChange={(e) => handleInputChange(i, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default VerificationCodeBoxes;
