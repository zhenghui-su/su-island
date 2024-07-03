import { toggle } from '../../logic/toggleAppearance';
import styles from './index.module.scss';

interface SwitchProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}
/**
 * 切换按钮组件-Switch
 */
export function Switch(props: SwitchProps) {
  return (
    <button
      className={`${styles.switch} ${props.className}`}
      type="button"
      role="switch"
      {...(props.onClick ? { onClick: props.onClick } : {})}
    >
      <span className={styles.check}>
        <span className={styles.icon}>{props.children}</span>
      </span>
    </button>
  );
}
/**
 * 主题切换按钮组件
 */
export function SwitchAppearance() {
  return (
    <Switch onClick={toggle}>
      {/* 白天模式 */}
      <div className={styles.sun}>
        <div className="i-carbon-sun w-full h-full"></div>
      </div>
      {/* 暗黑模式 */}
      <div className={styles.moon}>
        <div className="i-carbon-moon w-full h-full"></div>
      </div>
    </Switch>
  );
}
