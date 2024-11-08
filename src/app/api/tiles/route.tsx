import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { tileType, useType, peopleCount, colorPreference } = await request.json();

    let suggestedTiles: { name: string; color: string }[] = [];

    if (tileType.includes('normal') || tileType.includes('regular')) {
      const whiteAndBlackTiles = await prisma.tile.findMany({
        where: {
          color: {
            in: ['white', 'black']
          }
        }
      });
      suggestedTiles = whiteAndBlackTiles.map((tile) => ({
        name: tile.name,
        color: tile.color
      }));
    } else if (tileType.includes('white')) {
      const whiteTiles = await prisma.tile.findMany({
        where: {
          color: 'white'
        }
      });
      suggestedTiles = whiteTiles.map((tile) => ({
        name: tile.name,
        color: tile.color
      }));
    } else if (tileType.includes('black')) {
      const blackTiles = await prisma.tile.findMany({
        where: {
          color: 'black'
        }
      });
      suggestedTiles = blackTiles.map((tile) => ({
        name: tile.name,
        color: tile.color
      }));
    }

    if (useType.includes('commercial')) {
      suggestedTiles = suggestedTiles.filter(tile => tile.color === 'black');
    } else if (useType.includes('home')) {
      suggestedTiles = suggestedTiles.filter(tile => tile.color === 'white');
    }

    if (peopleCount > 10) {
      suggestedTiles = suggestedTiles.filter(tile => tile.color === 'black');
    } else {
      suggestedTiles = suggestedTiles.filter(tile => tile.color === 'white');
    }

    if (colorPreference.includes('white')) {
      suggestedTiles = suggestedTiles.filter(tile => tile.color === 'white');
    } else if (colorPreference.includes('black')) {
      suggestedTiles = suggestedTiles.filter(tile => tile.color === 'black');
    } else {
      suggestedTiles = [
        {
          name: 'Coming Soon',
          color: ''
        }
      ];
    }

    return new Response(JSON.stringify(suggestedTiles), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching tile data:', error);
    return new Response(JSON.stringify({ error: 'Error fetching tile data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
