export type RepositoryState = {
  success: boolean
  error: string | null
  data: {
    repoName: string
    totalFiles: number
    totalLines: number
    languages: Record<string, number>
  } | null
}