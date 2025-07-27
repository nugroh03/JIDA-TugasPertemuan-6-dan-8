-- CreateTable
CREATE TABLE "boats" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'wisata',
    "capacity" INTEGER NOT NULL,
    "duration" TEXT,
    "price" TEXT NOT NULL,
    "priceNum" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 4.0,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "gallery" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "includes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "destinations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boat_features" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'anchor',
    "boatId" INTEGER NOT NULL,

    CONSTRAINT "boat_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boat_specifications" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "boatId" INTEGER NOT NULL,

    CONSTRAINT "boat_specifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boat_specifications_key_boatId_key" ON "boat_specifications"("key", "boatId");

-- AddForeignKey
ALTER TABLE "boat_features" ADD CONSTRAINT "boat_features_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "boats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boat_specifications" ADD CONSTRAINT "boat_specifications_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "boats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
