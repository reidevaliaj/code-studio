import { ReactNode, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  external = false,
  className = '',
  ...props 
}: ButtonProps) => {
  // Use unified button styles for all variants
  const baseClasses = 'btn-unified';
  
  const sizeClasses = {
    sm: 'btn-unified-sm',
    md: 'btn-unified-md',
    lg: 'btn-unified-lg',
  };
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
