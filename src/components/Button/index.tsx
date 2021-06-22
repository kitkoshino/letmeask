import { ButtonHTMLAttributes } from 'react';
import '../../styles/button.scss';

//tipagem ButtonHTMLAttributes aceita como "propriedade" toda prop. do elemento button do HTML
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  return (
    <button className="button" {...props} />
  )
};

