APIPromise.get("/user",async(req,res)=>{
    const result = await db.query(
        `SELECT * FROM users WHERE id = ${req.query.id} OR age = ${req.query.age}%`
    )
    res.json(result.rows)
})