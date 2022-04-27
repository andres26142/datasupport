from rest_framework.serializers import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        if user.is_staff:
            error={
                "status": 400,
                "mensaje": "Staff not allowed"
            }
                 
            raise ValidationError(error,code=400)
        

        return token