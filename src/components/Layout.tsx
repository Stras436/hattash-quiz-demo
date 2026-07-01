import type { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return <><header className="topbar"><div className="brand">هتّاش</div><span>منصة تعليمية تجريبية</span></header><main className="container">{children}</main><footer className="footer">تجربة محلية محفوظة على جهازك فقط عبر localStorage</footer></>;
}
