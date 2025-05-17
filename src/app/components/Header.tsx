'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-white shadow-sm">
      <Link href="/" className="text-xl font-bold">
        Min Auth
      </Link>
      
      <div className="flex gap-4">
        {isAuthenticated ? (
          // 로그인된 사용자를 위한 UI
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            로그아웃
          </button>
        ) : (
          // 로그인하지 않은 사용자를 위한 UI
          <>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              회원가입
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              로그인
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
