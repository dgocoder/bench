import Image from "next/image";
import CRDBLogo from "./crdb.png";
import PSLogo from "./pslogo.png";
import { crdb, psdb } from "@/lib/connect";
import { users } from "@/lib/schema";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { usersps } from "@/lib/psschema";

const getPSDBUsersDuration = async () => {
  const now = dayjs();
  await psdb.select().from(usersps).limit(1000);
  const after = dayjs();
  return {
    psUsersDuration: after.diff(now, "milliseconds"),
  };
};

const getPSDBUserDuration = async () => {
  const now = dayjs();
  await crdb.select().from(users).where(eq(users.id, 1));
  const after = dayjs();
  return {
    psUserDuration: after.diff(now, "milliseconds"),
  };
};

const createPSDBUserDuration = async () => {
  const now = dayjs();
  await psdb.insert(usersps).values({
    fullName: (Math.random() + 1).toString(36).substring(7),
    phone: "7867750602",
  });
  const after = dayjs();
  return {
    psCreateUserDuration: after.diff(now, "milliseconds"),
  };
};

const getCRDBUsersDuration = async () => {
  const now = dayjs();
  await crdb.select().from(users).limit(1000);
  const after = dayjs();
  return {
    crUsersDuration: after.diff(now, "milliseconds"),
  };
};

const getCRDBUserDuration = async () => {
  const now = dayjs();
  await crdb.select().from(users).where(eq(users.id, 881938222806564865));
  const after = dayjs();
  return {
    crUserDuration: after.diff(now, "milliseconds"),
  };
};

const createCRDBUserDuration = async () => {
  const now = dayjs();
  await crdb.insert(users).values({
    fullName: (Math.random() + 1).toString(36).substring(7),
    phone: "7867750602",
  });
  const after = dayjs();
  return {
    crCreateUserDuration: after.diff(now, "milliseconds"),
  };
};

export default async function Home() {
  const { crUsersDuration } = await getCRDBUsersDuration();
  const { crUserDuration } = await getCRDBUserDuration();
  const { crCreateUserDuration } = await createCRDBUserDuration();
  const { psUsersDuration } = await getPSDBUsersDuration();
  const { psCreateUserDuration } = await createPSDBUserDuration();
  const { psUserDuration } = await getPSDBUserDuration();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left gap-x-28">
        <div className="flex flex-col items-center gap-y-10">
          <div className="h-40 w-40">
            <Image
              className="relative rounded-full dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src={CRDBLogo}
              alt="Cockroach DB Logo"
            />
          </div>
          <div className="group flex flex-col items-center rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 w-52">
            <h2 className="mb-3 text-2xl font-semibold">{crUserDuration}ms</h2>
            <p className="m-0 max-w-[30ch] text-sm text-neutral-400">
              Get single record by ID
            </p>
          </div>
          <div className="group flex flex-col items-center rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 w-52">
            <h2 className="mb-3 text-2xl font-semibold">{crUsersDuration}ms</h2>
            <p className="m-0 max-w-[30ch] text-sm text-neutral-400">
              Get 1000 records
            </p>
          </div>
          <div className="group flex flex-col items-center rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 w-52">
            <h2 className="mb-3 text-2xl font-semibold">
              {crCreateUserDuration}ms
            </h2>
            <p className="m-0 max-w-[30ch] text-sm text-neutral-400">
              Create Single Record
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-10">
          <div className="h-40 w-40">
            <Image
              className="relative rounded-full dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src={PSLogo}
              alt="Cockroach DB Logo"
            />
          </div>
          <div className="group flex flex-col items-center rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 w-52">
            <h2 className="mb-3 text-2xl font-semibold">{psUserDuration}ms</h2>
            <p className="m-0 max-w-[30ch] text-sm text-neutral-400">
              Get single record by ID
            </p>
          </div>
          <div className="group flex flex-col items-center rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 w-52">
            <h2 className="mb-3 text-2xl font-semibold">{psUsersDuration}ms</h2>
            <p className="m-0 max-w-[30ch] text-sm text-neutral-400">
              Get 1000 records
            </p>
          </div>
          <div className="group flex flex-col items-center rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 w-52">
            <h2 className="mb-3 text-2xl font-semibold">
              {psCreateUserDuration}ms
            </h2>
            <p className="m-0 max-w-[30ch] text-sm text-neutral-400">
              Create Single Record
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
