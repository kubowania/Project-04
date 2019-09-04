# from rest_framework.authentication import BasicAuthentication
# from  rest_framework.exceptions import AuthenticationFailed
# from django.contrib.auth.models import User
# from django.conf import settings
# import jwt
#
# class JWTAuthentication(BasicAuthentication):
#
#
#     def authenticate(self, request):
#
#         header = request.headers.get('Authorization')
#
#         if not header:
#             return None
#
#         if not header.startswith('Bearer'):
#             raise AuthenticationFailed({'message': 'Invalid Authorization Header'})
#
#         token = header.replace('Bearer ', '')
#
#         try:
#             payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
#             user = User.objects.get(pk=payload.get('sub'))
#         except jwt.exceptions.InvalidTokenError:
#             raise AuthenticationFailed({'message': 'Invalid token'})
#         except User.DoesNotExist:
#             raise AuthenticationFailed({'message': 'Invalid subject'})
#
#
#
#         return (user, token)
