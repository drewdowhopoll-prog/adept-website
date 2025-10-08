import { redirect } from 'next/navigation';

export default function UpcomingEventRedirect({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(`/${locale}/events/ok-kult`);
}
