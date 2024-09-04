import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../../lib/db";
import { unstable_noStore as noStore } from "next/cache";
import SellForm from "./_components/Sellform";
import { ShieldAlert } from "lucide-react";

// async function getData(userId: string) {
//   const data = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//     select: {
//       stripeConnectedLinked: true,
//     },
//   });

//   if (data?.stripeConnectedLinked === false) {
//     return redirect("/billing");
//   }

//   return null;
// }

export default async function SellRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return (
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
        <Card>
          <CardHeader>
            <div className='flex flex-row items-center mx-auto gap-2'>
              <ShieldAlert color="#ee2020" className='mx-auto'/>
              <CardTitle className='mx-auto'>Unauthorized</CardTitle>
            </div>
          </CardHeader>
        </Card>
      </section>
    )
  }
  // const data = await getData(user.id);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
}
