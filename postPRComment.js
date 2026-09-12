import { Octokit } from "@octokit/rest";
import { toMarkdown } from "./to-markdown";

export async function postPRComment(reviewResult){
   const token = process.env.GH_ACCESS_TOKEN;
   const repo = process.env.REPO;
   const prNumber = Number(process.env.PR_NUNBER);

   if(!token || !repo || !prNumber){
    throw new Error("Missing GITHUB_TOKEN,REPO and PR Number")
   }

   const [owner,repoName] = repo.split("/")
   const octokit = new Octokit({ auth: token })

   const body = toMarkdown(reviewResult)

   await octokit.issues.createComment({
    owner,
    repo: repoName,
    issue_number: prNumber,
    body
   })
}