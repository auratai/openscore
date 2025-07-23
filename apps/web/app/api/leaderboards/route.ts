import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';

export async function GET() {
  try {
    const leaderboards = await prisma.leaderboard.findMany({
      select: {
        id: true,
        viewId: true,
        editId: true,
        title: true,
        subheading: true,
        description: true,
        templateType: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        updatedAt: true,
        entries: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform the data to include entry count and format dates
    const transformedLeaderboards = leaderboards.map(leaderboard => {
      // Parse entries to get count
      let entryCount = 0;
      try {
        const entries = leaderboard.entries;
        entryCount = Array.isArray(entries) ? entries.length : 0;
      } catch {
        entryCount = 0;
      }

      return {
        id: leaderboard.id,
        viewId: leaderboard.viewId,
        editId: leaderboard.editId,
        title: leaderboard.title,
        subheading: leaderboard.subheading,
        description: leaderboard.description,
        templateType: leaderboard.templateType,
        startDate: leaderboard.startDate?.toISOString(),
        endDate: leaderboard.endDate?.toISOString(),
        entryCount,
        createdAt: leaderboard.createdAt.toISOString(),
        updatedAt: leaderboard.updatedAt.toISOString(),
      };
    });

    return NextResponse.json(transformedLeaderboards);

  } catch (error) {
    console.error('Error fetching leaderboards:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 