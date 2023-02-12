const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const auth = require("./auth");

// body parser configuration
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

// require database connection 
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const Course = require("./db/courseModel");
const Lesson = require("./db/lessonModel");
const Practice = require("./db/practiceModel");
const PracticeSite = require("./db/practiceSiteModel")
const Quiz = require("./db/quizModel")

// execute database connection 
dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// register endpoint
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })
    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)
        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }
          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords do not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

app.post("/add-course", (request, response) => {
  const course = new Course({
    courseCode: request.body.courseCode,
    courseName: request.body.courseName,
    description: request.body.description,
    duration: request.body.duration,
    lessons: request.body.lessons
  })

  course
    .save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Course Created Successfully",
        result,
      });
    })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating course",
        error,
      });
    });
});

app.post("/add-practice", (request, response) => {
  const practice = new Practice({
    practiceCode: request.body.practiceCode,
    practiceName: request.body.practiceName,
    description: request.body.description,
    duration: request.body.duration
  })

  practice
    .save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Practice Created Successfully",
        result,
      });
    })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating practice",
        error,
      });
    });
});

app.post("/add-lesson", (request, response) => {
  const lesson = new Lesson({
    lessonCode: request.body.lessonCode,
    lessonName: request.body.lessonName,
    description: request.body.description,
    duration: request.body.duration,
    practiceLessons: request.body.practiceLessons
  })

  lesson
    .save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Lesson Created Successfully",
        result,
      });
    })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating lesson",
        error,
      });
    });
});

// Add practice site
app.post("/add-practice-site", (request, response) => {
  const practiceSite = new PracticeSite({
    practiceSiteCode: request.body.practiceSiteCode,
    practiceSiteName: request.body.practiceSiteName,
    description: request.body.description,
    address: request.body.address
  })

  practiceSite
    .save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Practice Site Created Successfully",
        result,
      });
    })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating practice site",
        error,
      });
    });
});

// Add practice site
app.post("/add-quiz", (request, response) => {
  const quiz = new Quiz({
    quizCode: request.body.quizCode,
    quizPrompt: request.body.quizPrompt,
    hint: request.body.hint,
    options: request.body.options,
    answer: request.body.answer,
    lessons: request.body.lessons
  })

  quiz
    .save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Quiz Created Successfully",
        result,
      });
    })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating quiz",
        error,
      });
    });
});

// Experiment : add lessons to courses 
app.post("/add-lesson-to-course", async(request, response) => {
  const lesson = await Lesson.findOne({lessonCode: request.body.lessonCode});
  const course = await Course.findOne({courseCode: request.body.courseCode});
  course.lessons.push(lesson);
  
  course
    .save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Lesson is added to course Successfully",
        result,
      });
    })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error adding lesson to course",
        error,
      });
    });
});

// Experiment : add practicelessons to lessons 
app.post("/add-practice-to-lesson", async(request, response) => {
  const practice = await Practice.findOne({practiceCode: request.body.practiceCode});
  const lesson = await Lesson.findOne({lessonCode: request.body.lessonCode});
  lesson.practiceLessons.push(practice);
  
  lesson
    .save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Practice is added to lesson Successfully",
        result,
      });
    })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error adding practice to lesson",
        error,
      });
    });
});

// Experiment : add user to courses 
app.post("/add-user-to-course", async(request, response) => {
  const course = await Course.findOne({courseCode: request.body.courseCode});
  const user = await User.findOne({email: request.body.userEmail});
  course.courseTakers.push(user);
  
  course
    .save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "User is added to course Successfully",
        result,
      });
    })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error adding user to course",
        error,
      });
    });
});

// Experiment : add practiceSite to practice 
app.post("/add-practicesite-to-practice", async(request, response) => {
  const practicesite = await PracticeSite.findOne({practiceSiteCode: request.body.practiceSiteCode});
  const practice = await Practice.findOne({practiceCode: request.body.practiceCode});
  practice.practiceSites.push(practicesite);
  
  practice
    .save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Practice site is added to practice Successfully",
        result,
      });
    })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error adding practiceSite to practice",
        error,
      });
    });
});

// Experiment : add quiz to lessons 
app.post("/add-quiz-to-lesson", async(request, response) => {
  const quiz = await Quiz.findOne({quizCode: request.body.quizCode});
  const lesson = await Lesson.findOne({lessonCode: request.body.lessonCode});
  lesson.quizzes.push(quiz);
  
  lesson
    .save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Quiz is added to lesson Successfully",
        result,
      });
    })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error adding quiz to lesson",
        error,
      });
    });
});

app.get("/courses", (request, response) =>{
  Course.find({}, function(err, courses){
    response.json(courses);
  });
});

app.get("/lessons", (request, response) =>{
  Lesson.find({}, function(err, lessons){
    response.json(lessons);
  });
});

app.get("/practices", (request, response) =>{
  Practice.find({}, function(err, practices){
    response.json(practices);
  });
});

app.get("/users", (request, response) =>{
  User.find({}, function(err, users){

    response.json(users);
  });
});

app.get("/practice-sites", (request, response) =>{
  PracticeSite.find({}, function(err, practicesites){

    response.json(practicesites);
  });
});

app.get("/courses/:courseCode", async(request, response) => {
  const course = await Course.findOne({courseCode: request.params.courseCode});
  response.json(course);
});

app.get("/lessons/:lessonCode", async(request, response) => {
  const lesson = await Lesson.findOne({lessonCode: request.params.lessonCode});
  response.json(lesson);
});

app.get("/practices/:practiceCode", async(request, response) => {
  const practice = await Practice.findOne({practiceCode: request.params.practiceCode});
  response.json(practice);
});

app.get("/users/:email", async(request, response) => {
  const user = await User.findOne({email: request.params.email});
  response.send(user);
});



// user profile 
app.get("/profile", auth, (request, response) => {
  response.json({message: "Here is the profile page"});
});

// user dashboard
app.get("/dashboard", auth, (request, response) => {
  response.json({message: "Here is the dashboard"});
});

// get dashboard
app.get("/get-dashboard", auth, (request, response) => {
  const user = request.user;
  response.json(user)
});

// courses page 
app.get("/courses-list", (request, response) => {
  response.json({message: "This will be a dynamic page with a list of courses in the database"});
});

// no-auth course page
app.get("/course-page0", (request, response) => {
  response.json({message: "This is a course page accessible without authentication"});
});

// auth course page
app.get("/course-page1", auth, (request, response) => {
  response.json({message: "This is a course page accessible with authentication only"});
});

// lesson page
app.get("/lesson", auth, (request, response) => {
  response.json({message: "This is a lesson page accessible with authentication only"});
});

// practice lesson page
app.get("/practice-lesson", auth, (request, response) => {
  response.json({message: "This is a practice lesson page accessible with authentication only"});
});



module.exports = app;
