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
from rest_framework import serializers


class User_ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Profile
        fields = "__all__"


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class ChairSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chair
        fields = "__all__"


class Academic_TitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Academic_Title
        fields = "__all__"


class Honorific_TitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Honorific_Title
        fields = "__all__"


class TeacherSerializer(serializers.ModelSerializer):
    academic = Academic_TitleSerializer()
    chair = ChairSerializer()
    honorific_title = Honorific_TitleSerializer()

    class Meta:
        model = Teacher
        fields = "__all__"


class Committee_Member_TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Committee_Member_Type
        fields = "__all__"


class Committee_MemberSerializer(serializers.ModelSerializer):
    committee_member_type = Committee_Member_TypeSerializer()
    teacher = TeacherSerializer()

    class Meta:
        model = Committee_Member
        fields = "__all__"


class Create_Committee_MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Committee_Member
        fields = "__all__"


class Resource_TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource_Type
        fields = "__all__"


class ResourceSerializer(serializers.ModelSerializer):
    resource_type = Resource_TypeSerializer(many=False, read_only=False)

    class Meta:
        model = Resource
        fields = "__all__"


class CreateResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = "__all__"


class ThesisSerializer(serializers.ModelSerializer):
    resources = ResourceSerializer(many=True, read_only=True)
    student = StudentSerializer(many=False, read_only=True)

    class Meta:
        model = Thesis
        fields = "__all__"

class CreateThesisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thesis
        fields = "__all__"


# class Committee_ThesisSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Committee_Thesis
#         fields = "__all__"


class Thesis_TableSerializer(serializers.ModelSerializer):
    thesis = ThesisSerializer(many=False, read_only=True)
    committee_members = Committee_MemberSerializer(many=True, read_only=True)

    class Meta:
        model = Committee
        fields = "__all__"


class CommitteeSerializer(serializers.ModelSerializer):
    thesis = ThesisSerializer(many=False, read_only=True)
    committee_members = Committee_MemberSerializer(many=True, read_only=True)

    class Meta:
        model = Committee
        fields = "__all__"
