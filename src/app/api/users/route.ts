import { NextResponse } from 'next/server';
import data from '@/resources/stub/users.json'; // ← JSONを直接import
import type { ApiResponse } from '@/resources/types/UserData';

export async function GET() {
  const response = data as ApiResponse; // 型で保証される！
  return NextResponse.json(response);
}