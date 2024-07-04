import styles from './index.module.scss';
import { usePrevNextPage } from '../../logic/usePrevNextPage';

/**
 * 正文界面底部上一篇下一篇组件
 */
export function DocFooter() {
  const { prevPage, nextPage } = usePrevNextPage();
  return (
    <footer mt="8">
      {/* 上一篇 */}
      <div flex="~" gap="2" divider-top="~" pt="6">
        <div flex="~ col" className={styles.prev}>
          {prevPage && (
            <a href={prevPage.link} className={styles.pagerLink}>
              <span className={styles.desc}>上一页</span>
              <span className={styles.title}>{prevPage.text}</span>
            </a>
          )}
        </div>
        {/* 下一篇 */}
        <div flex="~ col" className={styles.next}>
          {nextPage && (
            <a
              href={nextPage.link}
              className={`${styles.pagerLink} ${styles.next}`}
            >
              <span className={styles.desc}>下一页</span>
              <span className={styles.title}>{nextPage.text}</span>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
