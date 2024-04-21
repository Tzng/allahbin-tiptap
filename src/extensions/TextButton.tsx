import classNames from 'classnames';
import React, { forwardRef } from 'react';

export type ButtonProps = {
  disabled?: boolean;
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties | undefined;
};

const TextButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled, style, isActive, children, onClick }, ref) => {
    return (
      <button
        style={style}
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={classNames('tide-menu-bar__btn', {
          'tide-menu-bar__btn--active': isActive,
          'tide-menu-bar__btn--disabled': disabled
        })}
      >
        {children}
      </button>
    );
  }
);

TextButton.displayName = 'TextButton';

export default TextButton;
