import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Leaderboard ID is required' },
        { status: 400 }
      );
    }

    // Find the leaderboard
    let leaderboard = await prisma.leaderboard.findUnique({
      where: { viewId: id }
    });

    if (!leaderboard) {
      leaderboard = await prisma.leaderboard.findUnique({
        where: { editId: id }
      });
    }

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

    // Parse existing entries
    const existingEntries = Array.isArray(leaderboard.entries) 
      ? leaderboard.entries 
      : JSON.parse(leaderboard.entries as string || '[]');

    // Create new entry
    const newEntry = {
      id: `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: body.name,
      score: body.score || 0,
      avatar: body.avatar,
      data: body.metadata || {},
      createdAt: new Date().toISOString()
    };

    // Add to entries array
    const updatedEntries = [...existingEntries, newEntry];

    // Update the leaderboard
    const updatedLeaderboard = await prisma.leaderboard.update({
      where: { id: leaderboard.id },
      data: {
        entries: updatedEntries,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      entry: newEntry,
      leaderboard: {
        id: updatedLeaderboard.id,
        viewId: updatedLeaderboard.viewId,
        editId: updatedLeaderboard.editId,
        title: updatedLeaderboard.title,
        entries: updatedEntries
      }
    });

  } catch (error) {
    console.error('Error adding entry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 