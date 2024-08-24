interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isActive = true,
  ...props
}) => {
  const baseClasses = `
    bg-green-600 
    text-white 
    flex 
    items-center 
    justify-center 
    px-4 
    py-2 
    rounded-md 
    font-bold 
    text-lg 
    cursor-pointer 
    transition 
    duration-300 
    transform 
    ease-in-out
  `;

  const hoverClasses = isActive
    ? `hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5`
    : `cursor-not-allowed bg-gray-300`;

  const activeClasses = isActive
    ? `active:transform active:translate-y-0.5 active:scale-95`
    : ``;

  return (
    <button
      className={`${baseClasses} ${hoverClasses} ${activeClasses}`}
      disabled={!isActive}
      {...props}
    >
      {children}
    </button>
  );
};
