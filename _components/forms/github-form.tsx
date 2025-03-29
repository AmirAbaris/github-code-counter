import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

export default function GithubForm() {
  return (
    <section>
      <div className={'relative max-w-3xl mx-auto'}>
        <Input name="repoUrl" type="text"
               placeholder={'GitHub repository URL'}
               required
               className="relative h-14 px-5 rounded-full max-w-3xl mt-8"/>
        <Button
          className="absolute top-1/2 right-5 transform -translate-y-1/2 flex items-center gap-2 px-4 py-2 rounded-full">
          Analyze
          <ArrowRight/>
        </Button>
      </div>
      <p
        className="text-sm text-center text-muted-foreground mt-4">Example: <span
        className={'underline'}>https://github.com/vercel/next.js</span>
      </p>
    </section>
  )
}