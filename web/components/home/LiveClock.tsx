'use client';

import { useEffect, useState } from 'react';

/** Local time in Yogyakarta. Rendered after mount so server and client agree. */
export default function LiveClock() {
  const [t, setT] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{t ?? '--:--'} WIB</span>;
}
