import type { ReactNode } from 'react';

type NavPage = 'home' | 'courses' | 'dashboard' | 'tests' | 'profile';

export function Layout({ children, page, onNavigate, onLogout, isLoggedIn }: { children: ReactNode; page: string; onNavigate: (page: NavPage | 'login') => void; onLogout: () => void; isLoggedIn: boolean }) {
  const item = (target: NavPage, label: string) => <button className={page === target ? 'nav-active' : 'nav-link'} onClick={() => onNavigate(target)}>{label}</button>;
  return <>
    <header className="topbar">
      <button className="brand" onClick={() => onNavigate('home')}>هتّاش</button>
      <nav className="nav">
        {item('home', 'الرئيسية')}
        {item('courses', 'الدورات')}
        {item('dashboard', 'لوحة الطالب')}
        {item('tests', 'الاختبارات')}
        {item('profile', 'الملف الشخصي')}
        {isLoggedIn ? <button className="nav-link" onClick={onLogout}>تسجيل الخروج</button> : <button className="nav-cta" onClick={() => onNavigate('login')}>تسجيل الدخول</button>}
      </nav>
    </header>
    <main className="container">{children}</main>
    <footer className="footer"><div><strong>منصة هتّاش التعليمية</strong><p>تعلم تجريبي محلي — لا دفع إلكتروني ولا قاعدة بيانات خارجية.</p></div><div>الرئيسية · الدورات · الاختبارات · الدعم التجريبي</div></footer>
  </>;
}
