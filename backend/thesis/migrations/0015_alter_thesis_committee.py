# Generated by Django 4.1 on 2023-08-05 09:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("thesis", "0014_alter_committee_member_committee_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="thesis",
            name="committee",
            field=models.OneToOneField(
                default=None,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="thesis",
                to="thesis.committee",
            ),
        ),
    ]