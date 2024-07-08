import { useEffect } from 'react';
import { Header } from 'shared/types';
import { bindingAsideScroll, scrollToTarget } from '../../logic/asideScroll';
import { useHeaders } from '../../logic/useHeaders';
import { PropsWithIsland } from '../../../shared/types/index';

interface AsideProps {
  headers: Header[];
}
/**
 * 页面右侧的大纲组件
 * @param props 传入页面大纲信息
 */
export function Aside(props: AsideProps & PropsWithIsland) {
  const { headers: rawHeaders = [] } = props;
  const headers = useHeaders(rawHeaders);
  const hasOutline = headers.length > 0;

  useEffect(() => {
    const unbinding = bindingAsideScroll();
    return () => {
      unbinding();
    };
  }, []);

  const renderHeader = (header: Header) => {
    return (
      <li key={header.id}>
        <a
          href={`#${header.id}`}
          className="block leading-7 text-text-2 hover:text-text-1"
          transition="color duration-300"
          style={{
            paddingLeft: (header.depth - 2) * 12
          }}
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById(header.id);
            target && scrollToTarget(target, true);
          }}
        >
          {header.text}
        </a>
      </li>
    );
  };

  return (
    <div
      flex="~ col 1"
      style={{
        width: 'var(--island-aside-width)'
      }}
    >
      <div>
        {hasOutline && (
          <div
            id="aside-container"
            className="relative divider-left pl-4 text-13px font-medium"
          >
            {/* 当前目录进行高亮 */}
            <div
              id="aside-marker"
              className="absolute top-33px opacity-0 w-1px h-18px bg-brand"
              style={{
                left: '-1px',
                transition: `top 0.25s cubic-bezier(0, 1, 0.5, 1),
                background-color 0.5s, opacity 0.25s`
              }}
            ></div>
            <div leading-7="~" text="13px" font="semibold">
              ON THIS PAGE
            </div>
            <nav>
              <ul relative="~">{headers.map(renderHeader)}</ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
