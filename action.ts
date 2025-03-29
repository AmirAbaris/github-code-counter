"use server"

import {Octokit} from "@octokit/rest"
import type {RepositoryState} from "@/types";

export async function analyzeRepository(prevState: RepositoryState, formData: FormData): Promise<RepositoryState> {
  const repoUrl = formData.get("repoUrl") as string

  if (!repoUrl) {
    return {
      success: false,
      error: "Please enter a GitHub repository URL",
      data: null,
    }
  }

  // Extract owner and repo from URL
  let owner, repo
  try {
    const url = new URL(repoUrl)
    const pathSegments = url.pathname.split("/").filter(Boolean)

    if (url.hostname !== "github.com" || pathSegments.length < 2) {
      throw new Error("Invalid GitHub URL")
    }

    owner = pathSegments[0]
    repo = pathSegments[1]
  } catch (error) {
    return {
      success: false,
      error: "Invalid GitHub repository URL. Please use format: https://github.com/username/repository",
      data: null,
    }
  }

  try {
    // Initialize Octokit without token for public repos
    // For private repos or higher rate limits, you would need a token
    const octokit = new Octokit()

    // Get repository information
    const {data: repoData} = await octokit.repos.get({
      owner,
      repo,
    })

    // Get repository contents
    const {data: contents} = await octokit.repos.getContent({
      owner,
      repo,
      path: "",
    })

    // Get language breakdown
    const {data: languagesData} = await octokit.repos.listLanguages({
      owner,
      repo,
    })

    // Calculate total files and lines (this is a simplified approach)
    // For a real implementation, you would need to recursively traverse directories
    // and count lines in each file, which would require multiple API calls
    const totalFiles = Array.isArray(contents) ? contents.length : 0

    // Convert language bytes to approximate lines of code
    // This is a rough estimate - bytes per line varies by language
    const averageBytesPerLine = 40
    const languages: Record<string, number> = {}
    let totalLines = 0

    Object.entries(languagesData).forEach(([language, bytes]) => {
      const lines = Math.round(Number(bytes) / averageBytesPerLine)
      languages[language] = lines
      totalLines += lines
    })

    return {
      success: true,
      error: null,
      data: {
        repoName: repoData.full_name,
        totalFiles,
        totalLines,
        languages,
      },
    }
  } catch (error) {
    console.error("Error analyzing repository:", error)
    return {
      success: false,
      error: "Failed to analyze repository. Please check the URL and try again.",
      data: null,
    }
  }
}

