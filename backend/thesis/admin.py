from django.contrib import admin
from .models import User_Profile, Student, Chair, Academic_Title, Honorific_Title, Teacher, Committee, Committee_Member_Type, Committee_Member, Thesis, Resource_Type, Resource

models_list = [User_Profile, Student, Chair, Academic_Title, Honorific_Title, Teacher, Committee, Committee_Member_Type, Committee_Member, Thesis, Resource_Type, Resource]
admin.site.register(models_list)

# Register your models here.
