import { prisma } from './client';

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.leaderboard.deleteMany();

  // Create sample leaderboards with different template types
  const leaderboards = [
    {
      title: "Gaming Tournament 2024",
      subheading: "Ultimate Battle Royale Championship",
      description: "Compete with players worldwide in this epic gaming tournament!",
      templateType: "gaming",
      columns: [
        { name: "score", type: "number", sortable: true },
        { name: "kills", type: "number", sortable: true },
        { name: "rank", type: "text", sortable: false }
      ],
      sortByColumn: "score",
      entries: [
        {
          id: "entry-1",
          name: "ProGamer123",
          score: 15420,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer123",
          data: { kills: 45, rank: "Legend" },
          createdAt: new Date().toISOString()
        },
        {
          id: "entry-2", 
          name: "ElitePlayer",
          score: 12850,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ElitePlayer",
          data: { kills: 38, rank: "Master" },
          createdAt: new Date().toISOString()
        },
        {
          id: "entry-3",
          name: "GameMaster",
          score: 11200,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GameMaster", 
          data: { kills: 32, rank: "Expert" },
          createdAt: new Date().toISOString()
        },
        {
          id: "entry-4",
          name: "SkillShot",
          score: 9850,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SkillShot",
          data: { kills: 28, rank: "Veteran" },
          createdAt: new Date().toISOString()
        },
        {
          id: "entry-5",
          name: "PixelWarrior",
          score: 8750,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PixelWarrior",
          data: { kills: 25, rank: "Advanced" },
          createdAt: new Date().toISOString()
        }
      ]
    },
    {
      title: "Academic Excellence",
      subheading: "Spring Semester 2024",
      description: "Top performing students across all departments",
      templateType: "compact",
      columns: [
        { name: "score", type: "number", sortable: true },
        { name: "department", type: "text", sortable: false },
        { name: "level", type: "number", sortable: true }
      ],
      sortByColumn: "score",
      entries: [
        {
          id: "entry-1",
          name: "Sarah Johnson",
          score: 98.5,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          data: { department: "Computer Science", level: 4 },
          createdAt: new Date().toISOString()
        },
        {
          id: "entry-2",
          name: "Michael Chen",
          score: 97.2,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
          data: { department: "Mathematics", level: 3 },
          createdAt: new Date().toISOString()
        },
        {
          id: "entry-3",
          name: "Emily Rodriguez",
          score: 96.8,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
          data: { department: "Physics", level: 4 },
          createdAt: new Date().toISOString()
        },
        {
          id: "entry-4",
          name: "David Kim",
          score: 95.9,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
          data: { department: "Engineering", level: 3 },
          createdAt: new Date().toISOString()
        },
        {
          id: "entry-5",
          name: "Lisa Wang",
          score: 94.7,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
          data: { department: "Biology", level: 2 },
          createdAt: new Date().toISOString()
        }
      ]
    },
    {
      title: "Sports Championship",
      subheading: "Regional Basketball League",
      description: "Final standings for the 2024 basketball season",
      templateType: "default",
      columns: [
        { name: "score", type: "number", sortable: true },
        { name: "team", type: "text", sortable: false },
        { name: "wins", type: "number", sortable: true }
      ],
      sortByColumn: "score",
      entries: [
        {
          id: "entry-1",
          name: "Thunder Hawks",
          score: 28,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thunder",
          data: { team: "Hawks", wins: 28 },
          createdAt: new Date().toISOString()
        },
        {
          id: "entry-2",
          name: "Lightning Lions",
          score: 25,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lightning",
          data: { team: "Lions", wins: 25 },
          createdAt: new Date().toISOString()
        },
        {
          id: "entry-3",
          name: "Storm Eagles",
          score: 22,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Storm",
          data: { team: "Eagles", wins: 22 },
          createdAt: new Date().toISOString()
        },
        {
          id: "entry-4",
          name: "Blaze Bears",
          score: 19,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Blaze",
          data: { team: "Bears", wins: 19 },
          createdAt: new Date().toISOString()
        },
        {
          id: "entry-5",
          name: "Frost Wolves",
          score: 16,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frost",
          data: { team: "Wolves", wins: 16 },
          createdAt: new Date().toISOString()
        }
      ]
    }
  ];

  // Create leaderboards
  for (const leaderboardData of leaderboards) {
    const leaderboard = await prisma.leaderboard.create({
      data: {
        title: leaderboardData.title,
        subheading: leaderboardData.subheading,
        description: leaderboardData.description,
        templateType: leaderboardData.templateType,
        columns: leaderboardData.columns,
        sortByColumn: leaderboardData.sortByColumn,
        entries: leaderboardData.entries,
        note: "Sample data for testing purposes"
      }
    });

    console.log(`✅ Created leaderboard: ${leaderboard.title} (ID: ${leaderboard.viewId})`);
  }

  console.log('🎉 Database seeded successfully!');
  console.log('\n📋 Sample Leaderboard IDs:');
  
  const allLeaderboards = await prisma.leaderboard.findMany();
  allLeaderboards.forEach(lb => {
    console.log(`- ${lb.title}: /leaderboard?id=${lb.viewId}`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
