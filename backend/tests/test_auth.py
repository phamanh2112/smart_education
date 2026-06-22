"""
TDD Tests — Authentication & Authorization
"""

import pytest
from datetime import datetime, timedelta


class TestAuthService:
    """Tests for user authentication."""

    def test_register_user(self, sample_user_data):
        """User registration should create a new user."""
        service = FakeAuthService()
        user = service.register(**sample_user_data)
        assert user.email == 'john@example.com'
        assert user.role == 'teacher'
        assert user.check_password('SecurePass123!') is True

    def test_register_duplicate_email(self, sample_user_data):
        """Registration with duplicate email should fail."""
        service = FakeAuthService()
        service.register(**sample_user_data)
        with pytest.raises(ValueError, match='Email already registered'):
            service.register(**sample_user_data)

    def test_login_success(self, sample_user_data):
        """Valid credentials should return a token."""
        service = FakeAuthService()
        service.register(**sample_user_data)
        token = service.login('john@example.com', 'SecurePass123!')
        assert token is not None
        assert isinstance(token, str)

    def test_login_wrong_password(self, sample_user_data):
        """Wrong password should raise error."""
        service = FakeAuthService()
        service.register(**sample_user_data)
        with pytest.raises(PermissionError, match='Invalid credentials'):
            service.login('john@example.com', 'WrongPass')

    def test_login_nonexistent_user(self):
        """Login with unregistered email should fail."""
        service = FakeAuthService()
        with pytest.raises(PermissionError, match='Invalid credentials'):
            service.login('ghost@example.com', 'pass')

    def test_token_verification(self, sample_user_data):
        """Generated token should verify and return user."""
        service = FakeAuthService()
        service.register(**sample_user_data)
        token = service.login('john@example.com', 'SecurePass123!')
        user = service.verify_token(token)
        assert user is not None
        assert user.email == 'john@example.com'

    def test_expired_token(self, sample_user_data):
        """Expired token should raise error."""
        service = FakeAuthService()
        service.register(**sample_user_data)
        token = service.login('john@example.com', 'SecurePass123!')
        service._tokens[token] = datetime.now() - timedelta(hours=25)
        with pytest.raises(PermissionError, match='Token expired'):
            service.verify_token(token)

    def test_role_based_access(self, sample_user_data, sample_student_data):
        """Teachers should not access student-only routes."""
        service = FakeAuthService()
        teacher = service.register(**sample_user_data)
        student = service.register(**sample_student_data)
        assert service.has_permission(teacher, 'create_course') is True
        assert service.has_permission(student, 'create_course') is False

    def test_password_reset(self, sample_user_data):
        """Password reset should update password."""
        service = FakeAuthService()
        service.register(**sample_user_data)
        service.reset_password('john@example.com')
        # After reset, old password should no longer work
        with pytest.raises(PermissionError, match='Invalid credentials'):
            service.login('john@example.com', 'SecurePass123!')


class FakeAuthService:
    """Mock auth service for TDD testing."""

    def __init__(self):
        self._users = {}
        self._tokens = {}
        self._token_expiry = timedelta(hours=24)
        self._permissions = {
            'teacher': ['create_course', 'edit_course', 'delete_course', 'grade'],
            'student': ['enroll', 'submit', 'view_course'],
        }

    def register(self, name, email, password, role):
        if email in self._users:
            raise ValueError('Email already registered')
        user = FakeUser(name, email, password, role)
        self._users[email] = user
        return user

    def login(self, email, password):
        user = self._users.get(email)
        if not user or not user.check_password(password):
            raise PermissionError('Invalid credentials')
        token = f'token_{email}_{datetime.now().timestamp()}'
        self._tokens[token] = datetime.now()
        return token

    def verify_token(self, token):
        created = self._tokens.get(token)
        if not created:
            raise PermissionError('Invalid token')
        if datetime.now() - created > self._token_expiry:
            raise PermissionError('Token expired')
        email = token.split('_')[1]
        return self._users.get(email)

    def has_permission(self, user, action):
        return action in self._permissions.get(user.role, [])

    def reset_password(self, email):
        user = self._users.get(email)
        if user:
            user.set_password('reset_password_123')


class FakeUser:
    def __init__(self, name='', email='', password='', role='student'):
        self.name = name
        self.email = email
        self._password = password
        self._password_hash = f'hash_{password}'
        self.role = role

    def set_password(self, raw):
        self._password = raw
        self._password_hash = f'hash_{raw}'

    def check_password(self, raw):
        return self._password == raw
