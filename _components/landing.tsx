import GithubForm from "@/_components/forms/github-form";
import Image from "next/image";

export default function Landing() {
  return (
    <section>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight">GitHub Code Counter</h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mt-8">
        Analyze any GitHub repository and count the total lines of code
        <span className="block mt-2">
              built with <span className="font-semibold">React</span>, <span className="font-semibold">TypeScript</span>
              , <span className="font-semibold">Tailwind CSS</span>.
            </span>
      </p>
      <GithubForm/>
      <div className={'flex justify-center items-center gap-10 mt-8 mb-4'}>
        <Image src={'/icons/gh.svg'} height={32} width={32} alt={'github'}/>
        <Image src={'/icons/ts.svg'} height={32} width={32} alt={'TS'}/>
        <Image src={'/icons/tailwind.svg'} height={32} width={32} alt={'Tailwind CSS'}/>
      </div>
    </section>
  )
}