"""
TDD Tests — Course Management
"""

import pytest
from datetime import date
from decimal import Decimal


@pytest.fixture(autouse=True)
def _reset_fakes():
    FakeCourse._reset()
    FakeLesson._reset()


class TestCourseService:
    """Tests for course CRUD and business logic."""

    def test_create_course(self, sample_course_data, sample_user_data):
        """Teacher should be able to create a course."""
        teacher = FakeUser(**sample_user_data)
        service = FakeCourseService()
        course = service.create_course(teacher=teacher, **sample_course_data)
        assert course.title == 'Python for Beginners'
        assert course.teacher.name == 'John Doe'

    def test_list_teacher_courses(self, sample_course_data, sample_user_data):
        """Teacher should see only their courses."""
        teacher = FakeUser(**sample_user_data)
        service = FakeCourseService()
        service.create_course(teacher=teacher, **sample_course_data)
        courses = service.get_teacher_courses(teacher)
        assert len(courses) == 1
        assert courses[0].title == 'Python for Beginners'

    def test_student_cannot_create_course(self, sample_course_data, sample_student_data):
        """Students should not be able to create courses."""
        student = FakeUser(**sample_student_data)
        service = FakeCourseService()
        with pytest.raises(PermissionError, match='Only teachers can create courses'):
            service.create_course(teacher=student, **sample_course_data)

    def test_search_courses_by_title(self, sample_user_data, sample_student_data):
        """Courses should be searchable by title."""
        teacher = FakeUser(**sample_user_data)
        student = FakeUser(**sample_student_data)
        service = FakeCourseService()
        service.create_course(teacher=teacher, title='Python Basics')
        service.create_course(teacher=teacher, title='Advanced Python')
        service.create_course(teacher=teacher, title='JavaScript 101')
        results = service.search_courses('Python')
        assert len(results) == 2

    def test_publish_course_requires_content(self, sample_course_data, sample_user_data):
        """A course with no lessons should not be publishable."""
        teacher = FakeUser(**sample_user_data)
        service = FakeCourseService()
        course = service.create_course(teacher=teacher, **sample_course_data)
        with pytest.raises(ValueError, match='Course must have at least one lesson'):
            service.publish_course(course)

    def test_get_enrolled_students(self, sample_user_data, sample_student_data):
        """Teacher should see enrolled students."""
        teacher = FakeUser(**sample_user_data)
        student = FakeUser(**sample_student_data)
        service = FakeCourseService()
        course = service.create_course(teacher=teacher, title='Test')
        service.enroll_student(course, student)
        enrolled = service.get_enrolled_students(course)
        assert len(enrolled) == 1
        assert enrolled[0].name == 'Jane Smith'


class TestLessonService:
    """Tests for lesson management."""

    def test_add_lesson_to_course(self, sample_course_data, sample_lesson_data, sample_user_data):
        """Teacher should add lessons to their course."""
        teacher = FakeUser(**sample_user_data)
        service = FakeCourseService()
        course = service.create_course(teacher=teacher, **sample_course_data)
        lesson = service.add_lesson(course=course, **sample_lesson_data)
        assert lesson.title == 'Variables and Data Types'
        assert lesson.course.title == 'Python for Beginners'

    def test_lesson_ordering(self, sample_course_data, sample_user_data):
        """Lessons should auto-increment order."""
        teacher = FakeUser(**sample_user_data)
        service = FakeCourseService()
        course = service.create_course(teacher=teacher, **sample_course_data)
        l1 = service.add_lesson(course=course, order=1)
        l2 = service.add_lesson(course=course, order=2)
        assert l1.order == 1
        assert l2.order == 2

    def test_reorder_lessons(self, sample_course_data, sample_user_data):
        """Lessons should be reorderable."""
        teacher = FakeUser(**sample_user_data)
        service = FakeCourseService()
        course = service.create_course(teacher=teacher, **sample_course_data)
        l1 = service.add_lesson(course=course, order=1)
        l2 = service.add_lesson(course=course, order=2)
        l3 = service.add_lesson(course=course, order=3)
        service.reorder_lessons(course, [3, 1, 2])
        lessons = service.get_lessons(course)
        assert lessons[0].order == 1
        assert lessons[0]._id == 3


class FakeUser:
    def __init__(self, name='', email='', password='', role='student'):
        self.name = name
        self.email = email
        self.role = role


class FakeLesson:
    _next_id = 1

    @classmethod
    def _reset(cls):
        cls._next_id = 1

    def __init__(self, course=None, order=1, **kwargs):
        self._id = FakeLesson._next_id
        FakeLesson._next_id += 1
        self.course = course
        self.title = kwargs.get('title', f'Lesson {order}')
        self.order = order
        self.content = kwargs.get('content', '')


class FakeCourse:
    _next_id = 1

    @classmethod
    def _reset(cls):
        cls._next_id = 1

    def __init__(self, teacher=None, title='', **kwargs):
        self.id = FakeCourse._next_id
        FakeCourse._next_id += 1
        self.teacher = teacher
        self.title = title
        self.description = kwargs.get('description', '')
        self.status = 'draft'
        self._lessons = []


class FakeCourseService:
    def __init__(self):
        self._courses = []
        self._enrollments = {}

    def create_course(self, teacher, **data):
        if teacher.role != 'teacher':
            raise PermissionError('Only teachers can create courses')
        course = FakeCourse(teacher=teacher, **data)
        self._courses.append(course)
        return course

    def get_teacher_courses(self, teacher):
        return [c for c in self._courses if c.teacher == teacher]

    def search_courses(self, query):
        return [c for c in self._courses if query.lower() in c.title.lower()]

    def publish_course(self, course):
        if not course._lessons:
            raise ValueError('Course must have at least one lesson')
        course.status = 'published'

    def enroll_student(self, course, student):
        if course.id not in self._enrollments:
            self._enrollments[course.id] = set()
        self._enrollments[course.id].add(student)

    def get_enrolled_students(self, course):
        return list(self._enrollments.get(course.id, set()))

    def add_lesson(self, course, **data):
        lesson = FakeLesson(course=course, **data)
        course._lessons.append(lesson)
        return lesson

    def get_lessons(self, course):
        return sorted(course._lessons, key=lambda l: l.order)

    def reorder_lessons(self, course, order):
        for new_order, lesson_id in enumerate(order, 1):
            for lesson in course._lessons:
                if lesson._id == lesson_id:
                    lesson.order = new_order
                    break
