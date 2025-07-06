import { test, expect } from '@playwright/test';

test('홈페이지가 제대로 로드되는지 확인', async ({ page }) => {
  // 홈페이지로 이동
  await page.goto('/');

  // 페이지가 로드되었는지 확인
  await expect(page).toHaveTitle(/Min Auth/);

  // 페이지에 특정 콘텐츠가 있는지 확인
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('로그인 페이지로 이동할 수 있는지 확인', async ({ page }) => {
  // 홈페이지로 이동
  await page.goto('/');

  // 로그인 링크 찾기 및 클릭
  const loginLink = page.getByRole('link', { name: /로그인|login/i });
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  // 로그인 페이지로 이동했는지 확인
  await expect(page).toHaveURL(/.*login/);
});
