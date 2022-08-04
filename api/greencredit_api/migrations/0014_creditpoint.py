# Generated by Django 4.0 on 2022-07-20 06:15

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('greencredit_api', '0012_authgroup_authpermission_contenttype_migrations_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CreditPoint',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('amount', models.FloatField(blank=True, null=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True, null=True)),
                ('meta', models.JSONField(blank=True, default='{}', null=True)),
                ('activity_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='greencredit_api.activity')),
                ('user_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='greencredit_api.greencredituser')),
            ],
        ),
    ]