# Generated by Django 4.1 on 2023-08-25 16:33

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("thesis", "0016_alter_committee_member_teacher"),
    ]

    operations = [
        migrations.AlterField(
            model_name="committee",
            name="committee_formation_date",
            field=models.DateField(auto_now_add=True),
        ),
    ]
