export default function Page({ params }: { params: { league: string } }) {
  return <div>My Post: {params.league}</div>;
}
