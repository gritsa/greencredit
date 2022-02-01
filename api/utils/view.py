from email import message
from django.http import JsonResponse, response


def error_404(request, exception):
    data = {
        "status_code": 404,
        "error": "Not Found",
        "message": "The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.",
    }
    response = JsonResponse(data)
    response.status = 404
    return response


def error_500(request):
    data = {
        "status_code": 500,
        "error": "Internal Server Error",
        "message": "The server encountered an internal error and was unable to complete your request.  Either the server is overloaded or there is an error in the application.",
    }
    response = JsonResponse(data)
    response.status = 500
    return response
