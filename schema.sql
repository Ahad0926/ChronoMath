-- 1) DROP TABLES in reverse dependency order
DROP TABLE user_points_log;
DROP TABLE user_notes;
DROP TABLE user_quiz_answers;
DROP TABLE user_quiz_submissions;
DROP TABLE user_lesson_progress;
DROP TABLE quiz_answers;
DROP TABLE quiz_questions;
DROP TABLE quizzes;
DROP TABLE lesson_timeline;
DROP TABLE lessons;
DROP TABLE timeline_edges;
DROP TABLE timeline_nodes;
DROP TABLE user_settings;
DROP TABLE users;

-- 2) CREATE TABLE: USERS
CREATE TABLE users (
  user_id       INTEGER PRIMARY KEY AUTOINCREMENT,
  email         VARCHAR(255) UNIQUE NOT NULL,
  username      VARCHAR(50)  UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  points        INTEGER DEFAULT 0,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3) CREATE TABLE: USER SETTINGS (optional)
CREATE TABLE user_settings (
  user_id               INTEGER PRIMARY KEY,
  theme                 VARCHAR(50) DEFAULT 'light',
  language              VARCHAR(50) DEFAULT 'en',
  notifications_enabled BOOLEAN DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 4) CREATE TABLE: TIMELINE NODES
CREATE TABLE timeline_nodes (
  timeline_node_id INTEGER PRIMARY KEY AUTOINCREMENT,
  era_name         VARCHAR(255) NOT NULL,
  summary          TEXT,
  start_year       INTEGER,
  end_year         INTEGER
);

-- 5) CREATE TABLE: TIMELINE EDGES (for parent->child relationships)
CREATE TABLE timeline_edges (
  parent_id INTEGER NOT NULL,
  child_id  INTEGER NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES timeline_nodes(timeline_node_id),
  FOREIGN KEY (child_id)  REFERENCES timeline_nodes(timeline_node_id),
  PRIMARY KEY (parent_id, child_id)
);

-- 6) CREATE TABLE: LESSONS
CREATE TABLE lessons (
  lesson_id    INTEGER PRIMARY KEY AUTOINCREMENT,
  title        VARCHAR(255) NOT NULL,
  description  TEXT,
  content      TEXT,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7) CREATE TABLE: LESSON <-> TIMELINE (many-to-many)
CREATE TABLE lesson_timeline (
  lesson_id         INTEGER NOT NULL,
  timeline_node_id  INTEGER NOT NULL,
  FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id),
  FOREIGN KEY (timeline_node_id) REFERENCES timeline_nodes(timeline_node_id),
  PRIMARY KEY (lesson_id, timeline_node_id)
);

-- 8) CREATE TABLE: QUIZZES
CREATE TABLE quizzes (
  quiz_id    INTEGER PRIMARY KEY AUTOINCREMENT,
  lesson_id  INTEGER NOT NULL,
  title      VARCHAR(255),
  instructions TEXT,
  FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id)
);

-- 9) CREATE TABLE: QUIZ QUESTIONS
CREATE TABLE quiz_questions (
  question_id   INTEGER PRIMARY KEY AUTOINCREMENT,
  quiz_id       INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_type VARCHAR(50),
  FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id)
);

-- 10) CREATE TABLE: QUIZ ANSWERS
CREATE TABLE quiz_answers (
  answer_id    INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id  INTEGER NOT NULL,
  answer_text  TEXT NOT NULL,
  is_correct   BOOLEAN DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES quiz_questions(question_id)
);

-- 11) CREATE TABLE: USER LESSON PROGRESS
CREATE TABLE user_lesson_progress (
  user_id       INTEGER NOT NULL,
  lesson_id     INTEGER NOT NULL,
  status        VARCHAR(50) DEFAULT 'not_started',
  is_favorite   BOOLEAN DEFAULT 0,
  last_accessed DATETIME,
  progress      INTEGER DEFAULT 0,
  completed_at  DATETIME,
  FOREIGN KEY (user_id)   REFERENCES users(user_id),
  FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id),
  PRIMARY KEY (user_id, lesson_id)
);

-- 12) CREATE TABLE: USER QUIZ SUBMISSIONS
CREATE TABLE user_quiz_submissions (
  submission_id  INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id        INTEGER NOT NULL,
  quiz_id        INTEGER NOT NULL,
  submitted_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  score          INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id)
);

-- 13) CREATE TABLE: USER QUIZ ANSWERS
CREATE TABLE user_quiz_answers (
  submission_id INTEGER NOT NULL,
  question_id   INTEGER NOT NULL,
  chosen_answer INTEGER,
  is_correct    BOOLEAN,
  FOREIGN KEY (submission_id) REFERENCES user_quiz_submissions(submission_id),
  FOREIGN KEY (question_id)   REFERENCES quiz_questions(question_id),
  PRIMARY KEY (submission_id, question_id)
);

-- 14) CREATE TABLE: USER NOTES
CREATE TABLE user_notes (
  note_id       INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id       INTEGER NOT NULL,
  lesson_id     INTEGER,
  note_text     TEXT NOT NULL,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)   REFERENCES users(user_id),
  FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id)
);

-- 15) CREATE TABLE: USER POINTS LOG
CREATE TABLE user_points_log (
  log_id     INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL,
  points     INTEGER NOT NULL,
  reason     VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);