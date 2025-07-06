import { test } from '@playwright/test';

test('로그인 페이지 구조 확인', async ({ page }) => {
  // 로그인 페이지로 이동
  await page.goto('/login');
  
  // 페이지의 HTML 구조를 콘솔에 출력
  const html = await page.content();
  console.log('페이지 HTML 구조:');
  console.log(html);
  
  // 폼 요소 확인
  const formCount = await page.locator('form').count();
  console.log(`폼 요소 개수: ${formCount}`);
  
  // 입력 필드 확인
  const inputFields = await page.locator('input').all();
  console.log(`입력 필드 개수: ${inputFields.length}`);
  
  for (let i = 0; i < inputFields.length; i++) {
    const type = await inputFields[i].getAttribute('type');
    const name = await inputFields[i].getAttribute('name');
    const id = await inputFields[i].getAttribute('id');
    console.log(`입력 필드 ${i+1}: type=${type}, name=${name}, id=${id}`);
  }
  
  // 버튼 확인
  const buttons = await page.locator('button').all();
  console.log(`버튼 개수: ${buttons.length}`);
  
  for (let i = 0; i < buttons.length; i++) {
    const text = await buttons[i].textContent();
    const type = await buttons[i].getAttribute('type');
    console.log(`버튼 ${i+1}: text=${text?.trim()}, type=${type}`);
  }
});
