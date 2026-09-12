APIPromise.get("/user",async(req,res)=>{
    const result = await db.query(
        `SELECT * FROM users WHERE id = ${req.query.id} OR name=${req.query.name}`
    )
    res.json(result.rows)
})