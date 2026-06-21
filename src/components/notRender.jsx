// Test এর জন্য একটি component তৈরি করুন
'use client';

export default function ThrowError() {
  throw new Error('Test error!');
  return <div>This won't render</div>;
}