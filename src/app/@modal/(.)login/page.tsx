'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function LoginModal() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // 모달 열기
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();

      // 다이얼로그가 닫혔을 때 라우트를 이전으로 이동
      const handleClose = () => {
        router.back();
      };

      dialog.addEventListener('close', handleClose);

      return () => {
        dialog.removeEventListener('close', handleClose);
      };
    }
  }, [router]);

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
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

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              id="email"
              type="email"
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
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              로그인
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          아직 회원이 아니신가요?{' '}
          <a
            href="/auth/signup"
            className="text-blue-500 hover:underline"
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
