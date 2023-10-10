# Generated by Django 4.1 on 2023-08-04 14:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("thesis", "0008_resource_published"),
    ]

    operations = [
        migrations.AlterField(
            model_name="thesis",
            name="student",
            field=models.OneToOneField(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="students",
                to="thesis.student",
            ),
        ),
    ]