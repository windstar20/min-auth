'use client';

import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-8">환영합니다!</h1>
        <div className="text-xl mb-4">
          {isAuthenticated
            ? `${session?.user?.name || '사용자'}님, 로그인되었습니다!`
            : '로그인하여 모든 기능을 이용해보세요.'}
        </div>
        <div>
          여기는 메인 페이지 입니다.
        </div>
      </div>
    </main>
  );
}
