from django.contrib.auth.models import User
from tastypie.authentication import SessionAuthentication
from tastypie.resources import ModelResource
from app.models import AutoModel
from tastypie.authorization import DjangoAuthorization

class AutoModelResource(ModelResource):
    class Meta:
        queryset = AutoModel.objects.all()
        resource_name = 'auto_model'
        authentication = SessionAuthentication()
        authorization = DjangoAuthorization()
        #list_allowed_methods = []
        #detail_allowed_methods = []

    def hydrate(self, bundle):
        bundle.obj.author = bundle.request.user
        return bundle


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        authentication = SessionAuthentication()
        excludes = ['password']
        #list_allowed_methods = []
        #detail_allowed_methods = []