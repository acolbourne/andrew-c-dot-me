import { tv } from 'tailwind-variants';

const loadingStateVariants = tv({
  slots: {
    base: 'mx-auto max-w-full text-center',
    loadingSpinner: 'loading loading-spinner loading-lg text-info'
  }
});

const { base, loadingSpinner } = loadingStateVariants();

const LoadingState: React.FC = () => (
  <div className={base()}>
    <span className={loadingSpinner()} />
  </div>
);

export default LoadingState;
