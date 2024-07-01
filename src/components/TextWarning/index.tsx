import styles from './index.module.less';

export function TextWarning({
  children,
  color = 'rgb(250, 173, 20)',
}: React.PropsWithChildren<{ color?: string }>) {
  return (
    <div className={styles.waringAni} style={{ '--color': `${color}` } as React.CSSProperties}>
      {children}
    </div>
  );
}
