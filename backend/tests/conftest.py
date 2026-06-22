import pytest
from datetime import datetime, date
from decimal import Decimal


# ─── Fixtures ────────────────────────────────────────────────────────────────

@pytest.fixture
def sample_user_data():
    return {
        'name': 'John Doe',
        'email': 'john@example.com',
        'password': 'SecurePass123!',
        'role': 'teacher',
    }

@pytest.fixture
def sample_student_data():
    return {
        'name': 'Jane Smith',
        'email': 'jane@example.com',
        'password': 'SecurePass456!',
        'role': 'student',
    }

@pytest.fixture
def sample_course_data():
    return {
        'title': 'Python for Beginners',
        'description': 'Learn Python from scratch',
        'price': Decimal('49.99'),
        'status': 'draft',
    }

@pytest.fixture
def sample_lesson_data():
    return {
        'title': 'Variables and Data Types',
        'content': '<p>In this lesson, you will learn about variables...</p>',
        'order': 1,
        'content_type': 'video',
        'duration_minutes': 15,
    }

@pytest.fixture
def sample_assignment_data():
    return {
        'title': 'Week 1 Assignment',
        'description': 'Write a Python program...',
        'due_date': date(2026, 7, 15),
        'max_score': 100,
        'type': 'file',
    }

@pytest.fixture
def sample_quiz_data():
    return {
        'title': 'Python Basics Quiz',
        'time_limit_minutes': 30,
        'passing_score': 70,
    }

@pytest.fixture
def sample_question_data():
    return {
        'content': 'What is the output of print(2**3)?',
        'type': 'mcq',
        'options': ['5', '6', '8', '9'],
        'correct_answer': '8',
        'points': 10,
    }

@pytest.fixture
def sample_submission_data():
    return {
        'content': 'def hello():\n    print("Hello World")\n\nhello()',
        'status': 'pending',
    }
