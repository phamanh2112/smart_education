"""
TDD Tests — AI Service
"""

import pytest


class TestAIService:
    """Tests for AI Tutor, auto-grading, and recommendations."""

    def test_ai_tutor_responds(self):
        """AI Tutor should return an answer for a valid question."""
        service = FakeAIService()
        response = service.ask_tutor('What is a variable in Python?', context='beginner')
        assert response is not None
        assert len(response) > 0
        assert 'variable' in response.lower()

    def test_ai_tutor_empty_question(self):
        """AI Tutor should reject empty questions."""
        service = FakeAIService()
        with pytest.raises(ValueError, match='Question cannot be empty'):
            service.ask_tutor('', context='beginner')

    def test_auto_grade_correct_answer(self):
        """Auto-grader should give full score for correct answer."""
        service = FakeAIService()
        result = service.grade_question(
            question='What is 2+2?',
            correct_answer='4',
            student_answer='4',
            max_points=10,
        )
        assert result['score'] == 10
        assert result['is_correct'] is True

    def test_auto_grade_partial_credit(self):
        """Auto-grader should give partial credit for partially correct."""
        service = FakeAIService()
        result = service.grade_question(
            question='Explain the water cycle.',
            correct_answer='Evaporation, condensation, precipitation',
            student_answer='Evaporation and rain',
            max_points=10,
        )
        assert 0 < result['score'] < 10
        assert result['is_correct'] is False

    def test_auto_grade_wrong_answer(self):
        """Auto-grader should give zero for completely wrong."""
        service = FakeAIService()
        result = service.grade_question(
            question='What is 2+2?',
            correct_answer='4',
            student_answer='42',
            max_points=10,
        )
        assert result['score'] == 0
        assert result['is_correct'] is False

    def test_detect_plagiarism_high_similarity(self):
        """Plagiarism detector should flag high similarity."""
        service = FakeAIService()
        text1 = 'The quick brown fox jumps over the lazy dog'
        text2 = 'The quick brown fox jumps over the lazy dog'
        result = service.detect_plagiarism(text1, text2)
        assert result['similarity'] > 0.9
        assert result['is_plagiarized'] is True

    def test_detect_plagiarism_low_similarity(self):
        """Plagiarism detector should pass low similarity."""
        service = FakeAIService()
        text1 = 'The quick brown fox jumps over the lazy dog'
        text2 = 'Photosynthesis is the process by which plants convert sunlight'
        result = service.detect_plagiarism(text1, text2)
        assert result['similarity'] < 0.3
        assert result['is_plagiarized'] is False

    def test_generate_recommendations(self, sample_user_data, sample_student_data):
        """Recommendations should be personalized."""
        service = FakeAIService()
        student = FakeUser(**sample_student_data)
        courses = [
            FakeCourse(title='Python Basics', category='Programming'),
            FakeCourse(title='Calculus 101', category='Math'),
            FakeCourse(title='English Grammar', category='Language'),
        ]
        recs = service.generate_recommendations(student, courses)
        assert len(recs) > 0
        for r in recs:
            assert 'score' in r
            assert 'course' in r

    def test_performance_analytics(self):
        """Analytics should show student performance."""
        service = FakeAIService()
        grades = [85, 90, 78, 92, 88]
        result = service.analyze_performance(grades)
        assert result['average'] == 86.6
        assert result['highest'] == 92
        assert result['lowest'] == 78
        assert 'trend' in result


class TestNotificationService:
    """Tests for sending notifications."""

    def test_send_enrollment_notification(self):
        """Student should be notified on enrollment."""
        service = FakeNotificationService()
        student = FakeUser(name='Jane', email='jane@test.com')
        notification = service.notify_enrollment(student, 'Python Basics')
        assert notification['type'] == 'enrollment'
        assert notification['user_email'] == 'jane@test.com'
        assert 'Python Basics' in notification['message']

    def test_send_grade_notification(self):
        """Student should be notified when graded."""
        service = FakeNotificationService()
        student = FakeUser(name='Jane', email='jane@test.com')
        notification = service.notify_grade(student, 'Assignment 1', 85)
        assert notification['type'] == 'grade'
        assert '85' in notification['message']

    def test_send_live_session_reminder(self):
        """Student should be reminded before live session."""
        service = FakeNotificationService()
        student = FakeUser(name='Jane', email='jane@test.com')
        notification = service.notify_live_session(student, 'Live Q&A', '2026-07-01 10:00')
        assert notification['type'] == 'live_session'
        assert 'Live Q&A' in notification['message']

    def test_unread_count(self):
        """User should see unread notification count."""
        service = FakeNotificationService()
        student = FakeUser(name='Jane', email='jane@test.com')
        service.notify_enrollment(student, 'Course A')
        service.notify_grade(student, 'HW1', 90)
        assert service.get_unread_count(student) == 2
        service.mark_as_read(student)
        assert service.get_unread_count(student) == 0


# ─── Fake Models ─────────────────────────────────────────────────────────────

class FakeUser:
    def __init__(self, name='', email='', password='', role='student'):
        self.name = name
        self.email = email
        self.role = role


class FakeCourse:
    def __init__(self, title='', category=''):
        self.title = title
        self.category = category


class FakeAIService:
    def ask_tutor(self, question, context=''):
        if not question.strip():
            raise ValueError('Question cannot be empty')
        if 'variable' in question.lower():
            return 'A variable is a container for storing data values in Python.'
        return 'I am here to help you learn.'

    def grade_question(self, question, correct_answer, student_answer, max_points=10):
        if student_answer.lower().strip() == correct_answer.lower().strip():
            return {'score': max_points, 'is_correct': True, 'feedback': 'Correct!'}
        import re
        words_correct = set(re.sub(r'[^\w\s]', '', correct_answer.lower()).split())
        words_student = set(re.sub(r'[^\w\s]', '', student_answer.lower()).split())
        overlap = words_correct & words_student
        if overlap:
            ratio = len(overlap) / len(words_correct)
            return {
                'score': round(max_points * ratio),
                'is_correct': False,
                'feedback': 'Partially correct.',
            }
        return {'score': 0, 'is_correct': False, 'feedback': 'Incorrect.'}

    def detect_plagiarism(self, text1, text2):
        words1 = set(text1.lower().split())
        words2 = set(text2.lower().split())
        if not words1 or not words2:
            return {'similarity': 0.0, 'is_plagiarized': False}
        intersection = words1 & words2
        similarity = len(intersection) / max(len(words1), len(words2))
        return {'similarity': round(similarity, 2), 'is_plagiarized': similarity > 0.7}

    def generate_recommendations(self, user, courses, top_n=3):
        scored = [(c, 0.9) for c in courses[:top_n]]
        return [{'course': c.title, 'score': s} for c, s in scored]

    def analyze_performance(self, grades):
        return {
            'average': round(sum(grades) / len(grades), 1),
            'highest': max(grades),
            'lowest': min(grades),
            'trend': 'improving' if grades[-1] > grades[0] else 'declining',
        }


class FakeNotificationService:
    def __init__(self):
        self._notifications = {}

    def notify_enrollment(self, user, course_title):
        n = {'type': 'enrollment', 'user_email': user.email, 'message': f'Enrolled in {course_title}'}
        self._add(user, n)
        return n

    def notify_grade(self, user, assignment_title, score):
        n = {'type': 'grade', 'user_email': user.email, 'message': f'Grade for {assignment_title}: {score}'}
        self._add(user, n)
        return n

    def notify_live_session(self, user, session_title, time):
        n = {'type': 'live_session', 'user_email': user.email, 'message': f'{session_title} at {time}'}
        self._add(user, n)
        return n

    def _add(self, user, notification):
        notification['is_read'] = False
        if user.email not in self._notifications:
            self._notifications[user.email] = []
        self._notifications[user.email].append(notification)

    def get_unread_count(self, user):
        return sum(1 for n in self._notifications.get(user.email, []) if not n['is_read'])

    def mark_as_read(self, user):
        for n in self._notifications.get(user.email, []):
            n['is_read'] = True
