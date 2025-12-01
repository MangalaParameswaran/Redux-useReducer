'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router= useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col items-center gap-4 dark:text-gray-200 font-medium">
      <h1>Welcome to React/Redux Form</h1>
      <div className="flex flex-row gap-4">
        <button onClick={()=>router.push('/redux-form')} className="px-4 py-2 bg-blue-600 text-white rounded">
        Go to Redux form</button>
        <button onClick={()=>router.push('/reducer-form')} className="px-4 py-2 bg-blue-600 text-white rounded">
        Go to usereduce form</button>
      </div>
      </div>
    </div>
  );
}
