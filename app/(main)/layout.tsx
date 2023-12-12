import BasicLayout from '@/components/layout/BasicLayout'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BasicLayout>{children}</BasicLayout>
}
