import './globals.css'
// 在 app/layout.tsx 中
export const metadata = {
  title: 'PetCare 智能管家',
  description: '伴侣生物健康管理专家',
  // 关键：开启全屏模式
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PetCare',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
