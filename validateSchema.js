import {z} from "zod"

const findingSchema = z.object({
    id: z.string(),
    title: z.string(),
    severity: z.enum(["none","low","medium","high","critical"]),
    summary: z.string(),
    file_path: z.string(),
    line_number: z.string(),
    evidence: z.string(),
    recommendations: z.string()
})

export const reviewSchema = z.object({
    verdict: z.enum(["pass","warn","fail"]),
    summary: z.string(),
    findings: z.array(findingSchema)
})