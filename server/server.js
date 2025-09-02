const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const mongoURI = 'mongodb+srv://kushagrachaturvedibhargava_db_user:HHTyK3o7VpGylTHb@attendance-system.yjydpc7.mongodb.net/?retryWrites=true&w=majority&appName=attendance-system';

const app = express();
const PORT = 5001;

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // allow both localhost & 127.0.0.1
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(bodyParser.json());

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("<h1>Server is running 🚀</h1>");
});


const studentSchema = new mongoose.Schema({
  name: String,
  usn:String,
  age: String,
  course: String,
  phone: String,
  enrolledAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);


app.post('/api/students', async (req, res) => {
  const { name, usn, age, course, phone } = req.body;

  if (!name ||!usn || !age || !course || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newStudent = new Student({ name, usn, age, course, phone });
    await newStudent.save();
    res.status(200).json({ message: "Student saved to database!" });
  } catch (err) {
    console.error("Error saving student:", err);
    res.status(500).json({ message: "Failed to save student" });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ enrolledAt: -1 });
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Failed to fetch students" });
  }
});


///////////////new log for attence storage////////

app.get('/api/attendance', async (req, res) => {
  try {
    const logs = await AttendanceLog.find().sort({ recognizedAt: -1 });
    res.json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ message: "Failed to fetch attendance logs" });
  }
});


const attendanceLogSchema = new mongoose.Schema({
  usn: String,
  name: String,
  course: String,
  recognizedAt: { type: Date, default: Date.now }
});

const AttendanceLog = mongoose.model('AttendanceLog', attendanceLogSchema);

app.post('/api/attendance', async (req, res) => {
  const { usn, name, course, recognizedAt } = req.body;

  if (!usn) {
    return res.status(400).json({ message: "USN is required" });
  }

  try {
    let student = await Student.findOne({ usn });

    // If no student found, but name & course provided => allow manual entry
    if (!student && (!name || !course)) {
      return res.status(404).json({ message: "Student not found, and insufficient manual data provided" });
    }

    // Determine the current date (or use recognizedAt if provided)
    const today = new Date().toISOString().split('T')[0];
    const recognizedDate = recognizedAt ? new Date(recognizedAt) : new Date();

    // Check for existing attendance on the same day
    const existingLog = await AttendanceLog.findOne({
      usn,
      recognizedAt: {
        $gte: new Date(today),
        $lt: new Date(new Date(today).setDate(new Date(today).getDate() + 1))
      }
    });

    if (existingLog) {
      return res.status(400).json({ message: "Attendance already recorded for today" });
    }

    // Use data from the DB or from manual fields
    const log = new AttendanceLog({
      usn,
      name: student ? student.name : name,
      course: student ? student.course : course,
      recognizedAt: recognizedDate
    });

    await log.save();

    res.status(200).json({ message: "Attendance logged successfully" });
  } catch (err) {
    console.error("Error logging attendance:", err);
    res.status(500).json({ message: "Failed to log attendance" });
  }
});



///////////////////////admin login and signup///////////
const AdminSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const Admin = mongoose.model("Admin", AdminSchema);


app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newAdmin = new Admin({
      username,
      email,
      password, // no hashing
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
/////////////////signin.///////
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Signin successful", admin: { username: admin.username, email: admin.email } });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


const periodwiseAttendanceLogSchema = new mongoose.Schema({
  usn: String,
  name: String,
  course: String,
  period: String,
  recognizedAt: { type: Date, default: Date.now }
});

const PeriodwiseAttendanceLog = mongoose.model('PeriodwiseAttendanceLog', periodwiseAttendanceLogSchema);

// app.post('/api/periodwise-attendance', async (req, res) => {

//   const { usn, recognizedAt } = req.body;

//   console.log("Incoming data:", req.body); // 🔍 Debugging

//   if (!usn) {
//     return res.status(400).json({ message: "USN is required" });
//   }

//   try {
//     const student = await Student.findOne({ usn });

//     if (!student) {
//       console.log("Student not found");
//       return res.status(404).json({ message: "Student not found" });
//     }

//     // const now = recognizedAt ? new Date(recognizedAt) : new Date();
//     // const period = getPeriodForCurrentTime(now);

//     // console.log("Calculated period:", period); // 🔍

//     // if (period === 'No Period') {
//     //   return res.status(400).json({ message: "No valid class period at this time" });
//     // }

//     const now = recognizedAt ? new Date(recognizedAt) : new Date();




// let period = getPeriodForCurrentTime(now);



// console.log("Calculated period:", period);

// if (period === "No Period") {
//   return res.status(400).json({ message: "No valid class period at this time" });
// }


//     const today = new Date(now.toISOString().split('T')[0]);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     const existingLog = await PeriodwiseAttendanceLog.findOne({
//       usn,
//       period,
//       recognizedAt: { $gte: today, $lt: tomorrow }
//     });

//     if (existingLog) {
//       return res.status(400).json({ message: `Attendance already recorded for ${period} today` });
//     }

//     const log = new PeriodwiseAttendanceLog({
//       usn,
//       name: student.name,
//       course: student.course,
//       period,
//       recognizedAt: now
//     });

//     await log.save();

//     const attendanceExists = await AttendanceLog.findOne({
//       usn,
//       recognizedAt: { $gte: today, $lt: tomorrow }
//     });

//     if (!attendanceExists) {
//       const attendanceLog = new AttendanceLog({
//         usn,
//         name: student.name,
//         course: student.course,
//         recognizedAt: now
//       });
//       await attendanceLog.save();
//     }
//     console.log("Successfully saved period-wise attendance:", log); // 🔍

//     res.status(200).json({ message: `Period-wise attendance recorded for ${period}`, log });

//   } catch (err) {
//     console.error("Error logging periodwise attendance:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });



app.post('/api/periodwise-attendance', async (req, res) => {
  const { usn, recognizedAt } = req.body;

  console.log("Incoming data:", req.body); // 🔍 Debugging

  if (!usn) {
    return res.status(400).json({ message: "USN is required" });
  }

  try {
    const student = await Student.findOne({ usn });

    if (!student) {
      console.log("Student not found");
      return res.status(404).json({ message: "Student not found" });
    }

    const now = recognizedAt ? new Date(recognizedAt) : new Date();

    let period = getPeriodForCurrentTime(now);
    console.log("Calculated period:", period);

    if (period === "No Period") {
      return res.status(400).json({ message: "No valid class period at this time" });
    }

    const today = new Date(now.toISOString().split('T')[0]);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const existingLog = await PeriodwiseAttendanceLog.findOne({
      usn,
      period,
      recognizedAt: { $gte: today, $lt: tomorrow }
    });

    if (existingLog) {
      return res.status(400).json({ message: `Attendance already recorded for ${period} today` });
    }

    const log = new PeriodwiseAttendanceLog({
      usn,
      name: student.name,
      course: student.course,
      period,
      recognizedAt: now
    });

    await log.save();

    // ✅ Updated block for AttendanceLog
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const attendanceExists = await AttendanceLog.findOne({
      usn,
      recognizedAt: { $gte: startOfDay, $lte: endOfDay }
    });

    if (!attendanceExists) {
      const attendanceLog = new AttendanceLog({
        usn,
        name: student.name,
        course: student.course,
        recognizedAt: now
      });
      await attendanceLog.save();
      console.log("AttendanceLog created for", usn, "at", now);
    } else {
      console.log("AttendanceLog already exists for", usn, "today");
    }

    console.log("Successfully saved period-wise attendance:", log); // 🔍

    res.status(200).json({ message: `Period-wise attendance recorded for ${period}`, log });

  } catch (err) {
    console.error("Error logging periodwise attendance:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



function getPeriodForCurrentTime(currentTime) {
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  console.log("Current time:", currentTime, "Hours:", hours, "Minutes:", minutes);

  if (hours === 8 && minutes >= 55) return 'React';        // 8:55 AM - 8:59 AM
  if (hours === 10 && minutes < 10) return 'Java';         // 10:00 AM - 10:09 AM
  if (hours === 10 && minutes >= 10 && minutes < 30) return 'Python'; // 10:10 AM - 10:29 AM
  if (hours === 10 && minutes >= 30) return 'AI/ML';       // 10:30 AM - 10:59 AM
  if (hours === 12 && minutes >= 20) return 'Networking';  // 12:20 AM onwards

  return 'No Period';
}

app.get('/api/periodwise-attendance', async(req,res)=>{
try{
  const logs=await PeriodwiseAttendanceLog.find().sort({recognizedAt:-1});
res.json(logs);
}catch{
  console.log("Error fetching periodwise logs:", err);
  res.status(500).json({ message: "Failed to fetch periodwise attendance logs" });
}
});





app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
