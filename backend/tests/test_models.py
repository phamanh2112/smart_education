"""
TDD Tests — Models

Tests for all domain models following TDD:
1. Write test first (RED)
2. Implement model (GREEN)
3. Refactor
"""

import pytest
from datetime import datetime, date
from decimal import Decimal


# ─── User Model ──────────────────────────────────────────────────────────────

class TestUserModel:
    """Tests for User model creation and behavior."""

    def test_create_teacher(self, sample_user_data):
        """A teacher user should have role='teacher'."""
        user = FakeUser(**sample_user_data)
        assert user.role == 'teacher'
        assert user.is_teacher() is True
        assert user.is_student() is False

    def test_create_student(self, sample_student_data):
        """A student user should have role='student'."""
        user = FakeUser(**sample_student_data)
        assert user.role == 'student'
        assert user.is_student() is True
        assert user.is_teacher() is False

    def test_password_hashing(self, sample_user_data):
        """Password should be stored hashed, never in plain text."""
        user = FakeUser(**sample_user_data)
        user.set_password('MySecretPass')
        assert user.password_hash != 'MySecretPass'
        assert user.check_password('MySecretPass') is True
        assert user.check_password('WrongPass') is False

    def test_email_uniqueness(self, sample_user_data):
        """No two users should share the same email."""
        user1 = FakeUser(**sample_user_data)
        with pytest.raises(ValueError, match='Email already exists'):
            FakeUser(email=sample_user_data['email'])

    def test_full_name(self, sample_user_data):
        """Full name should combine first and last name."""
        user = FakeUser(**sample_user_data)
        assert user.get_full_name() == 'John Doe'

    def test_default_is_active(self, sample_user_data):
        """New users should be active by default."""
        user = FakeUser(**sample_user_data)
        assert user.is_active is True

    def test_string_representation(self, sample_user_data):
        """String representation should show name and email."""
        user = FakeUser(**sample_user_data)
        assert str(user) == 'John Doe (john@example.com)'


# ─── Course Model ────────────────────────────────────────────────────────────

class TestCourseModel:
    """Tests for Course model creation and behavior."""

    def test_create_course(self, sample_course_data, sample_user_data):
        """A course requires a title, description, and teacher."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        assert course.title == 'Python for Beginners'
        assert course.teacher.name == 'John Doe'
        assert course.status == 'draft'

    def test_course_slug_generated(self, sample_course_data, sample_user_data):
        """Slug should be auto-generated from title."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        assert course.slug == 'python-for-beginners'

    def test_course_default_price_zero(self, sample_user_data):
        """Free courses should have price = 0."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, title='Free Course')
        assert course.price == Decimal('0')

    def test_publish_course(self, sample_course_data, sample_user_data):
        """Course status should change from draft to published."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        course.publish()
        assert course.status == 'published'

    def test_course_enrollment_count_default(self, sample_course_data, sample_user_data):
        """New courses should have zero enrollments."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        assert course.enrollment_count == 0

    def test_course_string_representation(self, sample_course_data, sample_user_data):
        """String representation should show title."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        assert str(course) == 'Python for Beginners'


# ─── Lesson Model ────────────────────────────────────────────────────────────

class TestLessonModel:
    """Tests for Lesson model."""

    def test_create_lesson(self, sample_lesson_data, sample_course_data, sample_user_data):
        """Lesson should belong to a course with correct ordering."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        lesson = FakeLesson(course=course, **sample_lesson_data)
        assert lesson.title == 'Variables and Data Types'
        assert lesson.order == 1
        assert lesson.course.title == 'Python for Beginners'

    def test_lesson_order_unique_per_course(self, sample_lesson_data, sample_course_data, sample_user_data):
        """No two lessons in the same course should share order number."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        FakeLesson(course=course, **sample_lesson_data)
        with pytest.raises(ValueError, match='Order already exists'):
            FakeLesson(course=course, order=sample_lesson_data['order'])

    def test_lesson_duration_positive(self, sample_lesson_data, sample_course_data, sample_user_data):
        """Lesson duration must be positive."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        with pytest.raises(ValueError, match='Duration must be positive'):
            FakeLesson(course=course, **{**sample_lesson_data, 'duration_minutes': -5})

    def test_lesson_ordering(self, sample_course_data, sample_user_data):
        """Lessons should be ordered by the order field."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        l1 = FakeLesson(course=course, order=2)
        l2 = FakeLesson(course=course, order=1)
        ordered = sorted([l1, l2], key=lambda l: l.order)
        assert ordered[0].order == 1
        assert ordered[1].order == 2

    def test_lesson_content_type_valid(self, sample_lesson_data, sample_course_data, sample_user_data):
        """Content type must be one of: video, pdf, text, embed."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        valid_types = ['video', 'pdf', 'text', 'embed']
        for ct in valid_types:
            lesson = FakeLesson(course=course, content_type=ct)
            assert lesson.content_type == ct
        with pytest.raises(ValueError, match='Invalid content type'):
            FakeLesson(course=course, content_type='exe')


# ─── Quiz & Question ─────────────────────────────────────────────────────────

class TestQuizModel:
    """Tests for Quiz model."""

    def test_create_quiz(self, sample_quiz_data, sample_lesson_data, sample_course_data, sample_user_data):
        """Quiz should belong to a lesson."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        lesson = FakeLesson(course=course, **sample_lesson_data)
        quiz = FakeQuiz(lesson=lesson, **sample_quiz_data)
        assert quiz.title == 'Python Basics Quiz'
        assert quiz.lesson.title == 'Variables and Data Types'

    def test_quiz_passing_score_default(self, sample_lesson_data, sample_course_data, sample_user_data):
        """Default passing score should be 70."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        lesson = FakeLesson(course=course, **sample_lesson_data)
        quiz = FakeQuiz(lesson=lesson)
        assert quiz.passing_score == 70

    def test_quiz_is_passed(self, sample_quiz_data, sample_lesson_data, sample_course_data, sample_user_data):
        """Quiz should correctly determine if a score passes."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        lesson = FakeLesson(course=course, **sample_lesson_data)
        quiz = FakeQuiz(lesson=lesson, **sample_quiz_data)
        assert quiz.is_passed(85) is True
        assert quiz.is_passed(60) is False
        assert quiz.is_passed(70) is True  # boundary

    def test_calculate_total_points(self, sample_quiz_data, sample_lesson_data, sample_course_data, sample_user_data):
        """Total points should sum all question points."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        lesson = FakeLesson(course=course, **sample_lesson_data)
        quiz = FakeQuiz(lesson=lesson, **sample_quiz_data)
        quiz.add_question(FakeQuestion(points=10))
        quiz.add_question(FakeQuestion(points=20))
        quiz.add_question(FakeQuestion(points=15))
        assert quiz.total_points == 45


class TestQuestionModel:
    """Tests for Question model."""

    def test_create_mcq(self, sample_question_data, sample_quiz_data, sample_lesson_data,
                        sample_course_data, sample_user_data):
        """MCQ should have options array and a correct answer."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        lesson = FakeLesson(course=course, **sample_lesson_data)
        quiz = FakeQuiz(lesson=lesson, **sample_quiz_data)
        question = FakeQuestion(quiz=quiz, **sample_question_data)
        assert len(question.options) == 4
        assert question.correct_answer in question.options

    def test_check_answer_correct(self, sample_question_data, sample_quiz_data,
                                   sample_lesson_data, sample_course_data, sample_user_data):
        """check_answer should return True for correct answer."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        lesson = FakeLesson(course=course, **sample_lesson_data)
        quiz = FakeQuiz(lesson=lesson, **sample_quiz_data)
        question = FakeQuestion(quiz=quiz, **sample_question_data)
        assert question.check_answer('8') is True

    def test_check_answer_wrong(self, sample_question_data, sample_quiz_data,
                                 sample_lesson_data, sample_course_data, sample_user_data):
        """check_answer should return False for wrong answer."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        lesson = FakeLesson(course=course, **sample_lesson_data)
        quiz = FakeQuiz(lesson=lesson, **sample_quiz_data)
        question = FakeQuestion(quiz=quiz, **sample_question_data)
        assert question.check_answer('5') is False


# ─── Assignment & Submission ────────────────────────────────────────────────

class TestAssignmentModel:
    """Tests for Assignment model."""

    def test_create_assignment(self, sample_assignment_data, sample_course_data, sample_user_data):
        """Assignment should belong to a course with due date."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        assignment = FakeAssignment(course=course, **sample_assignment_data)
        assert assignment.title == 'Week 1 Assignment'
        assert assignment.due_date == date(2026, 7, 15)

    def test_assignment_is_past_due(self, sample_assignment_data, sample_course_data, sample_user_data):
        """is_past_due should check against current date."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        past = FakeAssignment(course=course, due_date=date(2020, 1, 1))
        future = FakeAssignment(course=course, due_date=date(2030, 1, 1))
        assert past.is_past_due() is True
        assert future.is_past_due() is False

    def test_assignment_max_score_positive(self, sample_assignment_data, sample_course_data, sample_user_data):
        """Max score should be positive."""
        teacher = FakeUser(**sample_user_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        with pytest.raises(ValueError, match='Max score must be positive'):
            FakeAssignment(course=course, **{**sample_assignment_data, 'max_score': -10})


class TestSubmissionModel:
    """Tests for Submission model."""

    def test_create_submission(self, sample_submission_data, sample_assignment_data,
                                sample_course_data, sample_user_data, sample_student_data):
        """Student should be able to submit an assignment."""
        teacher = FakeUser(**sample_user_data)
        student = FakeUser(**sample_student_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        assignment = FakeAssignment(course=course, **sample_assignment_data)
        submission = FakeSubmission(assignment=assignment, student=student, **sample_submission_data)
        assert submission.status == 'pending'
        assert submission.student.name == 'Jane Smith'

    def test_grade_submission(self, sample_submission_data, sample_assignment_data,
                               sample_course_data, sample_user_data, sample_student_data):
        """Grading should update score and status."""
        teacher = FakeUser(**sample_user_data)
        student = FakeUser(**sample_student_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        assignment = FakeAssignment(course=course, **sample_assignment_data)
        submission = FakeSubmission(assignment=assignment, student=student, **sample_submission_data)
        submission.grade(score=85, feedback='Good work!', graded_by=teacher)
        assert submission.score == 85
        assert submission.status == 'graded'
        assert submission.feedback == 'Good work!'

    def test_submission_score_within_range(self, sample_submission_data, sample_assignment_data,
                                             sample_course_data, sample_user_data, sample_student_data):
        """Score should not exceed max_score."""
        teacher = FakeUser(**sample_user_data)
        student = FakeUser(**sample_student_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        assignment = FakeAssignment(course=course, **sample_assignment_data)
        submission = FakeSubmission(assignment=assignment, student=student, **sample_submission_data)
        with pytest.raises(ValueError, match='Score exceeds maximum'):
            submission.grade(score=150, feedback='', graded_by=teacher)

    def test_submission_late_detection(self, sample_submission_data, sample_assignment_data,
                                        sample_course_data, sample_user_data, sample_student_data):
        """Late submissions should be flagged."""
        teacher = FakeUser(**sample_user_data)
        student = FakeUser(**sample_student_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        assignment_data = {**sample_assignment_data, 'due_date': date(2020, 1, 1)}
        assignment = FakeAssignment(course=course, **assignment_data)
        submission = FakeSubmission(assignment=assignment, student=student, **sample_submission_data)
        assert submission.is_late() is True


# ─── Enrollment ──────────────────────────────────────────────────────────────

class TestEnrollmentModel:
    """Tests for Enrollment model."""

    def test_enroll_student(self, sample_course_data, sample_user_data, sample_student_data):
        """Student enrollment should track progress."""
        teacher = FakeUser(**sample_user_data)
        student = FakeUser(**sample_student_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        enrollment = FakeEnrollment(user=student, course=course)
        assert enrollment.progress_pct == 0.0
        assert enrollment.status == 'active'

    def test_complete_enrollment(self, sample_course_data, sample_user_data, sample_student_data):
        """Completing should set progress to 100 and status to completed."""
        teacher = FakeUser(**sample_user_data)
        student = FakeUser(**sample_student_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        enrollment = FakeEnrollment(user=student, course=course)
        enrollment.complete()
        assert enrollment.progress_pct == 100.0
        assert enrollment.status == 'completed'

    def test_update_progress(self, sample_course_data, sample_user_data, sample_student_data):
        """Progress should be between 0 and 100."""
        teacher = FakeUser(**sample_user_data)
        student = FakeUser(**sample_student_data)
        course = FakeCourse(teacher=teacher, **sample_course_data)
        enrollment = FakeEnrollment(user=student, course=course)
        enrollment.update_progress(50)
        assert enrollment.progress_pct == 50.0
        enrollment.update_progress(110)
        assert enrollment.progress_pct == 100.0
        enrollment.update_progress(-10)
        assert enrollment.progress_pct == 0.0


# ─── Reset Fixture ─────────────────────────────────────────────────────────

@pytest.fixture(autouse=True)
def _reset_fakes():
    FakeUser._reset()
    FakeLesson._reset()


# ─── Fake Models (used when real models not yet implemented) ─────────────────

class FakeUser:
    _registry: dict = {}

    @classmethod
    def _reset(cls):
        cls._registry = {}

    def __init__(self, name='', email='', password='', role='student', **kwargs):
        if email in self._registry:
            raise ValueError('Email already exists')
        self._registry[email] = self
        self.name = name
        self.email = email
        self._password_hash = ''
        self.role = role
        self.is_active = True

    @property
    def password_hash(self):
        return self._password_hash

    def set_password(self, raw):
        self._password_hash = f'hashed_{raw}'

    def check_password(self, raw):
        return self._password_hash == f'hashed_{raw}'

    def get_full_name(self):
        return self.name

    def is_teacher(self):
        return self.role == 'teacher'

    def is_student(self):
        return self.role == 'student'

    def __str__(self):
        return f'{self.name} ({self.email})'


class FakeCourse:
    def __init__(self, teacher=None, title='', price=Decimal('0'), status='draft', **kwargs):
        self.teacher = teacher
        self.title = title
        self.slug = title.lower().replace(' ', '-')
        self.description = kwargs.get('description', '')
        self.price = price
        self.status = status
        self.enrollment_count = 0

    def publish(self):
        self.status = 'published'

    def __str__(self):
        return self.title


class FakeLesson:
    _orders: dict = {}

    @classmethod
    def _reset(cls):
        cls._orders = {}

    def __init__(self, course=None, order=None, content_type='video', **kwargs):
        key = id(course)
        if key not in FakeLesson._orders:
            FakeLesson._orders[key] = set()
        if order is None:
            order = 1
            while order in FakeLesson._orders[key]:
                order += 1
        if order in FakeLesson._orders[key]:
            raise ValueError('Order already exists')
        FakeLesson._orders[key].add(order)
        self.course = course
        self.title = kwargs.get('title', 'Untitled')
        self.order = order
        self.content_type = content_type
        self.duration_minutes = kwargs.get('duration_minutes', 10)
        if self.duration_minutes < 0:
            raise ValueError('Duration must be positive')
        valid_types = ['video', 'pdf', 'text', 'embed']
        if self.content_type not in valid_types:
            raise ValueError(f'Invalid content type: {self.content_type}')


class FakeQuiz:
    def __init__(self, lesson=None, title='Quiz', passing_score=70, **kwargs):
        self.lesson = lesson
        self.title = title
        self.passing_score = passing_score
        self._questions = []

    def add_question(self, question):
        self._questions.append(question)

    @property
    def total_points(self):
        return sum(q.points for q in self._questions)

    def is_passed(self, score):
        return score >= self.passing_score


class FakeQuestion:
    def __init__(self, quiz=None, content='', type='mcq', options=None,
                 correct_answer='', points=10, order=1):
        self.quiz = quiz
        self.content = content
        self.type = type
        self.options = options or []
        self.correct_answer = correct_answer or (options[0] if options else '')
        self.points = points
        self.order = order

    def check_answer(self, answer):
        return answer == self.correct_answer


class FakeAssignment:
    def __init__(self, course=None, title='', description='', due_date=None,
                 max_score=100, type='file', **kwargs):
        if max_score < 0:
            raise ValueError('Max score must be positive')
        self.course = course
        self.title = title
        self.description = description
        self.due_date = due_date or date.today()
        self.max_score = max_score
        self.type = type
        self._submissions = []

    def is_past_due(self):
        return date.today() > self.due_date


class FakeSubmission:
    def __init__(self, assignment=None, student=None, content='', status='pending', **kwargs):
        self.assignment = assignment
        self.student = student
        self.content = content
        self.status = status
        self.score = None
        self.feedback = ''
        self.graded_by = None

    def grade(self, score, feedback='', graded_by=None):
        if score > self.assignment.max_score:
            raise ValueError('Score exceeds maximum')
        self.score = score
        self.feedback = feedback
        self.status = 'graded'
        self.graded_by = graded_by

    def is_late(self):
        return self.assignment.is_past_due()


class FakeEnrollment:
    def __init__(self, user=None, course=None):
        self.user = user
        self.course = course
        self.progress_pct = 0.0
        self.status = 'active'

    def complete(self):
        self.progress_pct = 100.0
        self.status = 'completed'

    def update_progress(self, pct):
        self.progress_pct = max(0.0, min(100.0, float(pct)))
