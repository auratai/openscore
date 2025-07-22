"use client";

import { 
  LeaderboardTemplate, 
  LeaderboardTemplateCompact, 
  LeaderboardTemplateGaming 
} from "@openscore/template";

const sampleEntries = [
  { id: "1", rank: 1, name: "ProGamer123", score: 15420, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer123", metadata: { kills: 45, rank: "Legend" } },
  { id: "2", rank: 2, name: "ElitePlayer", score: 12850, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ElitePlayer", metadata: { kills: 38, rank: "Master" } },
  { id: "3", rank: 3, name: "GameMaster", score: 11200, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GameMaster", metadata: { kills: 32, rank: "Expert" } },
  { id: "4", rank: 4, name: "SkillShot", score: 9850, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SkillShot", metadata: { kills: 28, rank: "Veteran" } },
  { id: "5", rank: 5, name: "PixelWarrior", score: 8750, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PixelWarrior", metadata: { kills: 25, rank: "Advanced" } },
];

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Leaderboard Template Showcase</h1>
        
        <div className="space-y-12">
          {/* Default Template */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Default Template</h2>
            <div className="flex justify-center">
              <LeaderboardTemplate
                entries={sampleEntries}
                title="Gaming Tournament 2024"
                maxEntries={10}
                showRank={true}
                showScore={true}
                showAvatar={true}
              />
            </div>
          </div>

          {/* Compact Template */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Compact Template</h2>
            <div className="flex justify-center">
              <LeaderboardTemplateCompact
                entries={sampleEntries}
                title="Academic Excellence"
                maxEntries={10}
                showRank={true}
                showScore={true}
                showAvatar={true}
              />
            </div>
          </div>

          {/* Gaming Template */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Gaming Template</h2>
            <div className="flex justify-center">
              <LeaderboardTemplateGaming
                entries={sampleEntries}
                title="Ultimate Battle Royale"
                maxEntries={10}
                showRank={true}
                showScore={true}
                showAvatar={true}
              />
            </div>
          </div>
        </div>

        {/* Live Examples */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Live Examples from Database</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Gaming Tournament</h3>
              <p className="text-sm text-gray-600 mb-4">Dark theme with neon accents</p>
              <a 
                href="/leaderboard?id=cmde4nf5g0001itxyz5g85c35" 
                className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                View Live
              </a>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Academic Excellence</h3>
              <p className="text-sm text-gray-600 mb-4">Clean, professional design</p>
              <a 
                href="/leaderboard?id=cmde4nf5w0004itxyvrt3vyul" 
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                View Live
              </a>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Sports Championship</h3>
              <p className="text-sm text-gray-600 mb-4">Default template style</p>
              <a 
                href="/leaderboard?id=cmde4nf5y0007itxybww2azqs" 
                className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                View Live
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 