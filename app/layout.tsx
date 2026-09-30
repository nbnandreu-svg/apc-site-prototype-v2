import type { Metadata } from 'next';
import './globals.css';
import './sections.css';
import './mobile.css';
export const metadata: Metadata = {
  title: 'Цифровизация агропромышленного комплекса | Агропромцифра',
  description:
    'Разработка и внедрение программного обеспечения для агропромышленного комплекса. Отраслевые платформы, интеграция систем, ИИ, безопасность и обучение.',
  icons: { icon: '/assets/logo.png' },
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
