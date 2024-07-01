import styles from './index.module.less';

export default function LoginContainer({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.loginContainer}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#fff',
          fontSize: 30,
        }}
      >
        <div>欢迎使用拉油点管控系统</div>
      </div>
      <div className={styles.wrap}>{children}</div>
    </div>
  );
}
