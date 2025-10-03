export function TypingIndicator({ users }: { users: string[] }) {
  if (users.length === 0) return null;

  const displayText =
    users.length === 1
      ? `${users[0]} is typing...`
      : users.length === 2
      ? `${users[0]} and ${users[1]} are typing...`
      : `${users[0]} and ${users.length - 1} others are typing...`;

  return (
    <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
      <div className="flex gap-1">
        <span className="animate-bounce [animation-delay:-0.3s]">•</span>
        <span className="animate-bounce [animation-delay:-0.15s]">•</span>
        <span className="animate-bounce">•</span>
      </div>
      <span>{displayText}</span>
    </div>
  );
}
