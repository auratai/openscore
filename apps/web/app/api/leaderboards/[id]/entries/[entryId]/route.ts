import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; entryId: string } }
) {
  try {
    const { id, entryId } = params;
    const body = await request.json();

    if (!id || !entryId) {
      return NextResponse.json(
        { error: 'Leaderboard ID and Entry ID are required' },
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

    // Find and update the entry
    const entryIndex = existingEntries.findIndex((entry: any) => entry.id === entryId);
    
    if (entryIndex === -1) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      );
    }

    // Update the entry
    const updatedEntry = {
      ...existingEntries[entryIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };

    existingEntries[entryIndex] = updatedEntry;

    // Update the leaderboard
    const updatedLeaderboard = await prisma.leaderboard.update({
      where: { id: leaderboard.id },
      data: {
        entries: existingEntries,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      entry: updatedEntry,
      leaderboard: {
        id: updatedLeaderboard.id,
        viewId: updatedLeaderboard.viewId,
        editId: updatedLeaderboard.editId,
        title: updatedLeaderboard.title,
        entries: existingEntries
      }
    });

  } catch (error) {
    console.error('Error updating entry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; entryId: string } }
) {
  try {
    const { id, entryId } = params;

    if (!id || !entryId) {
      return NextResponse.json(
        { error: 'Leaderboard ID and Entry ID are required' },
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

    // Find and remove the entry
    const entryIndex = existingEntries.findIndex((entry: any) => entry.id === entryId);
    
    if (entryIndex === -1) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      );
    }

    const removedEntry = existingEntries[entryIndex];
    existingEntries.splice(entryIndex, 1);

    // Update the leaderboard
    const updatedLeaderboard = await prisma.leaderboard.update({
      where: { id: leaderboard.id },
      data: {
        entries: existingEntries,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      removedEntry,
      leaderboard: {
        id: updatedLeaderboard.id,
        viewId: updatedLeaderboard.viewId,
        editId: updatedLeaderboard.editId,
        title: updatedLeaderboard.title,
        entries: existingEntries
      }
    });

  } catch (error) {
    console.error('Error deleting entry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 