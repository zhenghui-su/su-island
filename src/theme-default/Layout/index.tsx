import { useState } from 'react';
/**
 * 默认主题布局
 *
 */
export function Layout() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>This is Layout Component 333</h1>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>Add Count</button>
      </div>
    </div>
  );
}
