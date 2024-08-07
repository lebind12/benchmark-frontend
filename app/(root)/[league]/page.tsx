export default function Page({
  params,
}: {
  params: { league: string };
  datepick: React.ReactNode;
}) {
  return <div>My Post: {params.league}</div>;
}
