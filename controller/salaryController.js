const { pool1, pool2 } = require("../config/db");
const fetchDataAndAddToanotherDb = async (req, res) => {
  try {
    const { name, year, month, day, hour } = req.params;

    const fetchQuery =
      "SELECT * FROM salary WHERE الاسم = ? AND السنة = ? AND الشهر = ? AND اليوم = ? AND الساعة = ?";
    const [salary] = await pool1
      .promise()
      .execute(fetchQuery, [name, year, month, day, hour]);
    if (salary.length === 0) {
      return res.status(400).json({ message: "Data not found." });
    }

    if (salary.length > 0) {
      const insertQuery =
        "INSERT INTO salary (`الاسم`,`السنة`,`الشهر`,`اليوم`,`الساعة`) VALUES (?,?,?,?,?)";

      const values = salary.map((row) => [
        row["الاسم"],
        row["السنة"],
        row["الشهر"],
        row["اليوم"],
        row["الساعة"],
      ]);
      values.map(async (row) => {
        console.log(row);

        await pool2.promise().execute(insertQuery, row);
      });
      res.status(201).json(salary);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  fetchDataAndAddToanotherDb,
};
