import { createAdminClient } from '@/lib/supabase/server';
import { Pack } from '@/lib/types';
import PackManager from './PackManager';

async function getPacks() {
  const supabase = await createAdminClient();
  const { data } = await supabase.from('packs').select('*').order('created_at', { ascending: false });
  return (data || []) as Pack[];
}

export default async function AdminPacksPage() {
  const packs = await getPacks();
  return <PackManager initialPacks={packs} />;
}
