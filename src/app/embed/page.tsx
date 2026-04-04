import { supabase } from '@/lib/supabase'
import ChatWindow from '@/components/chat/ChatWindow'

type Props = {
  searchParams: Promise<{ tenant?: string }>
}

export default async function EmbedPage({ searchParams }: Props) {
  const { tenant: slug } = await searchParams

  if (!slug) {
    return (
      <div className="flex items-center justify-center h-screen text-sm text-slate-500">
        Missing tenant parameter.
      </div>
    )
  }

  const { data: tenant } = await supabase
    .from('tenants')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!tenant) {
    return (
      <div className="flex items-center justify-center h-screen text-sm text-slate-500">
        Office not found.
      </div>
    )
  }

  return (
    <div className="flex items-end justify-end min-h-screen p-4 bg-transparent">
      <div className="w-full max-w-sm">
        <ChatWindow tenantId={tenant.id} />
      </div>
    </div>
  )
}
