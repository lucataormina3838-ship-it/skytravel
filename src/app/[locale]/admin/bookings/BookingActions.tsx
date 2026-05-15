'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateBookingStatus } from './actions';

interface Props {
  bookingId: string;
  currentStatus: string;
}

export default function BookingActions({ bookingId, currentStatus }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateStatus = async (status: string) => {
    setLoading(true);
    await updateBookingStatus(bookingId, status);
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="flex gap-1">
      {currentStatus !== 'confirmed' && (
        <button onClick={() => updateStatus('confirmed')} disabled={loading}
          className="text-xs bg-green-500 hover:bg-green-600 text-white px-2.5 py-1 rounded-lg transition-colors disabled:opacity-50">✓</button>
      )}
      {currentStatus !== 'cancelled' && (
        <button onClick={() => updateStatus('cancelled')} disabled={loading}
          className="text-xs bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded-lg transition-colors disabled:opacity-50">✕</button>
      )}
      {currentStatus !== 'pending' && (
        <button onClick={() => updateStatus('pending')} disabled={loading}
          className="text-xs bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded-lg transition-colors disabled:opacity-50">↺</button>
      )}
    </div>
  );
}
