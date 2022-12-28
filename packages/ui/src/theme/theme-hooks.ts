import React from 'react';

export const useBroadcastChannel = <T>(
  name: string,
  handler: (message: T) => void,
) => {
  const channel = React.useRef<BroadcastChannel | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (channel.current === null) {
      channel.current = new BroadcastChannel(name);
      channel.current.onmessage = e => handler(e.data);
    }

    return () => {
      if (channel.current === null) {
        return;
      }
      channel.current.close();
      channel.current = null;
    };
  }, [name, handler]);

  const postMessage = React.useCallback(
    (message: T) => {
      if (channel.current !== null) {
        channel.current.postMessage(message);
      }
    },
    [channel.current],
  );

  return {
    postMessage,
  };
};
