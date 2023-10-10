# Generated by Django 4.1 on 2023-08-03 22:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("thesis", "0006_alter_thesis_student"),
    ]

    operations = [
        migrations.AlterField(
            model_name="thesis",
            name="student",
            field=models.OneToOneField(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="thesis.student",
            ),
        ),
    ]