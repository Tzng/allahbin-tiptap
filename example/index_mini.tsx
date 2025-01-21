import React, { useState } from 'react';
import ATiptapEdit from '../src/ATiptapEdit';

const SimpleChatEditor = () => {
  const [value, setValue] = useState('');

  return (
    <div style={{ padding: 20 }}>
      <h2>简单模式示例</h2>

      {/* 聊天输入框示例 - 最简单模式 */}
      <div
        style={{
          maxWidth: 600,
          margin: '20px auto',
          border: '1px solid #eee',
          borderRadius: 4,
        }}
      >
        <h3>聊天输入框（禁用所有复杂功能）</h3>
        <ATiptapEdit
          simple
          height={120}
          editable
          bordered={false}
          value={value}
          onChange={(val) => {
            setValue(val);
            console.log('输入内容：', val);
          }}
          style={{
            boxShadow: 'none',
            padding: '8px 12px',
          }}
        />
      </div>

      {/* 内容预览 */}
      <div style={{ maxWidth: 600, margin: '20px auto' }}>
        <h3>当前输入内容预览：</h3>
        <pre
          style={{
            background: '#f5f5f5',
            padding: 16,
            borderRadius: 4,
            overflow: 'auto',
          }}
        >
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default SimpleChatEditor;
