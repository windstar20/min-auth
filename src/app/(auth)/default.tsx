// 이 컴포넌트는 인터셉트 라우트에서 사용됩니다.
// 실제로는 렌더링되지 않고, children으로 전달된 모달을 표시합니다.
export default function AuthModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
