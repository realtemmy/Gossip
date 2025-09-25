import { Skeleton } from "./ui/skeleton"

type ChatSkeletonProps = {
  count?: number
}

const ChatSkeleton = ({ count = 5 }: ChatSkeletonProps) => {
  return (
    <div className="flex flex-col space-y-3">
      {Array.from({ length: count }).map((_, i) => {
        // alternate left/right
        const align = i % 2 === 0 ? "justify-end" : "justify-start"

        // vary widths (like different message lengths)
        const widths = ["w-1/3", "w-1/2", "w-2/3"]
        const width = widths[i % widths.length]

        return (
          <div key={i} className={`flex ${align}`}>
            <Skeleton className={`h-[30px] ${width} rounded-xl`} />
          </div>
        )
      })}
    </div>
  )
}

export default ChatSkeleton
