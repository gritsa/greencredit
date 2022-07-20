from django.db import connection, DatabaseError
from rest_framework.response import Response
from rest_framework import status


class InvokeDBFunction():
    def callRoutine(self, query, *argv):
        """ Call the actual DB function, the query parameter is the DB query and arguments a"""
        try:
            """Converting the tuple to list to pass to the execute method"""
            listArguments = list(argv)
            cursor = connection.cursor()
            cursor.execute(str(query), listArguments)
            data = cursor.fetchall()
            columns = cursor.description
            return {
                "status": 200,
                "data": data,
                "columns": columns
            }
        except DatabaseError as e:
            if e.__cause__.diag.message_primary:
                return {
                    "status": status.HTTP_400_BAD_REQUEST,
                    "responseStatusCode": f'ARC-3012',
                    'description': e.__cause__.diag.message_primary
                }
            else:
                return {
                    "status": status.HTTP_400_BAD_REQUEST,
                    "responseStatusCode": f'ARC-3999',
                    'description': e.__cause__.diag
                }
