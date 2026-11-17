export const instant = false;

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <section><h2 className="text-2xl font-bold">Edit Meeting {id} — Coming in Week 04</h2></section>;
}
