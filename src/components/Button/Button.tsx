import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import { ButtonStyled } from './Button.styled';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ variant = 'default', children, ...props }) => {
  return (
    <ButtonStyled variant={variant} {...props}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
