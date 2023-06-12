import { PropsWithChildren } from 'react';
import { StyledComponentProps, DefaultTheme } from 'styled-components';
import { StyledButton } from './Button.styled';
import styles from './button.module.scss';
import cs from 'classnames';

export type AdditionalButtonProps = {
  borderRadius: string;
};

export type ButtonProps = StyledComponentProps<
  'button',
  DefaultTheme,
  AdditionalButtonProps,
  'borderRadius'
>;

const Button = ({
  borderRadius = '999px',
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <StyledButton
      borderRadius={borderRadius}
      className={cs(styles.button, className)}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
