from django.contrib import admin

# Register your models here.
from .models import Transaction, Counterparty, SicCode

admin.site.register(Transaction)
admin.site.register(Counterparty)
admin.site.register(SicCode)
