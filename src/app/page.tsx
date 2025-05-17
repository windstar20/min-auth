'use client';

import Link from 'next/link';
import LoginButton from './components/LoginButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-8">환영합니다!</h1>
        <div>
          여기는 메인 페이지 입니다.
        </div>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/signup"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            회원가입
          </Link>
          <LoginButton />
        </div>
      </div>
    </main>
  );
}
