'use server';

import { createAdminClient } from '@/lib/supabase/server';

function getDatesInRange(start: string, end: string): string[] {
  const dates: string[] = [];
  const current = new Date(start);
  const last = new Date(end);
  while (current < last) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export async function updateBookingStatus(id: string, status: string) {
  const supabase = await createAdminClient();

  const { data: booking } = await supabase.from('bookings').select('*').eq('id', id).single();
  await supabase.from('bookings').update({ status }).eq('id', id);

  if (status === 'cancelled' && booking) {
    const dates = getDatesInRange(booking.start_date, booking.end_date);
    await supabase.from('blocked_dates').delete().eq('item_id', booking.item_id).in('blocked_date', dates);
  }
}
