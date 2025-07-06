'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function LoginModal() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 모달 열기
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }

    // 클린업 함수
    return () => {
      // 컴포넌트 언마운트 시 모달이 열려 있는 경우 닫기
      if (dialog && dialog.open) {
        dialog.close();
      }
    };
  }, []);

  // 모달 닫기 함수
  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      // 닫을 때 이전 화면으로 돌아가기
      router.back();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      console.log('result', result);

      if (result?.error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        setLoading(false);
      } else {
        // 로그인 성공 시 홈페이지로 직접 이동 (모달 닫지 않고 직접 이동)
        console.log('로그인 성공 했습니다.');

        // 직접 홈페이지로 이동 - 인터셉트 라우트 우회
        window.location.href = '/';
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setError('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
      setLoading(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={(e) => {
        // 다이얼로그 외부 클릭 시 닫기
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="bg-white rounded-lg p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">로그인</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-1" data-testid="login-error-message">
              {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              name="로그인"
              data-testid="login-submit-button"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </div>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span data-testid="social-login-button" className="px-2 bg-white text-gray-500">
                또는 소셜 로그인
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                signIn('kakao', { callbackUrl: '/' });
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C4.48 0 0 3.48 0 7.78C0 10.45 1.63 12.78 4.08 14.15V18.48L8.16 15.67C8.76 15.78 9.37 15.85 10 15.85C15.52 15.85 20 12.37 20 7.78C20 3.48 15.52 0 10 0Z" fill="black" />
              </svg>
              카카오로 로그인
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          아직 회원이 아니신가요?{' '}
          <a
            href="/auth/signup"
            className="text-blue-500 hover:underline"
            data-testid="signup-link"
            onClick={(e) => {
              e.preventDefault();
              router.push('/auth/signup');
              handleClose();
            }}
          >
            회원가입
          </a>
        </div>
      </div>
    </dialog>
  );
}
