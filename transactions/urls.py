from django.contrib import admin
from django.urls import path

from .views import CounterpartyListView, CounterpartyDetailView, TransactionListView, TransactionDetailView, CompaniesHouseView

urlpatterns = [
    path('counterparties/', CounterpartyListView.as_view(), name='counterparties-list'),
    path('counterparties/<int:pk>/', CounterpartyDetailView.as_view(), name='counterparties-detail'),
    path('transactions/', TransactionListView.as_view(), name='transactions-detail'),
    path('transactions/<int:pk>/', TransactionDetailView.as_view(), name='transactions-detail'),
    path('companieshouse/<company_id>/', CompaniesHouseView.as_view(), name='companies-house'),
]
