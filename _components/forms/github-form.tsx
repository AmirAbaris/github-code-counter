'use client';

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {AlertCircle, ArrowRight, Loader2} from "lucide-react";
import {useActionState} from "react";
import {analyzeRepository} from "@/action";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Card, CardContent} from "@/components/ui/card";

export default function GithubForm() {
  const [formState, formAction, pending] = useActionState(analyzeRepository, {
    success: false,
    error: null,
    data: null
  });

  const handleSubmit = async (formData: FormData) => {
    formAction(formData);
  }

  return (
    <section className={'space-y-11'}>
      <form action={handleSubmit}>
        <div className={'relative max-w-3xl mx-auto'}>
          <Input name="repoUrl" type="text"
                 placeholder={'GitHub repository URL'}
                 required
                 className="relative h-14 px-5 rounded-full max-w-3xl mt-8"/>
          <Button
            className="absolute top-1/2 right-5 transform -translate-y-1/2 flex items-center gap-2 px-4 py-2 rounded-full">
            {pending ? (
              <Loader2 className="h-5 w-10 animate-spin"/>
            ) : (
              <>
                Analyze
                <ArrowRight className="ml-2 h-4 w-4"/>
              </>
            )}
          </Button>
        </div>
        <p
          className="text-sm text-center text-muted-foreground mt-4">Example: <span
          className={'underline'}>https://github.com/vercel/next.js</span>
        </p>
      </form>

      {formState.error && (
        <Alert variant="destructive" className="rounded-lg">
          <AlertCircle className="h-4 w-4"/>
          <AlertDescription>{formState.error}</AlertDescription>
        </Alert>
      )}

      {formState.success && formState.data && (
        <Card className="overflow-hidden border-0 shadow-lg rounded-xl bg-gradient-to-b from-white to-gray-50">
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold">{formState.data.repoName}</h2>
                <div className="h-px w-16 bg-gray-200 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-sm text-muted-foreground mb-2">Total Files</p>
                  <p className="text-4xl font-bold">{formState.data.totalFiles.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-sm text-muted-foreground mb-2">Total Lines of Code</p>
                  <p className="text-4xl font-bold">{formState.data.totalLines.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-sm text-muted-foreground mb-4">Language Breakdown</p>
                <div className="space-y-4">
                  {Object.entries(formState.data.languages).map(([language, count]) => (
                    <div key={language} className="relative">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{language}</span>
                        <span>{count.toLocaleString()} lines</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-black rounded-full"
                          style={{
                            width: `${Math.min(100, (count / formState.data!.totalLines) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  )
}