import { Feature } from 'shared/types';
import styles from './index.module.scss';

/**
 * 首页Home下方的卡片展示组件
 * @param props 接收用户配置的元数据
 */
export function HomeFeature(props: { features: Feature[] }) {
  /**
   * 用于计算卡片数量，决定卡片的占比
   * @param count 卡片数量
   */
  const getGridClass = (count?: number) => {
    if (!count) {
      return '';
    } else if (count === 2) {
      return 'grid2';
    } else if (count === 3) {
      return 'grid3';
    } else if (count % 3 === 0) {
      return 'grid4';
    } else if (count % 2 === 0) {
      return 'grid6';
    }
  };
  const gridClass = getGridClass(props.features?.length);

  return (
    <div className="max-w-1152px" m="auto" flex="~ wrap" justify="between">
      {props.features.map((feature) => {
        const { icon, title, details } = feature;
        return (
          // 卡片
          <div
            key={title}
            border="rounded-md"
            p="r-4 b-4"
            w="100%"
            className={`${gridClass ? styles[gridClass] : ''}`}
          >
            <article
              bg="bg-soft"
              border="~ bg-soft solid rounded-xl"
              p="6"
              h="full"
            >
              <div
                bg="gray-light-4 dark:bg-white"
                border="rounded-md"
                className="mb-5 w-12 h-12 text-3xl flex-center"
              >
                {/* 图标 */}
                {icon}
              </div>
              {/* 标题 */}
              <h2 font="bold">{title}</h2>
              <p text="sm text-2" font="medium" className="pt-2 leading-6">
                {/* 描述 */}
                {details}
              </p>
            </article>
          </div>
        );
      })}
    </div>
  );
}
