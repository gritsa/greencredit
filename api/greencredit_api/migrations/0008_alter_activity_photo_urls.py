# Generated by Django 4.0 on 2022-01-20 05:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('greencredit_api', '0007_rename_post_tesxt_activity_post_text_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='photo_urls',
            field=models.JSONField(blank=True, default=dict, null=True),
        ),
    ]
