'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();

  const handleLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // 인터셉트 라우트를 사용하여 모달로 표시
    router.push('/login', { scroll: false });
  };

  return (
    <Link
      href="/login"
      className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
      onClick={handleLoginClick}
    >
      로그인
    </Link>
  );
}
