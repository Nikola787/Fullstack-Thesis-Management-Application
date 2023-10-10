from rest_framework import generics
from thesis.models import (
    User_Profile,
    Student,
    Chair,
    Academic_Title,
    Honorific_Title,
    Teacher,
    Committee,
    Committee_Member_Type,
    Committee_Member,
    Thesis,
    Resource_Type,
    Resource,
)
from .serializers import (
    User_ProfileSerializer,
    StudentSerializer,
    ChairSerializer,
    Academic_TitleSerializer,
    Honorific_TitleSerializer,
    TeacherSerializer,
    CommitteeSerializer,
    Committee_Member_TypeSerializer,
    Committee_MemberSerializer,
    ThesisSerializer,
    Resource_TypeSerializer,
    ResourceSerializer,
    CreateResourceSerializer,
    Thesis_TableSerializer,
    Create_Committee_MemberSerializer,
    CreateThesisSerializer,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, authenticate

from django.contrib.auth.models import User

from django.db.models import OuterRef, Subquery


class UserLoginView(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user:
            try:
                user_profile = User_Profile.objects.get(user=user)

                id = user_profile.id
                username = request.data.get("username")
                password = request.data.get("password")
                name = user_profile.name
                surname = user_profile.surname
                date_of_birth = user_profile.date_of_birth
                user_type = user_profile.user_type
                phone_number = user_profile.phone_number
                email = user_profile.email

                if user_type == "student":
                    return Response(
                        {
                            "message": "Student login successful",
                            "id": id,
                            "username": username,
                            "password": password,
                            "name": name,
                            "surname": surname,
                            "date_of_birth": date_of_birth,
                            "user_type": user_type,
                            "phone_number": phone_number,
                            "email": email,
                        },
                        status=status.HTTP_200_OK,
                    )
                elif user_type == "nastavnik":
                    return Response(
                        {
                            "message": "Teacher login successful",
                            "id": id,
                            "username": username,
                            "password": password,
                            "name": name,
                            "surname": surname,
                            "date_of_birth": date_of_birth,
                            "user_type": user_type,
                            "phone_number": phone_number,
                            "email": email,
                        },
                        status=status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        {
                            "message": "Staff login successful",
                            "id": id,
                            "username": username,
                            "password": password,
                            "name": name,
                            "surname": surname,
                            "date_of_birth": date_of_birth,
                            "user_type": user_type,
                            "phone_number": phone_number,
                            "email": email,
                        },
                        status=status.HTTP_200_OK,
                    )
            except User_Profile.DoesNotExist:
                return Response(
                    {"message": "User profile not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            return Response(
                {"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )


class User_ProfileListCreateView(generics.ListCreateAPIView):
    queryset = User_Profile.objects.all()
    serializer_class = User_ProfileSerializer


class User_ProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User_Profile.objects.all()
    serializer_class = User_ProfileSerializer


class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get_queryset(self):
        # Subquery to get student IDs referenced in the Thesis model
        thesis_student_ids = Thesis.objects.filter(student_id=OuterRef('id')).values('student')

        # Filter out students who are referenced in the Thesis model
        queryset = Student.objects.exclude(id__in=Subquery(thesis_student_ids))
        
        return queryset


class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class ChairListCreateView(generics.ListCreateAPIView):
    queryset = Chair.objects.all()
    serializer_class = ChairSerializer


class ChairDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chair.objects.all()
    serializer_class = ChairSerializer


class Academic_TitleListCreateView(generics.ListCreateAPIView):
    queryset = Academic_Title.objects.all()
    serializer_class = Academic_TitleSerializer


class Academic_TitleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Academic_Title.objects.all()
    serializer_class = Academic_TitleSerializer


class Honorific_TitleListCreateView(generics.ListCreateAPIView):
    queryset = Honorific_Title.objects.all()
    serializer_class = Honorific_TitleSerializer


class Honorific_TitleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Honorific_Title.objects.all()
    serializer_class = Honorific_TitleSerializer


class TeacherListCreateView(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class TeacherDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class CommitteeListCreateView(generics.ListCreateAPIView):
    queryset = Committee.objects.all()
    serializer_class = CommitteeSerializer


class CommitteeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Committee.objects.all()
    serializer_class = CommitteeSerializer


class Committee_Member_TypeListCreateView(generics.ListCreateAPIView):
    queryset = Committee_Member_Type.objects.all()
    serializer_class = Committee_Member_TypeSerializer


class Committee_Member_TypeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Committee_Member_Type.objects.all()
    serializer_class = Committee_Member_TypeSerializer


class Committee_MemberListCreateView(generics.ListCreateAPIView):
    queryset = Committee_Member.objects.all()
    serializer_class = Committee_MemberSerializer

class Create_Committee_MemberView(generics.ListCreateAPIView):
    queryset = Committee_Member.objects.all()
    serializer_class = Create_Committee_MemberSerializer


class Committee_MemberDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Committee_Member.objects.all()
    serializer_class = Committee_MemberSerializer


class ThesisListCreateView(generics.ListCreateAPIView):
    queryset = Thesis.objects.all()
    serializer_class = ThesisSerializer


class ThesisDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Thesis.objects.all()
    serializer_class = ThesisSerializer

class CreateThesisView(generics.ListCreateAPIView):
    queryset = Thesis.objects.all()
    serializer_class = CreateThesisSerializer


# class Committee_ThesisListCreateView(generics.ListCreateAPIView):
#     queryset = Committee_Thesis.objects.all()
#     serializer_class = Committee_ThesisSerializer


# class Committee_ThesisDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Committee_Thesis.objects.all()
#     serializer_class = Committee_ThesisSerializer


class Resource_TypeListCreateView(generics.ListCreateAPIView):
    queryset = Resource_Type.objects.all()
    serializer_class = Resource_TypeSerializer


class Resource_TypeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Resource_Type.objects.all()
    serializer_class = Resource_TypeSerializer


class ResourceListCreateView(generics.ListCreateAPIView):
    queryset = Resource.objects.all()

    def get_serializer_class(self):
        if (
            self.request.method == "POST"
        ):  # Use CreateResourceSerializer for POST requests
            return CreateResourceSerializer
        return ResourceSerializer  # Use ViewResourceSerializer for other requests


class ResourceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer


class ThesisTableView(generics.ListAPIView):
    queryset = Committee.objects.all()
    serializer_class = CommitteeSerializer


class ThesisByStudentId(generics.ListAPIView):
    serializer_class = ThesisSerializer

    def get_queryset(self):
        student_id = self.kwargs["pk"]
        return Thesis.objects.filter(student__id=student_id)
