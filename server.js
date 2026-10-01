const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve your frontend
app.use(express.static(path.join(__dirname, "public")));

// Database
const db = new sqlite3.Database("./elora.db", (err) => {
    if (err) {
        console.error("Database error:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Create table
db.run(`
    CREATE TABLE IF NOT EXISTS design_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        clothing TEXT,
        budget TEXT,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {
    if (err) {
        console.error("Table creation error:", err.message);
    } else {
        console.log("Design request table ready.");
    }
});


// ======================================
// RECEIVE DESIGN REQUEST
// ======================================

app.post("/api/design-request", (req, res) => {

    const {
        name,
        email,
        clothing,
        budget,
        message
    } = req.body;

    // Validation
    if (!name || !email || !message) {

        return res.status(400).json({
            success: false,
            message: "Please fill in all required fields."
        });

    }

    const sql = `
        INSERT INTO design_requests
        (name, email, clothing, budget, message)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [
            name,
            email,
            clothing || "",
            budget || "",
            message
        ],
        function (err) {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Unable to save your request."
                });

            }

            res.json({
                success: true,
                message: "Your design request has been submitted!",
                requestId: this.lastID
            });

        }
    );

});


// ======================================
// GET ALL DESIGN REQUESTS
// ======================================

app.get("/api/design-requests", (req, res) => {

    db.all(
        `SELECT * FROM design_requests ORDER BY created_at DESC`,
        [],
        (err, rows) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Unable to retrieve requests."
                });

            }

            res.json({
                success: true,
                requests: rows
            });

        }
    );

});


// ======================================
// GET ONE DESIGN REQUEST
// ======================================

app.get("/api/design-request/:id", (req, res) => {

    const id = req.params.id;

    db.get(
        `SELECT * FROM design_requests WHERE id = ?`,
        [id],
        (err, row) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Database error."
                });

            }

            if (!row) {

                return res.status(404).json({
                    success: false,
                    message: "Design request not found."
                });

            }

            res.json({
                success: true,
                request: row
            });

        }
    );

});


// ======================================
// DELETE REQUEST
// ======================================

app.delete("/api/design-request/:id", (req, res) => {

    const id = req.params.id;

    db.run(
        `DELETE FROM design_requests WHERE id = ?`,
        [id],
        function (err) {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Unable to delete request."
                });

            }

            if (this.changes === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Request not found."
                });

            }

            res.json({
                success: true,
                message: "Request deleted successfully."
            });

        }
    );

});


// ======================================
// START SERVER
// ======================================

app.listen(PORT, () => {

    console.log(`
========================================
   ELORA FASHION WEBSITE
========================================

Server running at:

http://localhost:${PORT}

========================================
    `);

});
