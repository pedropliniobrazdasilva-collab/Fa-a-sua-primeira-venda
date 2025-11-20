import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  glow?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  glow = false, 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative px-8 py-4 rounded font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group";
  
  const variants = {
    primary: "bg-white text-black hover:bg-cyan-400",
    secondary: "bg-gradient-to-r from-cyan-600 to-violet-600 text-white border border-transparent hover:brightness-110",
    outline: "bg-transparent border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
  };

  const glowStyle = glow ? "shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]" : "";
  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${glowStyle} ${widthStyle} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Shine effect - Added pointer-events-none to fix click issues */}
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine pointer-events-none" />
    </button>
  );
};