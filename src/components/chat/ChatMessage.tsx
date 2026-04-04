type Props = {
  role: 'bot' | 'user'
  content: string
}

export default function ChatMessage({ role, content }: Props) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-blue-600 text-white text-sm rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[85%] leading-relaxed">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
        AI
      </div>
      <div className="bg-slate-100 text-slate-800 text-sm rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[85%] leading-relaxed whitespace-pre-line">
        {content}
      </div>
    </div>
  )
}
