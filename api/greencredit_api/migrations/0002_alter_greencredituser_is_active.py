# Generated by Django 4.0 on 2022-01-03 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('greencredit_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='greencredituser',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]