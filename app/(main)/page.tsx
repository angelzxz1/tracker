import { HollowCircle } from "@/components/arcs/hollowCircle";
import { LastPurchases } from "@/components/last-purchases";
import { LastTwelveMonths } from "@/components/last-twelve-months";
import { Graphic } from "@/components/main/graphic";
import { Spent } from "@/components/main/spent";
import { initialProfile } from "@/lib/initial-profile";
import { updateStatus } from "@/lib/update-status";

export default async function Home() {
    const profile = await initialProfile();
    await updateStatus(profile);
    return (
        <main className="h-full flex w-full flex-wrap">
            <section className="w-full flex">
                <div className="w-1/3 ">
                    <Spent />
                </div>
                <div className="w-2/3 border-l border-white/45">
                    <Graphic />
                </div>
            </section>
            <section className="w-full flex border-t border-white/45">
                <div className="w-1/3 h-full">
                    <LastPurchases />
                </div>
                <div className="w-2/3 flex border-l border-white/45  h-full">
                    <LastTwelveMonths userId={profile.id} />
                </div>
            </section>
        </main>
    );
}
