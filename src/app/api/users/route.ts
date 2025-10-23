import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // JSONファイルの絶対パスを生成
    const filePath = path.join(process.cwd(), 'src', 'resources', 'stub', 'users.json');

    // ファイル読み込み
    const jsonData = await fs.readFile(filePath, 'utf8');

    // JSONをパース
    const data = JSON.parse(jsonData);

    // レスポンスとして返す
    return NextResponse.json(data);
  } catch (error) {
    console.error('JSON読み込みエラー:', error);
    return NextResponse.json(
      { status: 'error', message: 'ファイル読み込みに失敗しました。' },
      { status: 500 }
    );
  }
}