import React from 'react';
import SyntaxHighlighter from './SyntaxHighlighter';

const CodeViewer = ({ code, language }) => {
  return (
    <SyntaxHighlighter code={code} language={language} showLineNumbers={true} showCopyButton={true} />
  );
};

export default CodeViewer;
