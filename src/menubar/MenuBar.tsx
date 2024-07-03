import classNames from 'classnames';
import React from 'react';

type MenuBarProps = {
  className?: string;
  style?: React.CSSProperties | undefined;
  children?: React.ReactNode;
};

export const MenuBar: React.FC<MenuBarProps> = ({ className, style, children }) => (
  <div className={classNames('tide-menu-bar', className)} style={style}>
    {children}
  </div>
);
