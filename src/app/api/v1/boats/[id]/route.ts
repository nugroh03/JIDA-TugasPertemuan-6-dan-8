// import { NextRequest, NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';
// import { Boat } from '@/types';

// type RouteContext = {
//   params: Promise<{ id: string }>;
// };

// // Path ke file JSON
// const dataFilePath = path.join(process.cwd(), 'src', 'data', 'boats.json');

// // Fungsi untuk membaca data dari file JSON
// function readBoatsData() {
//   try {
//     const fileContents = fs.readFileSync(dataFilePath, 'utf8');
//     return JSON.parse(fileContents);
//   } catch (error) {
//     console.error('Error reading boats data:', error);
//     return [];
//   }
// }

// // Fungsi untuk menyimpan data ke file JSON
// function writeBoatsData(data: Boat[]) {
//   try {
//     // Pastikan direktori data ada
//     const dataDir = path.dirname(dataFilePath);
//     if (!fs.existsSync(dataDir)) {
//       fs.mkdirSync(dataDir, { recursive: true });
//     }

//     fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
//     return true;
//   } catch (error) {
//     console.error('Error writing boats data:', error);
//     return false;
//   }
// }

// export async function GET(request: NextRequest, context: RouteContext) {
//   const params = await context.params;
//   const id = parseInt(params.id, 10);

//   if (isNaN(id)) {
//     return NextResponse.json(
//       {
//         statusCode: 400,
//         message: 'Format ID tidak valid',
//         data: null,
//       },
//       { status: 400 }
//     );
//   }

//   const boats = readBoatsData();
//   const boat = boats.find((b: Boat) => b.id === id);

//   if (!boat) {
//     return NextResponse.json(
//       {
//         statusCode: 404,
//         message: `Perahu dengan id ${id} tidak ditemukan`,
//         data: null,
//       },
//       { status: 404 }
//     );
//   }

//   return NextResponse.json({
//     statusCode: 200,
//     message: `Perahu dengan id ${id} berhasil ditemukan`,
//     data: boat,
//   });
// }

// export async function PUT(request: NextRequest, context: RouteContext) {
//   const params = await context.params;
//   const id = parseInt(params.id, 10);

//   if (isNaN(id)) {
//     return NextResponse.json(
//       {
//         statusCode: 400,
//         message: 'Format ID tidak valid',
//         data: null,
//       },
//       { status: 400 }
//     );
//   }

//   // Baca data terbaru dari file
//   const boats = readBoatsData();
//   const boatIndex = boats.findIndex((b: Boat) => b.id === id);

//   if (boatIndex === -1) {
//     return NextResponse.json(
//       {
//         statusCode: 404,
//         message: `Perahu dengan id ${id} tidak ditemukan`,
//         data: null,
//       },
//       { status: 404 }
//     );
//   }

//   try {
//     const updatedData = await request.json();

//     // Update data di array
//     boats[boatIndex] = { ...boats[boatIndex], ...updatedData };

//     // Simpan perubahan ke file JSON
//     const saveSuccess = writeBoatsData(boats);

//     if (!saveSuccess) {
//       return NextResponse.json(
//         {
//           statusCode: 500,
//           message: 'Gagal menyimpan perubahan ke database',
//           data: null,
//         },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({
//       statusCode: 200,
//       message: `Perahu dengan id ${id} berhasil diperbarui`,
//       data: boats[boatIndex],
//     });
//   } catch (error) {
//     console.error('Error updating boat:', error);
//     return NextResponse.json(
//       {
//         statusCode: 500,
//         message: 'Terjadi kesalahan saat memperbarui data',
//         data: null,
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: NextRequest, context: RouteContext) {
//   const params = await context.params;
//   const id = parseInt(params.id, 10);

//   if (isNaN(id)) {
//     return NextResponse.json(
//       {
//         statusCode: 400,
//         message: 'Format ID tidak valid',
//         data: null,
//       },
//       { status: 400 }
//     );
//   }

//   // Baca data terbaru dari file
//   const boats = readBoatsData();
//   const boatIndex = boats.findIndex((b: Boat) => b.id === id);

//   if (boatIndex === -1) {
//     return NextResponse.json(
//       {
//         statusCode: 404,
//         message: `Perahu dengan id ${id} tidak ditemukan`,
//         data: null,
//       },
//       { status: 404 }
//     );
//   }

//   try {
//     // Hapus data dari array
//     const deletedBoat = boats.splice(boatIndex, 1)[0];

//     // Simpan perubahan ke file JSON
//     const saveSuccess = writeBoatsData(boats);

//     if (!saveSuccess) {
//       return NextResponse.json(
//         {
//           statusCode: 500,
//           message: 'Gagal menyimpan perubahan ke database',
//           data: null,
//         },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({
//       statusCode: 200,
//       message: `Perahu dengan id ${id} berhasil dihapus`,
//       data: deletedBoat,
//     });
//   } catch (error) {
//     console.error('Error deleting boat:', error);
//     return NextResponse.json(
//       {
//         statusCode: 500,
//         message: 'Terjadi kesalahan saat menghapus data',
//         data: null,
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BoatFeature } from '@prisma/client';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const params = await context.params;
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json(
      {
        statusCode: 400,
        message: 'Format ID tidak valid',
        data: null,
      },
      { status: 400 }
    );
  }

  try {
    const boat = await prisma.boat.findUnique({
      where: { id },
      include: {
        features: true,
        specifications: true,
      },
    });

    if (!boat) {
      return NextResponse.json(
        {
          statusCode: 404,
          message: `Perahu dengan id ${id} tidak ditemukan`,
          data: null,
        },
        { status: 404 }
      );
    }

    // Transform data untuk sesuai dengan interface frontend
    const transformedBoat = {
      ...boat,
      specifications: boat.specifications.reduce((acc, spec) => {
        acc[spec.key] = spec.value;
        return acc;
      }, {} as Record<string, string>),
    };

    return NextResponse.json({
      statusCode: 200,
      message: `Perahu dengan id ${id} berhasil ditemukan`,
      data: transformedBoat,
    });
  } catch (error) {
    console.error('Error in GET /api/v1/boats/[id]:', error);
    return NextResponse.json(
      {
        statusCode: 500,
        message: 'Terjadi kesalahan saat mengambil data kapal',
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const params = await context.params;
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json(
      {
        statusCode: 400,
        message: 'Format ID tidak valid',
        data: null,
      },
      { status: 400 }
    );
  }

  try {
    // Cek apakah kapal exists
    const existingBoat = await prisma.boat.findUnique({
      where: { id },
    });

    if (!existingBoat) {
      return NextResponse.json(
        {
          statusCode: 404,
          message: `Perahu dengan id ${id} tidak ditemukan`,
          data: null,
        },
        { status: 404 }
      );
    }

    const updatedData = await request.json();
    const { features = [], specifications = {}, ...boatData } = updatedData;

    // Update kapal dengan transaction untuk konsistensi data
    const updatedBoat = await prisma.$transaction(async (tx) => {
      // Update data utama kapal
      await tx.boat.update({
        where: { id },
        data: {
          ...boatData,
          updatedAt: new Date(),
        },
      });

      // Hapus features lama dan buat yang baru
      await tx.boatFeature.deleteMany({
        where: { boatId: id },
      });

      if (features.length > 0) {
        await tx.boatFeature.createMany({
          data: features
            .filter((f: BoatFeature) => f.name.trim())
            .map((feature: BoatFeature) => ({
              name: feature.name,
              icon: feature.icon || 'anchor',
              boatId: id,
            })),
        });
      }

      // Hapus specifications lama dan buat yang baru
      await tx.boatSpecification.deleteMany({
        where: { boatId: id },
      });

      if (Object.keys(specifications).length > 0) {
        await tx.boatSpecification.createMany({
          data: Object.entries(specifications).map(([key, value]) => ({
            key,
            value: value as string,
            boatId: id,
          })),
        });
      }

      // Return data lengkap dengan relasi
      return await tx.boat.findUnique({
        where: { id },
        include: {
          features: true,
          specifications: true,
        },
      });
    });

    // Transform response
    const transformedBoat = {
      ...updatedBoat,
      specifications: updatedBoat!.specifications.reduce((acc, spec) => {
        acc[spec.key] = spec.value;
        return acc;
      }, {} as Record<string, string>),
    };

    return NextResponse.json({
      statusCode: 200,
      message: `Perahu dengan id ${id} berhasil diperbarui`,
      data: transformedBoat,
    });
  } catch (error) {
    console.error('Error in PUT /api/v1/boats/[id]:', error);
    return NextResponse.json(
      {
        statusCode: 500,
        message: 'Terjadi kesalahan saat memperbarui data kapal',
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const params = await context.params;
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json(
      {
        statusCode: 400,
        message: 'Format ID tidak valid',
        data: null,
      },
      { status: 400 }
    );
  }

  try {
    // Cek apakah kapal exists
    const existingBoat = await prisma.boat.findUnique({
      where: { id },
      include: {
        features: true,
        specifications: true,
      },
    });

    if (!existingBoat) {
      return NextResponse.json(
        {
          statusCode: 404,
          message: `Perahu dengan id ${id} tidak ditemukan`,
          data: null,
        },
        { status: 404 }
      );
    }

    // Hapus kapal (cascade akan menghapus features dan specifications)
    await prisma.boat.delete({
      where: { id },
    });

    // Transform data untuk response
    const transformedBoat = {
      ...existingBoat,
      specifications: existingBoat.specifications.reduce((acc, spec) => {
        acc[spec.key] = spec.value;
        return acc;
      }, {} as Record<string, string>),
    };

    return NextResponse.json({
      statusCode: 200,
      message: `Perahu dengan id ${id} berhasil dihapus`,
      data: transformedBoat,
    });
  } catch (error) {
    console.error('Error in DELETE /api/v1/boats/[id]:', error);
    return NextResponse.json(
      {
        statusCode: 500,
        message: 'Terjadi kesalahan saat menghapus data kapal',
        data: null,
      },
      { status: 500 }
    );
  }
}
