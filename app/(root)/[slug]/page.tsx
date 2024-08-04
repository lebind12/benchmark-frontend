export default function Page({
  params,
  datepick,
}: {
  params: { slug: string };
  datepick: React.ReactNode;
}) {
  return <div>My Post: {params.slug}</div>;
}
