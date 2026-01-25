import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils';
import type { AlertMessage } from '@/types';

const alertVariants = tv({
  slots: {
    base: 'alert my-4 dark:border-slate-700 dark:bg-slate-800 dark:text-white'
  },
  variants: {
    type: {
      info: 'alert-info',
      success: 'alert-success',
      warning: 'alert-warning',
      error: 'alert-error'
    },
    style: {
      soft: 'alert-soft',
      outline: 'alert-outline',
      dash: 'alert-dash'
    }
  },
  defaultVariants: {
    type: 'info',
    style: 'soft'
  }
});

const { base } = alertVariants();

const Alert: React.FC<AlertMessage> = ({
  icon = null,
  type,
  style = null,
  title = null,
  message
}) => (
  <div className={cn(base({ type, style: style ?? undefined }))} role="alert">
    {icon ? <span>{icon}</span> : null}
    <div>
      {title ? <h3 className="font-bold">{title}</h3> : null}
      <span className={cn(!!title && 'text-xs')}>{message}</span>
    </div>
  </div>
);

export default Alert;
