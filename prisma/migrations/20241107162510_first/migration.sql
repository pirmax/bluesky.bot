-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "did" TEXT NOT NULL,
    "oldHandle" TEXT NOT NULL,
    "newHandle" TEXT,
    "displayName" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_states" (
    "key" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "auth_states_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "auth_sessions" (
    "key" TEXT NOT NULL,
    "session" TEXT NOT NULL,

    CONSTRAINT "auth_sessions_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_did_key" ON "users"("did");
