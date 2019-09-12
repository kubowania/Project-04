import requests

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT


from .models import Transaction, Counterparty, SicCode
from .serializers import TransactionSerializer, CounterpartySerializer, PopulatedCounterpartySerializer, SicCodeSerializer, PopulatedTransactionSerializer

# Create your views here.
class CounterpartyListView(APIView):

    def get(self, _request):
        counterparties = Counterparty.objects.all() #get all counterparties
        serializer = PopulatedCounterpartySerializer(counterparties, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CounterpartySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)


        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class SicCodeListView(APIView):

    def get(self, _request):
        siccodes = SicCode.objects.all() #get all siccodes
        serializer = SicCodeSerializer(siccodes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SicCodeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class CounterpartyDetailView(APIView):

    def get(self, _request, pk):
        counterparty = Counterparty.objects.get(pk=pk)
        serializer = CounterpartySerializer(counterparty)
        return Response(serializer.data)

    def put(self, request, pk):
        counterparty = Counterparty.objects.get(pk=pk)
        serializer = CounterpartySerializer(counterparty, data=request.data)
        if serializer.is_valid():
            serializer.save()
            counterparty = serializer.instance
            serializer = PopulatedCounterpartySerializer(counterparty)
            return Response(serializer.data)

        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        counterparty = Counterparty.objects.get(pk=pk)
        counterparty.delete()

        return Response(status=HTTP_204_NO_CONTENT)

class TransactionListView(APIView):

    def get(self, _request):
        transactions = Transaction.objects.all() #get all transactions
        serializer = PopulatedTransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class TransactionDetailView(APIView):

    def get(self, _request, pk):
        transaction = Transaction.objects.get(pk=pk)
        serializer = PopulatedTransactionSerializer(transaction)
        return Response(serializer.data)

    def put(self, request, pk):
        transaction = Transaction.objects.get(pk=pk)
        serializer = TransactionSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)



        return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        transaction = Transaction.objects.get(pk=pk)
        transaction.delete()

        return Response(status=HTTP_204_NO_CONTENT)


class CompaniesHouseView(APIView):

    def get(self, _request, company_id):
        response = requests.get(f'https://api.companieshouse.gov.uk/company/{company_id}', auth=('8nDxkU-0n9UQjQnnJFY3Nk_e362SqguB0mVHWh8K', ''))

        return Response(response.json())
