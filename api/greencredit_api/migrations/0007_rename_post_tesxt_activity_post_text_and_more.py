# Generated by Django 4.0 on 2022-01-19 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('greencredit_api', '0006_activity'),
    ]

    operations = [
        migrations.RenameField(
            model_name='activity',
            old_name='post_tesxt',
            new_name='post_text',
        ),
        migrations.AlterField(
            model_name='activity',
            name='photo_urls',
            field=models.JSONField(blank=True, default='[]', null=True),
        ),
    ]
