import fs from 'fs'
import { reviewCode } from './reviwer.js'
import { reviewJsonSchema } from './ReviewJsonschema.js'
import { redactSecrets } from './redact-secrets.js'
import { reviewSchema } from './validateSchema.js';
import { failClosedResult } from './failed-closed-result.js';
import { postPRComment } from './postPRComment.js';

async function main(){
    const isGitHubAction = process.env.GITHUB_ACTIONS ==="true";

    console.info({isGitHubAction})


    const diffText = isGitHubAction
    ? fs.readFileSync("pr.diff", "utf-8")
    : fs.readFileSync(0, "utf-8")
    
    console.info({diffText})
    if(!diffText){
        console.error("No diff text provided")
        process.exit(1);
    }

    const redactDIff = redactSecrets(diffText)

    const limitedDiff = redactDIff.slice(0,4000)
    const result = await reviewCode(limitedDiff,reviewJsonSchema)

    let validated;
    try{
    const rawJson = JSON.parse(result.content[0].text)
    validated = reviewSchema.parse(rawJson)
    }catch(error){
     validated = failClosedResult(error)
    }

    if(isGitHubAction){
        await postPRComment(validated)
    }
    else{
        console.log(JSON.stringify(validated,null,2))
    }
}

main().catch((error)=>{
    console.error(error)
    process.exit(1);
}) 