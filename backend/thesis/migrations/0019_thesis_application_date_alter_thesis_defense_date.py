# Generated by Django 4.1 on 2023-08-29 20:07

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [
        ("thesis", "0018_alter_thesis_submission_date"),
    ]

    operations = [
        migrations.AddField(
            model_name="thesis",
            name="application_date",
            field=models.DateField(blank=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="thesis",
            name="defense_date",
            field=models.DateField(blank=True, null=True),
        ),
    ]
