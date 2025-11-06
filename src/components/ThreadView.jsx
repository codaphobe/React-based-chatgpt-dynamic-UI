import React, { useEffect } from 'react';
import ThreadUtils from '../utils/ThreadUtils';

export default function ThreadView() {

  const [threads, setThreads] = React.useState([]);

  useEffect(() => {
    const threads = threadUtils.getAllThreads();
    setThreads(threads);
    console.log("Threads loaded:", threads);
  }, []);
  
  return (
    <div>ThreadView</div>
  )
}

