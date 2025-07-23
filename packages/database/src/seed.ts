import { prisma } from './client';

// Helper function to generate random data
function generateRandomScore(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomFloat(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function generateRandomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

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
      url: "https://gaming-tournament.example.com",
      templateType: "gaming",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      columns: [
        { name: "score", type: "number", sortable: true, required: true, displayName: "Total Score" },
        { name: "kills", type: "number", sortable: true, required: false, displayName: "Kills" },
        { name: "deaths", type: "number", sortable: true, required: false, displayName: "Deaths" },
        { name: "assists", type: "number", sortable: true, required: false, displayName: "Assists" },
        { name: "rank", type: "text", sortable: false, required: false, displayName: "Rank" },
        { name: "playTime", type: "number", sortable: true, required: false, displayName: "Play Time (hrs)" },
        { name: "region", type: "text", sortable: false, required: false, displayName: "Region" },
        { name: "lastActive", type: "date", sortable: true, required: false, displayName: "Last Active" }
      ],
      sortByColumn: "score",
      entries: Array.from({ length: 20 }, (_, i) => ({
        id: `gaming-entry-${i + 1}`,
        name: `Player${i + 1}`,
        score: generateRandomScore(5000, 25000),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Player${i + 1}`,
        data: {
          kills: generateRandomScore(10, 100),
          deaths: generateRandomScore(5, 50),
          assists: generateRandomScore(0, 30),
          rank: ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster"][Math.floor(Math.random() * 7)],
          playTime: generateRandomFloat(10, 200),
          region: ["NA", "EU", "Asia", "SA", "OCE"][Math.floor(Math.random() * 5)],
          lastActive: generateRandomDate(new Date("2024-01-01"), new Date())
        },
        createdAt: generateRandomDate(new Date("2024-01-01"), new Date())
      }))
    },
    {
      title: "Academic Excellence",
      subheading: "Spring Semester 2024",
      description: "Top performing students across all departments",
      url: "https://academic-leaderboard.example.com",
      templateType: "compact",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-05-15"),
      columns: [
        { name: "score", type: "number", sortable: true, required: true, displayName: "GPA" },
        { name: "department", type: "text", sortable: false, required: true, displayName: "Department" },
        { name: "level", type: "number", sortable: true, required: false, displayName: "Year Level" },
        { name: "courses", type: "number", sortable: true, required: false, displayName: "Courses Taken" },
        { name: "attendance", type: "number", sortable: true, required: false, displayName: "Attendance %" },
        { name: "research", type: "boolean", sortable: false, required: false, displayName: "Research Active" },
        { name: "honors", type: "text", sortable: false, required: false, displayName: "Honors" },
        { name: "graduationDate", type: "date", sortable: true, required: false, displayName: "Expected Graduation" }
      ],
      sortByColumn: "score",
      entries: Array.from({ length: 15 }, (_, i) => ({
        id: `academic-entry-${i + 1}`,
        name: `Student${i + 1}`,
        score: generateRandomFloat(3.0, 4.0),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Student${i + 1}`,
        data: {
          department: ["Computer Science", "Mathematics", "Physics", "Engineering", "Biology", "Chemistry", "Psychology"][Math.floor(Math.random() * 7)],
          level: generateRandomScore(1, 4),
          courses: generateRandomScore(4, 8),
          attendance: generateRandomFloat(85, 100),
          research: Math.random() > 0.5,
          honors: Math.random() > 0.7 ? ["Dean's List", "Honors Program", "Research Fellowship"][Math.floor(Math.random() * 3)] : null,
          graduationDate: generateRandomDate(new Date("2024-05-01"), new Date("2027-05-01"))
        },
        createdAt: generateRandomDate(new Date("2024-01-01"), new Date())
      }))
    },
    {
      title: "Sports Championship",
      subheading: "Regional Basketball League",
      description: "Final standings for the 2024 basketball season",
      url: "https://sports-league.example.com",
      templateType: "default",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2024-12-31"),
      columns: [
        { name: "score", type: "number", sortable: true, required: true, displayName: "Points" },
        { name: "team", type: "text", sortable: false, required: true, displayName: "Team Name" },
        { name: "wins", type: "number", sortable: true, required: false, displayName: "Wins" },
        { name: "losses", type: "number", sortable: true, required: false, displayName: "Losses" },
        { name: "winPercentage", type: "number", sortable: true, required: false, displayName: "Win %" },
        { name: "pointsFor", type: "number", sortable: true, required: false, displayName: "Points For" },
        { name: "pointsAgainst", type: "number", sortable: true, required: false, displayName: "Points Against" },
        { name: "lastGame", type: "date", sortable: true, required: false, displayName: "Last Game" }
      ],
      sortByColumn: "score",
      entries: Array.from({ length: 12 }, (_, i) => {
        const wins = generateRandomScore(5, 25);
        const losses = generateRandomScore(0, 20);
        const totalGames = wins + losses;
        const winPercentage = totalGames > 0 ? parseFloat(((wins / totalGames) * 100).toFixed(1)) : 0;
        
        return {
          id: `sports-entry-${i + 1}`,
          name: `Team${i + 1}`,
          score: wins * 2 + (winPercentage > 0.5 ? 1 : 0), // Points calculation
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Team${i + 1}`,
          data: {
            team: `Team ${i + 1}`,
            wins,
            losses,
            winPercentage,
            pointsFor: generateRandomScore(800, 1200),
            pointsAgainst: generateRandomScore(700, 1100),
            lastGame: generateRandomDate(new Date("2024-09-01"), new Date())
          },
          createdAt: generateRandomDate(new Date("2024-09-01"), new Date())
        };
      })
    },
    {
      title: "Coding Competition",
      subheading: "Annual Programming Challenge",
      description: "Top programmers competing in algorithmic challenges",
      url: "https://coding-comp.example.com",
      templateType: "gaming",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-06-01"),
      columns: [
        { name: "score", type: "number", sortable: true, required: true, displayName: "Total Score" },
        { name: "problemsSolved", type: "number", sortable: true, required: false, displayName: "Problems Solved" },
        { name: "submissions", type: "number", sortable: true, required: false, displayName: "Total Submissions" },
        { name: "accuracy", type: "number", sortable: true, required: false, displayName: "Accuracy %" },
        { name: "language", type: "text", sortable: false, required: false, displayName: "Primary Language" },
        { name: "experience", type: "text", sortable: false, required: false, displayName: "Experience Level" },
        { name: "timeSpent", type: "number", sortable: true, required: false, displayName: "Time Spent (hrs)" },
        { name: "joinDate", type: "date", sortable: true, required: false, displayName: "Join Date" }
      ],
      sortByColumn: "score",
      entries: Array.from({ length: 18 }, (_, i) => {
        const problemsSolved = generateRandomScore(5, 25);
        const submissions = generateRandomScore(problemsSolved, problemsSolved * 3);
        const accuracy = submissions > 0 ? parseFloat(((problemsSolved / submissions) * 100).toFixed(1)) : 0;
        
        return {
          id: `coding-entry-${i + 1}`,
          name: `Coder${i + 1}`,
          score: problemsSolved * 100 + Math.floor(accuracy * 10),
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Coder${i + 1}`,
          data: {
            problemsSolved,
            submissions,
            accuracy,
            language: ["Python", "JavaScript", "Java", "C++", "Go", "Rust"][Math.floor(Math.random() * 6)],
            experience: ["Beginner", "Intermediate", "Advanced", "Expert"][Math.floor(Math.random() * 4)],
            timeSpent: generateRandomFloat(20, 150),
            joinDate: generateRandomDate(new Date("2024-01-01"), new Date("2024-03-01"))
          },
          createdAt: generateRandomDate(new Date("2024-03-01"), new Date())
        };
      })
    },
    {
      title: "Sales Performance",
      subheading: "Q4 2024 Sales Leaderboard",
      description: "Top performing sales representatives across all regions",
      url: "https://sales-leaderboard.example.com",
      templateType: "compact",
      startDate: new Date("2024-10-01"),
      endDate: new Date("2024-12-31"),
      columns: [
        { name: "score", type: "number", sortable: true, required: true, displayName: "Sales Revenue" },
        { name: "deals", type: "number", sortable: true, required: false, displayName: "Deals Closed" },
        { name: "region", type: "text", sortable: false, required: true, displayName: "Region" },
        { name: "quota", type: "number", sortable: true, required: false, displayName: "Quota %" },
        { name: "avgDealSize", type: "number", sortable: true, required: false, displayName: "Avg Deal Size" },
        { name: "tenure", type: "number", sortable: true, required: false, displayName: "Tenure (months)" },
        { name: "customerSatisfaction", type: "number", sortable: true, required: false, displayName: "CSAT Score" },
        { name: "lastDeal", type: "date", sortable: true, required: false, displayName: "Last Deal Date" }
      ],
      sortByColumn: "score",
      entries: Array.from({ length: 25 }, (_, i) => {
        const deals = generateRandomScore(5, 50);
        const avgDealSize = generateRandomScore(5000, 50000);
        const revenue = deals * avgDealSize;
        const quota = generateRandomFloat(80, 150);
        
        return {
          id: `sales-entry-${i + 1}`,
          name: `SalesRep${i + 1}`,
          score: revenue,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=SalesRep${i + 1}`,
          data: {
            deals,
            region: ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"][Math.floor(Math.random() * 5)],
            quota,
            avgDealSize,
            tenure: generateRandomScore(6, 60),
            customerSatisfaction: generateRandomFloat(3.5, 5.0),
            lastDeal: generateRandomDate(new Date("2024-10-01"), new Date())
          },
          createdAt: generateRandomDate(new Date("2024-10-01"), new Date())
        };
      })
    }
  ];

  // Create leaderboards
  for (const leaderboardData of leaderboards) {
    const leaderboard = await prisma.leaderboard.create({
      data: {
        title: leaderboardData.title,
        subheading: leaderboardData.subheading,
        description: leaderboardData.description,
        url: leaderboardData.url,
        templateType: leaderboardData.templateType,
        startDate: leaderboardData.startDate,
        endDate: leaderboardData.endDate,
        columns: leaderboardData.columns,
        sortByColumn: leaderboardData.sortByColumn,
        entries: leaderboardData.entries,
        note: "Sample data for testing purposes"
      }
    });

    console.log(`✅ Created leaderboard: ${leaderboard.title} (ID: ${leaderboard.viewId}) with ${leaderboardData.entries.length} entries`);
  }

  console.log('🎉 Database seeded successfully!');
  console.log('\n📋 Sample Leaderboard IDs:');
  
  const allLeaderboards = await prisma.leaderboard.findMany();
  const totalEntries = allLeaderboards.reduce((sum, lb) => sum + (lb.entries as any[]).length, 0);
  
  console.log(`📊 Total leaderboards created: ${allLeaderboards.length}`);
  console.log(`📊 Total entries created: ${totalEntries}`);
  
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
