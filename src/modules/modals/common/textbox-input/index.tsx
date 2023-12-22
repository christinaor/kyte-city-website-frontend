type TextboxInputProps = {
  name: string;
  type: string;
  value: string | number;
  placeholder: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  maxLength?: number;
  styles?: string;
}

const TextboxInput: React.FC<TextboxInputProps> = ({
  name,
  type,
  value,
  placeholder,
  maxLength = 250, // Must be type "text" to use maxLength
  handleChange,
  styles,
}) => {
  return (
    <div className={`pb-2 border-b border-primary-5 leading-none ${styles}`} >
      <input 
        className="w-full p1-mobile-light bg-transparent"
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        maxLength={maxLength}
        required
      />
    </div>
  );
};

export default TextboxInput;