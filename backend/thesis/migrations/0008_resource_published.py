# Generated by Django 4.1 on 2023-08-04 13:58

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("thesis", "0007_alter_thesis_student"),
    ]

    operations = [
        migrations.AddField(
            model_name="resource",
            name="published",
            field=models.BooleanField(default=False),
        ),
    ]
