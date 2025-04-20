const Avatar: React.FC<AvatarProps> = ({
    src,
    alt = 'Avatar',
    size = 'md',
    className = '',
    initials,
    badge,
  }) => {
    const sizeClasses = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl',
    };
  
    const badgeClasses = {
      online: 'bg-green-400',
      offline: 'bg-gray-400',
      busy: 'bg-red-400',
    };
  
    const baseClasses = 'relative inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700';
    const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;
  
    return (
      <div className={classes}>
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded-full"
          />
        ) : initials ? (
          <span className="font-medium uppercase">{initials}</span>
        ) : (
          <svg
            className="w-full h-full text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        )}
        {badge && (
          <span
            className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${badgeClasses[badge]}`}
          />
        )}
      </div>
    );
  };
  
  export default Avatar;