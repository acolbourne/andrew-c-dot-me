import { cn } from '@/lib/utils';
import type { AlertMessage } from '@/types';

const Alert: React.FC<AlertMessage> = ({
  icon = null,
  type,
  style = null,
  title = null,
  message
}) => (
  <div
    className={cn(
      'my-4',
      'alert',
      `alert-${type}`,
      style ? `alert-${style}` : null,
      'dark:border-slate-700 dark:bg-slate-800 dark:text-white'
    )}
    role="alert"
  >
    {icon ? <span>{icon}</span> : null}
    <div>
      {title ? <h3 className="font-bold">{title}</h3> : null}
      <span className={cn(!!title && 'text-xs')}>{message}</span>
    </div>
  </div>
);

export default Alert;
