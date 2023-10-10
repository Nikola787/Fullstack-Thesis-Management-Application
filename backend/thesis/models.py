from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class User_Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default="N/A")
    surname = models.CharField(max_length=255, default="N/A")
    date_of_birth = models.DateField(blank=True)
    user_type = models.CharField(max_length=255, default="N/A")
    phone_number = models.CharField(max_length=255, default="N/A")
    email = models.CharField(max_length=255, default="N/A")

    def __str__(self):
        return f"{self.name} {self.surname}"


class Student(User_Profile):
    index_number = models.CharField(max_length=255, default="N/A")
    total_espb = models.IntegerField(default=0)
    major = models.CharField(max_length=255, default="N/A")
    gpa = models.FloatField(default=5.0)

    def __str__(self):
        return f"{self.name} {self.surname} ({self.index_number})"


class Chair(models.Model):
    name = models.CharField(max_length=255, default="N/A")

    def __str__(self):
        return self.name


class Academic_Title(models.Model):
    name = models.CharField(max_length=255, default="N/A")

    def __str__(self):
        return self.name


class Honorific_Title(models.Model):
    name = models.CharField(max_length=255, default="N/A")

    def __str__(self):
        return self.name


class Teacher(User_Profile):
    chair = models.ForeignKey(Chair, on_delete=models.CASCADE)
    academic = models.ForeignKey(Academic_Title, on_delete=models.CASCADE)
    honorific_title = models.ForeignKey(Honorific_Title, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.honorific_title} {self.name} {self.surname}"


class Committee(models.Model):
    committee_formation_date = models.DateField(blank=True, auto_now_add=True)

    def __str__(self):
        return f"Committee ({self.pk})"


class Committee_Member_Type(models.Model):
    type = models.CharField(max_length=255, default="N/A")

    def __str__(self):
        return self.type


class Committee_Member(models.Model):
    committee = models.ForeignKey(
        Committee, related_name="committee_members", on_delete=models.CASCADE
    )
    number = models.IntegerField()
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    committee_member_type = models.ForeignKey(
        Committee_Member_Type,
        related_name="committee_members",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"Member: {self.teacher}"


class Thesis(models.Model):
    thesis_title = models.CharField(max_length=255, default="N/A")
    submission_date = models.DateField(blank=True, null=True)
    application_date = models.DateField(blank=True)
    defense_date = models.DateField(blank=True, null=True)
    description = models.TextField()
    student = models.OneToOneField(
        Student, related_name="thesis", default=None, on_delete=models.CASCADE
    )
    committee = models.OneToOneField(
        Committee, related_name="thesis", default=None, null=True, on_delete=models.CASCADE
    )

    def __str__(self):
        if self.student:
            return f"Title: {self.thesis_title}, Student: {self.student.name} {self.student.surname}, Index: {self.student.index_number}"
        else:
            return f"Title: {self.thesis_title}, Student: N/A, Index: N/A"


# class Committee_Thesis(models.Model):
#     committee = models.ForeignKey(
#         Committee, related_name="committeeF", on_delete=models.CASCADE
#     )
#     thesis = models.ForeignKey(Thesis, related_name="thesisF", on_delete=models.CASCADE)

#     def __str__(self):
#         return f"{self.committee} - {self.thesis}"


class Resource_Type(models.Model):
    type = models.CharField(max_length=255, default="N/A")

    def __str__(self):
        return self.type


class Resource(models.Model):
    name = models.CharField(max_length=255, default="N/A")
    resource_file = models.FileField(null=True, upload_to="uploads/")
    published = models.BooleanField(default=False)
    thesis = models.ForeignKey(
        Thesis, related_name="resources", on_delete=models.CASCADE
    )
    resource_type = models.ForeignKey(Resource_Type, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
