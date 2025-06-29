export type Channel = {
  id: string;
  name: string;
  type: "channel" | "dm";
  members?: number;
}
