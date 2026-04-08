const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Notes
const notes = [
  { title: "Meeting", content: "Met German company in 2020" },
  { title: "Tasks", content: "Website redesign tasks list" },
  { title: "Poem", content: "Moon shines in the dark night" }
];

app.post("/ask", (req, res) => {
  console.log("API RUNNING 🔥");

  const query = req.body.query.toLowerCase();

  const results = notes.filter(note =>
    query.split(" ").some(word =>
      note.content.toLowerCase().includes(word)
    )
  );

  if (results.length === 0) {
    return res.json([{ content: "No results found" }]);
  }

  const answer = results.map(n =>
    `Based on your notes: ${n.content}`
  ).join("\n");

  res.json([{ content: answer }]);
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
