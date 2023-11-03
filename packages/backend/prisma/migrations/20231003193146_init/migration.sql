-- CreateTable
CREATE TABLE "Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://www.pngitem.com/pimgs/m/126-1266633_community-social-group-illustration-group-of-people-vector.png',
    "members" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Message" (
    "groupId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "showedName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Message_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_groupId_key" ON "Message"("groupId");
