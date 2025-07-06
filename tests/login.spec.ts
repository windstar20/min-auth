import { test, expect } from '@playwright/test';

// test('로그인 페이지가 제대로 로드되는지 확인', async ({ page }) => {
//   // 로그인 페이지로 이동
//   await page.goto('/login');

//   // 페이지가 로드되었는지 확인 - 실제 제목으로 수정
//   await expect(page).toHaveTitle('Min Auth App');

//   // 로그인 폼이 있는지 확인
//   await expect(page.getByRole('form')).toBeVisible();

//   // 이메일 입력 필드가 있는지 확인
//   await expect(page.getByLabel(/이메일|email/i)).toBeVisible();

//   // 비밀번호 입력 필드가 있는지 확인
//   await expect(page.getByLabel(/비밀번호|password/i)).toBeVisible();

//   // 로그인 버튼이 있는지 확인
//   await expect(page.getByRole('button', { name: /로그인|login/i })).toBeVisible();
// });

// test('유효하지 않은 로그인 시도 시 에러 메시지 표시', async ({ page }) => {
//   // 로그인 페이지로 이동
//   await page.goto('/login');

//   // 유효하지 않은 이메일 입력
//   await page.getByLabel(/이메일|email/i).fill('invalid@example.com');

//   // 유효하지 않은 비밀번호 입력
//   await page.getByLabel(/비밀번호|password/i).fill('wrongpassword');

//   // 로그인 버튼 클릭
//   await page.getByRole('button', { name: /로그인|login/i }).click();

//   // 에러 메시지가 표시되는지 확인
//   await expect(page.getByText(/유효하지 않은 이메일 또는 비밀번호|Invalid email or password/i)).toBeVisible({ timeout: 5000 });
// });

// 참고: 실제 로그인 테스트는 테스트 계정이 필요하므로 주석 처리

test('유효한 자격 증명으로 로그인', async ({ page }) => {
  // 홈페이지로 이동 후 로그인 모달 열기
  await page.goto('/');
  await page.getByRole('link', { name: /로그인|login/i }).click();

  // 모달이 열렸는지 확인
  await expect(page.locator('dialog')).toBeVisible();
  await expect(page.getByRole('heading', { name: '로그인' })).toBeVisible();

  // 유효한 이메일 입력
  await page.getByLabel('이메일').fill('badagogi@gmail.com');

  // 유효한 비밀번호 입력
  await page.getByLabel('비밀번호').fill('pphm8548');

  // 로그인 버튼 클릭
  await page.getByTestId('login-submit-button').click();

  // 로그인 후 홈페이지로 리디렉션되는지 확인
  // 참고: 실제 코드에서는 window.location.href = '/'를 사용하므로 URL 변경을 기다림
  await expect(page).toHaveURL('/', { timeout: 5000 });

  // 로그인된 상태의 UI 요소가 표시되는지 확인 (예: 사용자 이메일)
  await expect(page.getByText('badagogi@gmail.com')).toBeVisible();
});

test('로그인 모달 UI 요소 확인', async ({ page }) => {
  // 홈페이지로 이동 후 로그인 모달 열기
  await page.goto('/');
  await page.getByRole('link', { name: /로그인|login/i }).click();

  // 모달이 열렸는지 확인
  await expect(page.locator('dialog')).toBeVisible();

  // 로그인 폼 요소들이 있는지 확인
  await expect(page.getByRole('heading', { name: '로그인' })).toBeVisible();
  await expect(page.getByLabel('이메일')).toBeVisible();
  await expect(page.getByLabel('비밀번호')).toBeVisible();
  await expect(page.getByTestId('login-submit-button')).toBeVisible();

  // 소셜 로그인 옵션이 있는지 확인
  await expect(page.getByTestId('social-login-button')).toBeVisible();

  // 회원가입 링크가 있는지 확인
  await expect(page.getByText('아직 회원이 아니신가요?')).toBeVisible();
  await expect(page.getByTestId('signup-link')).toBeVisible();
});

test('유효하지 않은 로그인 시도 시 에러 메시지 표시', async ({ page }) => {
  // 홈페이지로 이동 후 로그인 모달 열기
  await page.goto('/');
  await page.getByRole('link', { name: /로그인|login/i }).click();

  // 유효하지 않은 이메일 입력
  await page.getByLabel('이메일').fill('invalid@example.com');

  // 유효하지 않은 비밀번호 입력
  await page.getByLabel('비밀번호').fill('wrongpassword');

  // 로그인 버튼 클릭
  await page.getByTestId('login-submit-button').click();

  // 에러 메시지가 표시되는지 확인
  await expect(page.getByTestId('login-error-message')).toBeVisible({ timeout: 5000 });
  await expect(page.getByTestId('login-error-message')).toHaveText('이메일 또는 비밀번호가 올바르지 않습니다.');
});

test('로그인 모달 닫기 기능', async ({ page }) => {
  // 홈페이지로 이동 후 로그인 모달 열기
  await page.goto('/');
  await page.getByRole('link', { name: /로그인|login/i }).click();

  // 모달이 열렸는지 확인
  await expect(page.locator('dialog')).toBeVisible();

  // 닫기 버튼 클릭
  await page.getByRole('button', { name: '✕' }).click();

  // 모달이 닫혔는지 확인
  await expect(page.locator('dialog')).not.toBeVisible();
});
