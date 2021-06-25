import { ButtonHTMLAttributes } from 'react';
import '../../styles/button.scss';

//tipagem ButtonHTMLAttributes aceita como "propriedade" toda prop. do elemento button do HTML
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export const Button = ({isOutlined = false, ...props}: ButtonProps) => {
  return (
    <button
      className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />
  )
};

