'use client';

import { useAppSelector } from '@/lib/hooks';
import React from 'react';
import BoatCard from './boatcard';
import { Loader2 } from 'lucide-react';

export default function FlagshipBoat() {
  const loading = useAppSelector((state) => state.boat.loading);
  const flagshipBoat = useAppSelector((state) => state.boat.flagshipBoat);

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
          Kapal Unggulan Kami
        </h2>
        <p className='text-xl text-gray-600'>
          Pilih dari berbagai jenis kapal yang sesuai dengan kebutuhan Anda
        </p>
      </div>

      {loading ? (
        <div className='text-center py-12'>
          <Loader2 className='h-16 w-16 text-blue-700 mx-auto mb-4 animate-spin' />
          <h3 className='text-xl font-semibold text-gray-900'>
            Memuat data kapal...
          </h3>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {flagshipBoat.map((boat) => (
            <BoatCard key={boat.id} boat={boat} showFullDescription={false} />
          ))}
        </div>
        // <div> boat data loaded</div>
      )}
    </div>
  );
}
