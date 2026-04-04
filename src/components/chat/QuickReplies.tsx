type Props = {
  replies: string[]
  onSelect: (reply: string) => void
}

export default function QuickReplies({ replies, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {replies.map((reply) => (
        <button
          key={reply}
          onClick={() => onSelect(reply)}
          className="px-4 py-2 text-sm bg-white border border-blue-200 text-blue-700 rounded-full hover:bg-blue-50 active:scale-95 transition-all duration-150 font-medium"
        >
          {reply}
        </button>
      ))}
    </div>
  )
}
