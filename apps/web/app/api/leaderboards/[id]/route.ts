import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Leaderboard ID is required' },
        { status: 400 }
      );
    }

    // Try to find by viewId first (public access)
    let leaderboard = await prisma.leaderboard.findUnique({
      where: { viewId: id }
    });

    // If not found by viewId, try by editId (private access)
    if (!leaderboard) {
      leaderboard = await prisma.leaderboard.findUnique({
        where: { editId: id }
      });
    }

    // If still not found, try by internal ID
    if (!leaderboard) {
      leaderboard = await prisma.leaderboard.findUnique({
        where: { id }
      });
    }

    if (!leaderboard) {
      return NextResponse.json(
        { error: 'Leaderboard not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const columns = Array.isArray(leaderboard.columns) 
      ? leaderboard.columns 
      : JSON.parse(leaderboard.columns as string || '[]');
    
    const entries = Array.isArray(leaderboard.entries) 
      ? leaderboard.entries 
      : JSON.parse(leaderboard.entries as string || '[]');

    return NextResponse.json({
      id: leaderboard.id,
      viewId: leaderboard.viewId,
      editId: leaderboard.editId,
      title: leaderboard.title,
      subheading: leaderboard.subheading,
      description: leaderboard.description,
      url: leaderboard.url,
      note: leaderboard.note,
      templateType: leaderboard.templateType,
      startDate: leaderboard.startDate?.toISOString(),
      endDate: leaderboard.endDate?.toISOString(),
      columns,
      sortByColumn: leaderboard.sortByColumn,
      entries,
      createdAt: leaderboard.createdAt.toISOString(),
      updatedAt: leaderboard.updatedAt.toISOString(),
    });

  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 