# Generated by Django 4.1 on 2023-08-03 21:18

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("thesis", "0003_alter_resource_resource_file"),
    ]

    operations = [
        migrations.RenameField(
            model_name="committee_member",
            old_name="original_number",
            new_name="number",
        ),
    ]
