import React, {ReactNode, ButtonHTMLAttributes} from "react";
import {useLogout} from "../../_server/queries";
import {useNavigate} from "react-router-dom";
import {Link, LinkProps} from "react-router-dom";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  to?: string;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({className, ...props}) => {
  const cmpProps: ButtonHTMLAttributes<HTMLButtonElement> = {
    ...props,
    className: `btn shadow-md shadow-gray-300 transition-all duration-300 ease-in-out ${className}`,
  };

  if (props.to) return <Link {...(cmpProps as LinkProps)} />;
  if (props.href)
    return (
      <a {...(cmpProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />
    );
  return <button type="button" {...cmpProps} />;
};

export const ButtonPrimary: React.FC<ButtonProps> = ({className, ...props}) => (
  <Button
    {...props}
    className={`btn btn-primary btn-sm rounded-none ${className}`}
  />
);

export const ButtonSecondary: React.FC<ButtonProps> = ({
  className = "",
  ...props
}) => (
  <Button
    {...props}
    className={`btn-secondary btn-sm rounded-none ${className} `}
  />
);
export const ButtonAccent: React.FC<ButtonProps> = ({
  className = "",
  ...props
}) => (
  <Button
    {...props}
    className={`btn-accent btn-sm rounded-none ${className} `}
  />
);

export const NavButton: React.FC<ButtonProps> = ({className, ...props}) => (
  <Button
    {...props}
    className={`btn-ghost btn-md p-2 rounded-none shadow-none ${className}`}
  />
);

export const LogoutButton: React.FC<ButtonProps> = ({...props}) => {
  const [logout] = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <NavButton {...props} onClick={handleLogout} aria-label="Logout Button">
      Logout
    </NavButton>
  );
};
