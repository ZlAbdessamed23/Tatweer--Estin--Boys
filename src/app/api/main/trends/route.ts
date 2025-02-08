import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const trends = await prisma.trend.findMany();

    if (!trends.length) {
      return NextResponse.json({ message: 'No trends found' }, { status: 404 });
    };

    return NextResponse.json(trends);
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ message: 'Database connection failed' }, { status: 500 });
  };
};