-- CreateTable
CREATE TABLE "leaderboards" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subheading" TEXT,
    "description" TEXT,
    "url" TEXT,
    "note" TEXT,
    "templateType" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "columns" JSONB NOT NULL DEFAULT '[]',
    "sortByColumn" TEXT,
    "entries" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "leaderboards_pkey" PRIMARY KEY ("id")
);
