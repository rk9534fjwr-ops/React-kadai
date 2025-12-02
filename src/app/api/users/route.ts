import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface UserData {
  name: string;
  nameKana: string;
  phone: string;
  email: string;
  age: number;
  sentStatus: '済' | '未';
}

// SearchCriteria 型（必要に応じて調整）
interface SearchCriteria {
  name?: string;
  nameKana?: string;
  phone?: string;
  email?: string;
  filterUnsentOnly?: boolean;
}

export async function GET(request: Request) {
  try {
    // クエリパラメータ取得
    const { searchParams } = new URL(request.url);

    // JSON ファイルパス生成
    const filePath = path.join(process.cwd(), 'src', 'resources', 'stub', 'users.json');

    // ファイル読み込み
    const jsonData = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(jsonData);

    // クエリを SearchCriteria に変換
    const criteria: SearchCriteria = {
      name: searchParams.get('name') || undefined,
      nameKana: searchParams.get('nameKana') || undefined,
      phone: searchParams.get('phone') || undefined,
      email: searchParams.get('email') || undefined,
      filterUnsentOnly: searchParams.get('filterUnsentOnly') === 'true',
    };

    // -----------------------------
    // 🔍 バックエンドで絞り込み処理
    // -----------------------------
    const filtered = data.data.filter((user: UserData) => {
      if (criteria.filterUnsentOnly && user.sentStatus.trim() !== '未') return false;
      if (criteria.name && !user.name.includes(criteria.name)) return false;
      if (criteria.nameKana && !user.nameKana.includes(criteria.nameKana)) return false;
      if (criteria.phone && !user.phone.includes(criteria.phone)) return false;
      if (criteria.email && !user.email.includes(criteria.email)) return false;

      return true;
    });

    // 結果返却
    return NextResponse.json({
      status: 'success',
      data: filtered,
    });
  } catch (error) {
    console.error('JSON読み込みエラー:', error);
    return NextResponse.json(
      { status: 'error', message: 'ファイル読み込みに失敗しました。' },
      { status: 500 }
    );
  }
}
