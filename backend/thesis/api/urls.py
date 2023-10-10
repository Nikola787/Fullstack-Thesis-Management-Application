from django.contrib import admin
from django.urls import path
from .views import *

app_name = "thesis"

urlpatterns = [
    
    path('thesis-table/', ThesisTableView.as_view(), name="thesis-table"),

    path("thesis/<int:pk>/", ThesisByStudentId.as_view(), name="thesis-by-student"),


    path('login/', UserLoginView.as_view(), name='user-login'),

    path('user_profiles/', User_ProfileListCreateView.as_view(), name='user-profile-list'),
    path('user_profiles/<int:pk>/',  User_ProfileDetailView.as_view(), name='user-profile-detail'),

    path('students/',  StudentListCreateView.as_view(), name='student-list'),
    path('students/<int:pk>/',  StudentDetailView.as_view(), name='student-detail'),

    path('chairs/',  ChairListCreateView.as_view(), name='chair-list'),
    path('chairs/<int:pk>/',  ChairDetailView.as_view(), name='chair-detail'),

    path('academic_titles/',  Academic_TitleListCreateView.as_view(), name='academic-title-list'),
    path('academic_titles/<int:pk>/',  Academic_TitleDetailView.as_view(), name='academic-title-detail'),

    path('honorific_titles/',  Honorific_TitleListCreateView.as_view(), name='honorific-title-list'),
    path('honorific_titles/<int:pk>/',  Honorific_TitleDetailView.as_view(), name='honorific-title-detail'),

    path('teachers/',  TeacherListCreateView.as_view(), name='teacher-list'),
    path('teachers/<int:pk>/',  TeacherDetailView.as_view(), name='teacher-detail'),

    path('committees/',  CommitteeListCreateView.as_view(), name='committee-list'),
    path('committees/<int:pk>/',  CommitteeDetailView.as_view(), name='committee-detail'),

    path('committee_member_types/',  Committee_Member_TypeListCreateView.as_view(), name='committee-member-type-list'),
    path('committee_member_types/<int:pk>/',  Committee_Member_TypeDetailView.as_view(), name='committee-member-type-detail'),

    path('committee_members/',  Committee_MemberListCreateView.as_view(), name='committee-member-list'),
    # Create_Committee_MemberView
    path('committee_members/create/',  Create_Committee_MemberView.as_view(), name='committee-member-create'),
    path('committee_members/<int:pk>/',  Committee_MemberDetailView.as_view(), name='committee-member-detail'),

    path('theses/',  ThesisListCreateView.as_view(), name='thesis-list'),
    path('theses/<int:pk>/',  ThesisDetailView.as_view(), name='thesis-detail'),
    # CreateThesisSerializer
    path('theses/create/',  CreateThesisView.as_view(), name='thesis-list-create'),


    # path('committee_theses/',  Committee_ThesisListCreateView.as_view(), name='committee-thesis-list'),
    # path('committee_theses/<int:pk>/',  Committee_ThesisDetailView.as_view(), name='committee-thesis-detail'),

    path('resource_types/',  Resource_TypeListCreateView.as_view(), name='resource-type-list'),
    path('resource_types/<int:pk>/',  Resource_TypeDetailView.as_view(), name='resource-type-detail'),

    path('resources/',  ResourceListCreateView.as_view(), name='resource-list'),
    path('resources/<int:pk>/',  ResourceDetailView.as_view(), name='resource-detail'),
]