import { declare } from '@babel/helper-plugin-utils';
import type { Visitor } from '@babel/traverse';
import type { PluginPass } from '@babel/core';
import { types as t } from '@babel/core';
import { MASK_SPLITTER } from './constants';
import { normalizePath } from 'vite';

/**
 * 一个 Babel 插件，用于转换带有特定属性的 JSX 元素。
 * 转换：
 * 转换前: <Aside __island />
 * 转换后: <Aside __island="../comp/id.ts!!ISLAND!!/User/import.ts" />
 */
export default declare((api) => {
  api.assertVersion(7);

  // 定义 visitor 对象，用于遍历和转换 AST。
  const visitor: Visitor<PluginPass> = {
    // 访问代码中的每个 JSX 开标签
    // <A __island>
    // <A.B __island>
    JSXOpeningElement(path, state) {
      const name = path.node.name;
      let bindingName = '';

      // 即 <A />
      if (name.type === 'JSXIdentifier') {
        bindingName = name.name;
      } else if (name.type === 'JSXMemberExpression') {
        // 即 <A.B />
        let object = name.object;
        while (t.isJSXMemberExpression(object)) {
          // A.B.C 一直遍历回溯到A
          object = object.object;
        }
        bindingName = object.name;
      } else {
        return;
      }

      // 获取该组件的绑定信息。
      const binding = path.scope.getBinding(bindingName);

      // 检查绑定是否是一个导入声明。
      if (binding?.path.parent.type === 'ImportDeclaration') {
        const source = binding.path.parent.source;
        // 获取组件的 props。
        const attributes = (path.container as t.JSXElement).openingElement
          .attributes;

        // 遍历所有属性，找到 __island 属性并修改其值。
        for (let i = 0; i < attributes.length; i++) {
          const name = (attributes[i] as t.JSXAttribute).name;
          if (name.name === '__island') {
            (attributes[i] as t.JSXAttribute).value = t.stringLiteral(
              `${source.value}${MASK_SPLITTER}${
                normalizePath(state.filename) || ''
              }`
            );
          }
        }
      }
    }
  };

  // 返回插件名称和 visitor 对象。
  return {
    name: 'transform-jsx-su-island',
    visitor
  };
});
