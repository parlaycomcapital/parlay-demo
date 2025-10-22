interface RoleBadgeProps {
  role: 'fan' | 'analyst' | 'admin';
  size?: 'sm' | 'md' | 'lg';
}

export const RoleBadge = ({ role, size = 'sm' }: RoleBadgeProps) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const roleStyles = {
    admin: 'bg-red-600 text-white',
    analyst: 'bg-orange-600 text-white',
    fan: 'bg-blue-600 text-white'
  };

  const roleLabels = {
    admin: 'Admin',
    analyst: 'Analyst',
    fan: 'Fan'
  };

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${sizeClasses[size]} ${roleStyles[role]}`}>
      {roleLabels[role]}
    </span>
  );
};
