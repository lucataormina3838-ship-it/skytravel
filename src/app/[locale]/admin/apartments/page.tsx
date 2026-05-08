import { createAdminClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/utils';
import { Apartment } from '@/lib/types';
import ApartmentManager from './ApartmentManager';

async function getApartments() {
  const supabase = await createAdminClient();
  const { data } = await supabase.from('apartments').select('*').order('created_at', { ascending: false });
  return (data || []) as Apartment[];
}

export default async function AdminApartmentsPage() {
  const apartments = await getApartments();
  return <ApartmentManager initialApartments={apartments} />;
}
